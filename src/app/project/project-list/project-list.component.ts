import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import {InviteComponent} from "../invite/invite.component";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {slideToRight} from "../../anims/router.anim";
import {listAnimation} from "../../anims/list.anim";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations:[ slideToRight, listAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush  //使用OnPush策略提高性能
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routerAnim') state;

  projects = [
    {
      "id": 1,
      "name":"企业协作平台",
      "desc":"这是一个企业内部项目",
      "coverImg":"assets/images/covers/0.jpg"
    },
    {
      "id": 2,
      "name":"自动化测试项目",
      "desc":"这是一个企业内部项目",
      "coverImg":"assets/images/covers/1.jpg"
    }
  ];
  constructor( private dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  openNewProjectDialog(){
    const dialogRef = this.dialog.open(NewProjectComponent,{data: {title:'新建项目'}});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.projects = [...this.projects, {id:3, name: '一个新项目', desc: '这是一个新项目', coverImg: 'assets/images/covers/8.jpg'}, {id:4, name: '另一个新项目', desc: '这是另一个新项目', coverImg: 'assets/images/covers/6.jpg'}];
      // [...this.projects,{...}]  表示在原来数组的基础上添加一个元素
      this.cd.markForCheck();  //在这个点上告诉 angular 你来检查我，即：外部UI的状态发生改变时你来检查，其他时候不用检查
    });
  }

  launchInviteDialog(){
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog(){
    const dialogRef =this.dialog.open(NewProjectComponent, {data:{title:'编辑项目'}})
  }

  launchConfirmDialog(project){
    const dialogRef =this.dialog.open(ConfirmDialogComponent, {data:{title:'删除项目',content:'您确认删除改项目吗？'}});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      //  在原来的数组中过滤掉一个元素
      this.projects = this.projects.filter( p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }

}
