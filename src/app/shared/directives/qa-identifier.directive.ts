import { Directive, Renderer2, Input, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Directive({ selector: '[knxQaIdentifier]' })
export class QaIdentifierDirective implements OnInit {
  @Input() qaPage: string;
  @Input() qaElement: string;

  nativeElement: any;

  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router, private activatedRoute: ActivatedRoute) {
    this.nativeElement = el.nativeElement;
  }

  ngOnInit() {
    const qaAttributeName = 'data-qa-id';
    const qaAttributeValue = `qa-${this.qaPage}-${this.qaElement}`;

    // console.warn(qaAttributeValue);

    // add "data-qa-id" attribute
    if (this.qaPage && this.qaElement) {
      this.renderer.setAttribute(this.el.nativeElement, qaAttributeName, qaAttributeValue);
    }
  }
}
