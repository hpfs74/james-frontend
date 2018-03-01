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
  <button class="knx-dropdown-button" type="button" (click)="toggleMenu()" tabindex="0s">
    <ng-content></ng-content>
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
