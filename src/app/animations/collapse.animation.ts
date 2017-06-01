import { trigger, state, animate, transition, style } from '@angular/animations';

export const collapseInOutAnimation =
  trigger('collapseInOutAnimation', [
    state('1', style({ display: 'block', opacity: 1, height: '*' })),
    transition('void => *', [
      style({ display: 'block', opacity: 1, height: '*' }),
      animate('200ms ease-in')
    ]),
    transition('* => void', [
      animate('200ms ease-out', style({ display: 'none', opacity: 0, height: '0px' }))
    ])
  ]);
