import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import {NewTaskComponent} from "../new-task/new-task.component";
import {CopyTaskComponent} from "../copy-task/copy-task.component";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {NewTaskListComponent} from "../new-task-list/new-task-list.component";
import {slideToRight} from "../../anims/router.anim";

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations:[ slideToRight ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routerAnim') state;

  lists = [
    {
      id:1,
      name:'待办',
      order: 1,
      tasks:[
        {
          id:1,
          desc:'任务一：去星巴克买杯咖啡',
          completed: true,
          priority: 3,    //优先级
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate: new Date()
        },
        {
          id:2,
          desc:'任务二：完成老板不知的 ppt 作业',
          completed:false,
          priority: 2,
          owner:{
            id:1,
            name:'李四',
            avatar:'avatars:svg-12'
          },
          dueDate: new Date()
        }
      ]
    },
    {
      id:2,
      name:'执行中',
      order: 2,
      tasks:[
        {
          id:1,
          desc:'任务三：项目代码评审',
          completed: false,
          priority: 1,
          owner:{
            id:1,
            name:'王五',
            avatar:'avatars:svg-13'
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id:2,
          desc:'任务四：制定项目计划',
          completed: false,
          priority: 2,
          owner:{
            id:1,
            name:'郭操',
            avatar:'avatars:svg-14'
          },
          dueDate: new Date()
        }
      ]
    }
  ];
  constructor( private dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  launchNewTaskDialog(){
    const dialogRef =this.dialog.open(NewTaskComponent, {data:{title: '新建任务'}});
  }

  launchCopyTaskDialog(){
    // 打开dialog的时候传递数据lists
    const dialogRef =this.dialog.open(CopyTaskComponent, { data:{lists: this.lists} });
  }

  launchUpdateTaskDialog(task){
    const dialogRef =this.dialog.open(NewTaskComponent, {data:{title:'修改任务', task: task}})
  }

  launchConfirmDialog(){
    const dialogRef =this.dialog.open(ConfirmDialogComponent, {data:{title:'删除任务列表',content:'您确认删除改任务列表吗？'}});
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  launchUpdateListDialog(){
    const dialogRef =this.dialog.open(NewTaskListComponent, {data:{title:'更改列表名称'}});
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  launchNewListDialog(){
    const dialogRef =this.dialog.open(NewTaskListComponent, {data:{title:'新建任务'}});
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  handleMove(srcData, list){
    switch (srcData.tag){
      case 'task-item':
        console.log('handling item');
        break;
      case 'task-list':
        console.log('handling list');
        //order 交换
        let srcList = srcData.data;
        let tempOrder = srcList.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;
      default:
        break;
    }
  }

  handleQuickTask(desc: string){
    console.log(desc);
  }

}
