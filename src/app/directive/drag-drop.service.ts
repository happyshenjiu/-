import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export interface DragData {
  tag: string;  // 区分是哪一级拖拽,即：拖拽级别的唯一标识
  data: any;  // 传递的数据
}

@Injectable()
 export class DragDropService{

  //BehaviorSubject： 他总能记住上一次的值
  private _dragData = new BehaviorSubject<DragData>(null);

  //重组数据
  setDragData(data: DragData){
    this._dragData.next(data);
  }

  //得到数据
  getDragData(): Observable<DragData>{
    return this._dragData.asObservable();
  }

  //清空数据
  clearDragData(){
    this._dragData.next(null);
  }

}
