//核心模块，在项目中只加载一次
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//外部svg用到
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component'
import {loadSvgResources} from "../utils/svg.utils";

import 'hammerjs';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  //如果不导出，则只能在coreModule中可用，在其HeaderComponentFooterComponentSidebarComponent他地方是不可用的
  exports:[
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class CoreModule {
  //@SkipSelf()防止进入死循环，当有父机模块的时候就去父级查看了，不用在这里循环
  //@Optional() 说CoreModule这个依赖是可选的，如果父级模块不存在，就满足了，正常构造就好
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer
  ){
    if(parent){
      throw new Error("模块已经存在，不能再次加载！");
    }
    loadSvgResources(ir,ds);
  }
}
