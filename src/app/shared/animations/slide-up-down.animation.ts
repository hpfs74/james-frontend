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
  transition('in => out', animate('500ms ease-in-out')),
  transition('out => in', animate('500ms ease-in-out'))
]);

export const slideUpDownHeightAnimation =
trigger('slideUpDownHeightAnimation', [
  state('open', style({
    opacity: 1,
    height: '100vh',
  })),
  state('closed', style({
    opacity: 0,
    height: '0px',
  })),
  transition('closed => open', animate('500ms ease-in-out')),
  transition('open => closed', animate('500ms ease-in-out'))
]);
