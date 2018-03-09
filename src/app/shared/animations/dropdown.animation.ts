import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const dropdDowndAnimation = [
  trigger('dropdDowndAnimation', [
    state('closed', style({ display: 'none', overflow: 'hidden', width: '0' })),
    state('open', style({ display: 'block', overflow: '*' })),
    transition('closed => open', [
      animate(150, keyframes([
        style({ opacity: 0, offset: 0, height: '0', width: '0' }),
        style({ opacity: 1, offset: 1, height: '*', width: '*' }),
      ]))
    ]),
    transition('open => closed', [
      animate(250, keyframes([
        style({ opacity: 1, offset: 0, height: '*', width: '*', overflow: 'hidden' }),
        style({ opacity: 0, offset: 1, height: '0', width: '0', overflow: 'hidden' }),
      ]))
    ])
  ])
];
