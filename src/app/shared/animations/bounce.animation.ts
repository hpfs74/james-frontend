import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const bounceAnimation =
trigger('bounceAnimation', [
  state('open', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  state('closed', style({
    opacity: 0,
    transform: 'translateY(-130%)'
  })),
  transition('closed => open', [
    animate(300, keyframes([
      style({opacity: 0, transform: 'translateY(-130%)', offset: 0}),
      style({opacity: 0.3, transform: 'translateY(30%)',  offset: 0.3}),
      style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
    ]))
  ]),
  transition('open => closed', [
    animate(300, keyframes([
      style({opacity: 1, transform: 'translateY(0)',     offset: 0}),
      style({opacity: 0.7, transform: 'translateY(-70%)', offset: 0.7}),
      style({opacity: 0, transform: 'translateY(-130%)',  offset: 1.0})
    ]))
  ])
]);
