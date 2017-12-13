import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = '';  //初始化为空，由使用这个组件的task-home.component传过来真实的值
  @Output() newTask = new EventEmitter<void>();
  @Output() moveAll = new EventEmitter<void>();
  @Output() DeleteList = new EventEmitter<void>();
  @Output() EditList = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onNewTaskClick(): void{
    this.newTask.emit();
  }

  onMoveAllClick(): void{
    this.moveAll.emit();
  }

  onDeleteListClick(){
    this.DeleteList.emit();
  }

  onEditListClick(){
    this.EditList.emit();
  }

}
