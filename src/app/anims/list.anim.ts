/**
 * Created by Yujinhua on 2017/12/13.
 */
import {trigger, state, transition, style, query, animate, stagger, animation} from '@angular/animations';

export const listAnimation = trigger('listAnim',[
  //任意状态  到  任意状态
  transition('* => *', [
    query(':enter', style({opacity: 0}), {optional: true}),
    query(':enter', stagger(100, [
      animate('1s', style({opacity: 1}))
    ]), {optional: true}),
    query(':leave', style({opacity: 1}), {optional: true}),
    query(':leave', stagger(100, [
      animate('1s', style({opacity: 0}))
    ]), {optional: true})
  ])
]);
