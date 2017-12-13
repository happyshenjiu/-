/**
 * Created by Yujinhua on 2017/12/13.
 */
import {trigger, state, transition, style, keyframes, animate} from '@angular/animations';

export const cardAnim = trigger('card',[
  state('out', style({transform: 'scale(1)', 'border-shadow': 'none'})),
  state('hover', style({transform: 'scale(1.05)', 'border-shadow': '3px 3px 5px 6px #ccc'})),
  transition('out => hover', animate('100ms ease-in')),
  transition('hover => out', animate('100ms ease-out'))
]);
