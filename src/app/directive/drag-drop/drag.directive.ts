import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import {DragDropService} from "../drag-drop.service";

@Directive({
  selector: '[app-draggable][dragTag][dragData][draggedClass]'
})
export class DragDirective {

  //让[app-draggable] 变成一个输入性的属性指令
  private _isDraggable = false;  //是否可拖拽
  @Input('app-draggable')
  set isDraggable(val: boolean){
    this._isDraggable = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }
  get isDraggable(){
    return this._isDraggable;
  }

  @Input() draggedClass: string;
  @Input() dragTag: string; //拖拽级别的唯一标识
  @Input() dragData: any;

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService) { }

  //在拖得过程中需要监听几个事件
  //开始拖拽的事件，带有一个参数
  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event){
    //首先判断 ev 这个事件是不是我们当前DragDirective这个指令应用的元素所发起的
    //ev.target == DragDirective应用的这个元素( DOM 元素)
    if (this.el.nativeElement === ev.target){
      this.rd.addClass(this.el.nativeElement, this.draggedClass);   //拖拽开始的时候，给这个元素添加一个Class
      this.service.setDragData({tag: this.dragTag, data: this.dragData});
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event){
    if (this.el.nativeElement === ev.target){
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);  //拖拽完成的时候，去掉这个Class
    }
  }

}
