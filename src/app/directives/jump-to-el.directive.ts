import { HostListener, Directive, Input } from '@angular/core';
import { Router } from '@angular/router';
/*
 * Jumps to a specific element on the page (by id) like the old way of linking to a anchor tag
 * example: <a href="#myElement"></a>
 */
@Directive({ selector: '[jumpToEl]' })
export class JumpToElementDirective {

    @Input() href;
    @HostListener('click', ['$event'])
        onClick(event) {
            this.preventDefault(event);
        }

    constructor(private router: Router) {}

    private preventDefault(event) {
        if(!this.href) { return; }
        if (this.href.length === 0 || this.href.charAt(0) === '#') {
            event.preventDefault();

            let el = this.href.substring(1);

            document.getElementById(el).scrollIntoView();
            //window.scrollTo(0, 0)
        } else {

            // Use router from angular2
            this.router.navigateByUrl(this.href);
        }
    }
}
