import { trigger, state, animate, transition, style } from '@angular/animations';

export const flyInOutAnimation =
  trigger('flyInOutAnimation', [
    state('in', style({ opacity: 1, scale: 0 })),
    transition('void => *', [
      style({
        opacity: 0,
        scale: 1,
        transform: 'translateY(100%)',
      }),
      animate('0.2s ease-in')
    ]),
    transition('* => void', [
      animate('0.2s 10s ease-out', style({
        opacity: 0,
        scale: 0,
        transform: 'translateY(-100%)'
      }))
    ])
  ]);

