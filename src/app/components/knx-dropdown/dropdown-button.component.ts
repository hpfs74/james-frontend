import {
  Component,
  Output,
  Input,
  EventEmitter,
  ElementRef
} from '@angular/core';

/* tslint:disable */
@Component({
  selector: 'knx-dropdown-button',
  styleUrls: ['./dropdown-button.component.scss'],
  template: `
  <button class='ng2-dropdown-button' type="button" (click)="toggleMenu()" tabindex="0s">
    <span class="ng2-dropdown-button__label">
      <ng-content></ng-content>
    </span>

    <span class="ng2-dropdown-button__caret" *ngIf="showCaret">
      <svg enable-background="new 0 0 32 32" height="16px" id="Слой_1" version="1.1" viewBox="0 0 32 32" width="16px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M24.285,11.284L16,19.571l-8.285-8.288c-0.395-0.395-1.034-0.395-1.429,0  c-0.394,0.395-0.394,1.035,0,1.43l8.999,9.002l0,0l0,0c0.394,0.395,1.034,0.395,1.428,0l8.999-9.002  c0.394-0.395,0.394-1.036,0-1.431C25.319,10.889,24.679,10.889,24.285,11.284z" id="Expand_More"/><g/><g/><g/><g/><g/><g/></svg>
    </span>
  </button>
  `
})
/* tslint: enable */
export class DropdownButtonComponent {
  @Output() public onMenuToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public showCaret: boolean = true;

  constructor(private element: ElementRef) { }

  /**
   * @name toggleMenu
   * @desc emits event to toggle menu
   */
  public toggleMenu(): void {
    this.onMenuToggled.emit(true);
  }

  /**
   * @name getPosition
   * @desc returns position of the button
   * @returns {ClientRect}
   */
  public getPosition(): ClientRect {
    return this.element.nativeElement.getBoundingClientRect();
  }
}
