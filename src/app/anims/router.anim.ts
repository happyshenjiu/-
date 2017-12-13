/**
 * Created by Yujinhua on 2017/12/13.
 */
import {trigger, state, transition, style, group, animate} from '@angular/animations';

export const slideToRight = trigger('routerAnim',[
  state('void', style({'position': 'fixed', 'width':'100%', 'height': '80%'})),
  state('*', style({'position': 'fixed', 'width':'100%', 'height': '80%'})),
  //进场动画，从一个状态带另一个状态
  //void => *  有个别名叫 :enter，可以替换使用
  // * => void  跟 :leave  可以交换使用
  transition('void => *', [
    style({transform:'translateX(-100%)', opacity: 0}),
    //一组动画同时执行
    group([
      animate('.5s ease-in-out', style({transform:'translateX(0)'})),
      animate('.3s ease-in', style({opacity: 1}))
    ])
  ]),
  transition('* => void', [
    style({transform: 'translateX(0)', opacity: 1}),
    group([
      animate('.5s ease-in-out', style({transform: 'translateX(100%)'})),
      animate('.3s ease-in', style({opacity: 0}))
    ])
  ])
]);
