import { Component, Input, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => ImageListSelectComponent),
      multi: true
      //使用我自己，把我自己注册到NG_VALUE_ACCESSOR这个令牌上
      //forwardRef:向前引用，就是说，等我自己实例化之后再引用
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef( () => ImageListSelectComponent),
      multi: true

    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {

  @Input() title = '选择';
  @Input() cols = 6;
  @Input() rowHeight = '64px';
  @Input() items: string[] = [];
  @Input() useSvgIcon = false;
  @Input() itemWidth = '80px';

  selected:string;
  constructor() { }

  private propagateChange = (_: any) => {};  //定义一个空的函数体

  onChange(i: number){
    this.selected = this.items[i];
    this.propagateChange(this.selected);  //把这个变化通知给表单
  }

  //写值： 通过表单控件的writeValue() 方法把这个控件的值写进来
  writeValue(obj: any): void{
    this.selected = obj;
  }

  //我自己的这个控件的view或者值发生了变化，要通知表单，fn 是系统传给我的一个函数句柄
  //得到这个句柄之后，当我自己的view或者值发生改变，就可以emit发射给表单
  registerOnChange(fn: any): void{
    this.propagateChange = fn;
  }

  //我这个控件什么样算做是已经touched，要告诉表单
  registerOnTouched(fn: any): void{  }

  validate(c: FormControl): {[key: string]:any} {
    return this.selected? null: {
      imageListInvalid: {
        valid: false
      }
    }
  }

}
