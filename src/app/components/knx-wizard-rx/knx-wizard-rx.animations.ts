import { trigger, state, animate, transition, style } from '@angular/core'; // @angular/animations

export const hideShowAnimation =
  trigger(
    'hideShow',
    [
      transition(
        'void => prev', // ---> Entering --->
        [

          style({
            // left: -100,
            opacity: 0.0,
          }),
          animate(
            '200ms ease-in-out',
            style({
              // left: 0,
              opacity: 1.0,
            })
          )
        ]
      ),
      transition(
        'prev => void', // ---> Leaving --->
        [
          animate(
            '200ms ease-in-out',
            style({
              // left: 100,
              opacity: 0.0
            })
          )
        ]
      ),
      transition(
        'void => next', // <--- Entering <---
        [
          style({
            // left: 100,
            opacity: 0.0,
          }),
          animate(
            '200ms ease-in-out',
            style({
              // left: 0,
              opacity: 1.0,

            })
          )
        ]
      ),
      transition(
        'next => void', // <--- Leaving <---
        [
          animate(
            '200ms ease-in-out',
            style({
              // left: -100,
              opacity: 0.0
            })
          )
        ]
      )
    ]
  );
