import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  subYears,
  subMonths,
  subDays,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parse
} from 'date-fns';

export enum AgeUnit{
  Year = 0,
  Month,
  Dar
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
export class AgeInputComponent implements ControlValueAccessor {

  form: FormGroup;
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() debounceTime = 300;
  
  private propagateChange = (_: any) => {};  //定义一个空的函数体

  constructor( private fb: FormBuilder) { }

  //先找出基础的流，然后合并成一个流
  ngOnInit() {
    this.form = this.fb.group({
      birthday: [],
      age: this.fb.group({
        ageNum: [],
        ageUnit: []
      })
    });
    const birthday = this.form.get('birthday')
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges.map(d => {
        return {date: d, from: 'birthday'}
      })
      .debounceTime(300)  
      .distinctUntilChanged() 
      .filter(_ => birthday.valid);
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)  // 设置一个初始值
      .debounceTime(300)  //过滤掉快速输入时的值，只在停顿0.3s后才发送
      .distinctUntilChanged() //只在改变了的情况下才发送  
      ;  
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)  
      .debounceTime(300)  
      .distinctUntilChanged() 
      ; 

    //把ageNum$，ageUnit$合并成一个age$
    const age$ = Observable
    .combineLatest(ageNum$,ageUnit$, (_n, _u) => {
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
    merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if(d.from === 'birthday'){
        if(age.age !== ageNum.value){
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        if(age.unit !== ageUnit.value){
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

  // 提供值的写入方法
  writeValue(obj: any): void{
  
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
    const now = new Date();
    if (isBefore(subDays(now, this.daysTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Day
      };
    } else if (isBefore(subMonths(now, this.monthsTop), date)) {
      return {
        age: differenceInMonths(now, date),
        unit: AgeUnit.Month
      };
    } else {
      return {
        age: differenceInYears(now, date),
        unit: AgeUnit.Year
      };
    }
  }

  private toDate(age: Age): string {
    const now = new Date();
    switch (age.unit) {
      case AgeUnit.Year: {
        return toDate(subYears(now, age.age));
      }
      case AgeUnit.Month: {
        return toDate(subMonths(now, age.age));
      }
      case AgeUnit.Day: {
        return toDate(subDays(now, age.age));
      }
      default: {
        return this.dateOfBirth;
      }
    }
  }

}
