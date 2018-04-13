//核心模块，在项目中只加载一次
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { ServiceModule } from '../service/service.module';
//外部svg用到
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import {loadSvgResources} from '../utils/svg.utils';

import 'hammerjs';
import '../utils/debug.util';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';

@NgModule({
  imports: [
    AppRoutingModule,
    HttpModule,
    SharedModule,
    ServiceModule.forRoot(),
    BrowserAnimationsModule  //尽量放在所有import的最后
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
    FooterComponent,
    AppRoutingModule,
    // BrowserAnimationsModule
  ],
  providers:[
    {
      provide: 'BASE_CONFIG',
      useValue: {
        url: 'http://localhost:3000'
      }
    }
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
