import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [
    state('in', style({
      transform: 'translate3d(0, 0, 0)',
    })),
    state('out', style({
      transform: 'translate3d(-100%, 0, 0)',
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]);
