import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import {ProjectModule} from "./project/project.module";
import {TaskModule} from "./task/task.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatSidenavModule,
    SharedModule,
    LoginModule,
    ProjectModule,
    TaskModule,
    CoreModule,
    BrowserAnimationsModule  //尽量放在所有import的最后
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
