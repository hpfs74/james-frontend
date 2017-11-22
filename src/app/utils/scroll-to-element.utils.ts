const DEFAULT_SCROLL_TARGET_Y = 0;
const DEFAULT_SCROLL_SPEED = 3000;
const DEFAULT_SCROLL_EASING = 'easeOutSine';

// first add raf shim
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
declare var window: any;
let requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// Scoll back to form; assumes there's only one form of this type on current page
export function scrollToElement(cssClass: string): void {
    const element = <HTMLElement>document.querySelector(cssClass);
    if (element) {
        scrollToY(element.offsetTop);
    }
}

/**
 * should be updated to scroll to element
 * main function
 * default scroll to top of window object
 * @param scrollTargetY scroll to window.scrollY position
 * @param speed time in pixels per second -> increase to speed up
 * @param easing easing equation to use
 */
export function scrollToY(
    scrollTargetY: number = DEFAULT_SCROLL_TARGET_Y,
    speed: number = DEFAULT_SCROLL_SPEED,
    easing: string = DEFAULT_SCROLL_EASING) {

    let scrollY = window.scrollY || document.documentElement.scrollTop;
    let currentTime = 0;

    // min time .1, max time .8 seconds
    let time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    let easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        let p = currentTime / time;
        let t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);

            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            window.scrollTo(0, scrollTargetY);
        }
    }

    // call it once to get started
    tick();
}
