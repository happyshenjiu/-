import {ChangeDetectionStrategy, Component, forwardRef, OnInit, OnDestroy, Input} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  subYears,
  subMonths,
  subDays,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parse,
  format,
  isDate,
  isValid,
  isFuture
} from 'date-fns';

import { isValiDate } from '../../utils/date.util';
import { Subscription } from 'rxjs/Subscription';

export enum AgeUnit{
  Year = 0,
  Month,
  Day
}

export interface Age{
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => AgeInputComponent),
      multi: true
      //使用我自己，把我自己注册到NG_VALUE_ACCESSOR这个令牌上
      //forwardRef:向前引用，就是说，等我自己实例化之后再引用
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef( () => AgeInputComponent),
      multi: true

    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  selectedUnit = AgeUnit.Year;
  ageUnits = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];

  sub: Subscription;
  form: FormGroup;
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() format = 'YYYY-MM-DD';
  @Input() debounceTime = 300;
  
  private propagateChange = (_: any) => {};  //定义一个空的函数体

  constructor( private fb: FormBuilder) { }

  //先找出基础的流，然后合并成一个流
  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]  //ageUnit赋一个初始值
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });

    const birthday = this.form.get('birthday')
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges.map(d => {
        return {date: d, from: 'birthday'}
      })
      .debounceTime(this.debounceTime)  
      .distinctUntilChanged() 
      .filter(_ => birthday.valid);

    //两个流合并的时候combineLatest:ageNum$,ageUnit$两个都有值时产生新流中对应的元素，这里要求两个都有值，所以
    //给ageNum$设置初始值.startWith(ageNum.value) 
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)  // 设置一个初始值
      .debounceTime(this.debounceTime)  //过滤掉快速输入时的值，只在停顿0.3s后才发送
      .distinctUntilChanged() //只在改变了的情况下才发送 ，过滤掉没改变时的值 
      ;  

    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)  
      .debounceTime(this.debounceTime)  
      .distinctUntilChanged() 
      ; 

    //把ageNum$，ageUnit$合并成一个age$
    const age$ = Observable
    .combineLatest(ageNum$, ageUnit$, (_n, _u) => {
        return this.toDate({age: _n, unit: _u});
      })
      .map(d => {
        return {date: d, from: 'age'};
      })
    .filter(_ => this.form.get('age').valid);

    const merged$ = Observable
      .merge(birthday$, age$)
      .filter(_ => this.form.valid);

    //订阅最终合并的这个流
    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if(d.from === 'birthday'){
        if(age.age !== ageNum.value){
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        if(age.unit !== ageUnit.value){
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, {emitEvent: false});
        }
        this.propagateChange(d.date);
      } else{
        const ageToCompare = this.toAge(birthday.value);
        if(age.age !== ageToCompare.age || age.unit !== ageToCompare.unit){
          birthday.patchValue(d.date, {emitEvent: false});
          this.propagateChange(d.date);
        }
      }

    });

  }

ngOnDestroy(){
  if(this.sub){
    this.sub.unsubscribe();
  }
}

  validate(c: FormControl): {[key: string]:any} {
   const val = c.value;
   if(!val){
    return null;
   }
   if(isValiDate(val)){
    return null;
   }
   return {
    dateOfBirthInvalid: true
   }
  }

  validateDate(c: FormControl): {[key: string]:any} {
   const val = c.value;
   return isValiDate(val) ? null : {
      birthdayInvalid: true
    }; 
  }

  //validateAge返回的是一个工厂函数
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;
        }
        default: {
          break;
        }
    }
    return  result ? null : {ageInvalid: true};
  };
  }

  // 提供值的写入方法
  // 外界想要设置这个控件的值的时候，比如说设置初始值，我们得到初始值之后，把他设置到这个控件中
  writeValue(obj: any): void{
    if(obj){
      const date = format(obj, this.format);
      this.form.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }

   // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  registerOnChange(fn: any): void{
    this.propagateChange = fn;
  }

  // 这里没有使用，用于注册 touched 状态
  //我这个控件什么样算做是已经touched，要告诉表单
  registerOnTouched(fn: any): void{  }

  private toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), date) ? 
      {age: differenceInDays(now, date), unit: AgeUnit.Day} : 
        isBefore(subMonths(now, this.monthsTop), date) ? 
          {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
            {
              age: differenceInYears(now, date),
              unit: AgeUnit.Year
            };
  }
  // private toAge(dateStr: string): Age {
  //   const date = parse(dateStr);
  //   const now = new Date();
  //   if (isBefore(subDays(now, this.daysTop), date)) {
  //     return {
  //       age: differenceInDays(now, date),
  //       unit: AgeUnit.Day
  //     };
  //   } else if (isBefore(subMonths(now, this.monthsTop), date)) {
  //     return {
  //       age: differenceInMonths(now, date),
  //       unit: AgeUnit.Month
  //     };
  //   } else {
  //     return {
  //       age: differenceInYears(now, date),
  //       unit: AgeUnit.Year
  //     };
  //   }
  // }

  private toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), this.format);  //算出来年的差距，之后格式化成YYYY-MM-DD的格式
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), this.format);  //算出来月的差距
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), this.format);  //算出来天的差距
      }
      default: {
        return null;
      }
    }
  }

  // private toDate(age: Age): string {
  //   const now = new Date();
  //   switch (age.unit) {
  //     case AgeUnit.Year: {
  //       return toDate(subYears(now, age.age));
  //     }
  //     case AgeUnit.Month: {
  //       return toDate(subMonths(now, age.age));
  //     }
  //     case AgeUnit.Day: {
  //       return toDate(subDays(now, age.age));
  //     }
  //     default: {
  //       return this.dateOfBirth;
  //     }
  //   }
  // }

}
