import { trigger, state, animate, transition, style } from '@angular/animations';

export const collapseInOutAnimation =
  trigger('collapseInOutAnimation', [
    state('in', style({ display: 'block', opacity: 1, height: '*' })),
    transition('void => *', [
      style({ display: 'block', opacity: 1, height: '*' }),
      animate('100ms ease-in')
    ]),
    transition('* => void', [
      animate('100ms ease-out', style({ display: 'none', opactiy: 0, height: '0px' }))
    ])
  ]);
