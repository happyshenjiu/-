import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule()

//不是再ngModule中给定某一套的值，而是根据不同的情况给出不同的元数据
//通过一个工厂方法来实现
export class ServiceModule {
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: ServiceModule,
      providers:[

      ]
    }
  }
}
