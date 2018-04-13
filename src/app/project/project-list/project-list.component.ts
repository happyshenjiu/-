import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef} from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import {InviteComponent} from "../invite/invite.component";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {slideToRight} from "../../anims/router.anim";
import {listAnimation} from "../../anims/list.anim";
import { ProjectService } from '../../service/project.service';

import * as _ from 'lodash';
import { Project } from '../../domain/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations:[ slideToRight, listAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush  //使用OnPush策略提高性能
})
export class ProjectListComponent implements OnInit, OnDestroy {

  @HostBinding('@routerAnim') state;

  projects;
  sub: Subscription;
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private service$: ProjectService) { }

  ngOnInit() {
    this.sub = this.service$
    .get("37489e0c-df34-c261-71c4-ce75357e3035")
    .subscribe(projects => {
      this.projects = projects;

      //在这个点上告诉 angular 你来检查我，即：外部UI的状态发生改变时你来检查，其他时候不用检查
      //脏值检测,能够解决刚开始的时候projects是空的报错
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  private getThumbnails(){
    //range(0, 40): 生成一个从0开始的，又40个元素的集合
    return _.range(0, 40)
      .map( i => `/assets/images/covers/${i}_tn.jpg` );  //取里面的缩略图
  }

  //判断是否是缩略图地址，如果是，将他换成原图的地址
  private buildImgSrc(img: string): string {
    //判断img是否有下划线，有的话，从不下划线部分分成两部分，拿到下划线钱的部分，加上.jpg
    return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
  }


  openNewProjectDialog(){
    const selectedImg = `/assets/images/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;

    const dialogRef = this.dialog
      .open(NewProjectComponent,
        {data: {thumbnails: this.getThumbnails(), img: selectedImg}});

      dialogRef.afterClosed()  //刚开始关闭的时候，又可能是传了值之后关闭，也可能是没传值时候关闭
      .take(1)  // 不管是直接关闭还是有数据后保存，都只取一次值之后就，complete结束了
      .filter(n => n)  // 这个时候就需要过滤以下，确保是有值的
      .map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)}))  //将val展开，如果val中有coverImg这个属性，就将里面该属性带_tn的换成不带_tn的
      .switchMap(v =>  this.service$.add(v))  //service$是一个流，service$.add(v)也是流，需要将两个流拍扁成一个流
      .subscribe(project => {
        this.projects = [...this.projects, project];  // [...this.projects,{...}]  表示在原来数组的基础上添加一个元素
        this.cd.markForCheck();
      });
  }

  launchInviteDialog(){
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog(project: Project){
    const dialogRef = this.dialog
      .open(NewProjectComponent,{data: {thumbnails: this.getThumbnails(), project: project}});

      dialogRef.afterClosed()
        .take(1)
        .filter(n => n)   //因为form表单传过来的值是没有id的，所以下面map的时候要加上，顺带把coverImg转以下
        .map(val => ({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg)}))
        .switchMap(v =>  this.service$.update(v))
        .subscribe(project => {
          //找到该project在projects中的位置
          const index = this.projects.map(p => p.id).indexOf(project.id);
          this.projects = [...this.projects.slice(0, index), project, ...this.projects.slice(index+1)];
          this.cd.markForCheck();
        });
  }

  launchConfirmDialog(project: Project){
    const dialogRef =this.dialog.open(ConfirmDialogComponent, {data:{title:'删除项目',content:'您确认删除改项目吗？'}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .switchMap( _ => this.service$.del(project) )  // 删除的时候不关心dialog表单传过来的值，只关心参数project
      .subscribe(prj => {
        console.log(prj);
        //  在原来的数组中过滤掉一个元素
        this.projects = this.projects.filter( p => p.id !== prj.id);
        this.cd.markForCheck();
      });
  }

}
