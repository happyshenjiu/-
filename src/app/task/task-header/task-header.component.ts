import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = '';  //初始化为空，由使用这个组件的task-home.component传过来真实的值
  constructor() { }

  ngOnInit() {
  }

}
