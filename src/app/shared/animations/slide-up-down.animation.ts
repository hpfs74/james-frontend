import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideUpDownAnimation =
  trigger('slideUpDownAnimation', [
    state('in', style({
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    })),
    state('out', style({
      opacity: 0,
      transform: 'translate3d(0, -100%, 0)',
    })),
    transition('in => out', animate('600ms ease-in-out')),
    transition('out => in', animate('600ms ease-in-out'))
  ]);
