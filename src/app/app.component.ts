import { Component } from '@angular/core';
// import { OverLayContainer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[

  ]
})
export class AppComponent {
  darkTheme = false;
  constructor(
    // private oc: OverLayContainer
  ){}
  switchTheme(dark){
    this.darkTheme = dark;
    // this.oc.themeClass = dark? 'myapp-dark-theme':null;  //处理dialog 和 弹出菜单menu 不适用黑夜模式的问题
  }
}
