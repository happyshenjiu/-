import { Component, OnInit, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import {itemAnim} from "../../anims/item.anim";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations:[
    itemAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Input() avatar;
  @Output() taskClick = new EventEmitter<void>();
  widerPriority = 'in';

  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner? this.item.owner.avatar : 'unassigned';
  }

  onItemClick(): void{
    this.taskClick.emit();
  }

  onCheckBoxClick(ev: Event){
    ev.stopPropagation();  //点击事件不向外传播
  }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.widerPriority = 'out';
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.widerPriority = 'in';
  }

}
