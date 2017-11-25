//核心模块，在项目中只加载一次
import { NgModule , SkipSelf , Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from  './header/header.component';
import { FooterComponent } from  './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  //如果不导出，则只能在coreModule中可用，在其他地方是不可用的
  exports:[
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class CoreModule {
  //@SkipSelf()防止进入死循环，当有父机模块的时候就去父级查看了，不用在这里循环
  //@Optional() 说CoreModule这个依赖是可选的，如果父级模块不存在，就满足了，正常构造就好
  constructor(@Optional() @SkipSelf() parent: CoreModule){
    if (parent){
      throw new Error("模块已经存在，不能再次加载！");
    }
  }
}
