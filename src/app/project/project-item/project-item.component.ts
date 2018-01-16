import { Component, OnInit, Input,Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import {cardAnim} from "../../anims/card.anim";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations:[
    cardAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush  //单输入型属性item 发生改变时，实行OnPush策略
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() onInvite = new EventEmitter<void>();  //点击邀请按钮是，告诉父组件，而不是自己做处理
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  @HostBinding('@card') cardState = 'out';  //将 cardState 这个变量绑定到 @card 上去，设初始值为 out

  constructor() { }

  ngOnInit() {
  }

  //HostListener是来监听事件数组的
  @HostListener('mouseenter')
  onMouseEnter(){
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.cardState = 'out';
  }

  onInviteClick(){
    this.onInvite.emit();
  }

  onEditClick(){
    this.onEdit.emit();
  }

  onDeleteClick(){
    this.onDelete.emit();
  }

}
