import { NgModule } from '@angular/core';
import { SharedModule} from "../shared/shared.module";
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { InviteComponent } from './invite/invite.component';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule
  ],
  declarations: [
    ProjectListComponent,
    ProjectItemComponent,
    NewProjectComponent,   //弹出的对话框
    InviteComponent    // 邀请成员的对话框
  ],
  //对话框需要再模块的入口组件entryComponents中声明
  entryComponents:[
    NewProjectComponent,
    InviteComponent
  ]
})
export class ProjectModule { }
