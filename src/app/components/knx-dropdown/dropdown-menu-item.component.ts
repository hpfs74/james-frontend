import {
  Component,
  Input,
  Renderer,
  ElementRef
} from '@angular/core';

import { DropdownStateService } from './dropdown-state.service';

@Component({
  selector: 'knx-menu-item',
  template: `
    <div class='ng2-menu-item'
        role="button"
        tabindex="0"
        [class.ng2-menu-item--selected]="isSelected"
        (keydown.enter)="click()"
        (click)="click()"
        (mouseover)="select()">
            <ng-content></ng-content>
    </div>
  `
})
export class MenuItemComponent {
  /**
   * @preventClose
   * @desc if true, clicking on the item won't close the dropdown
   * @type {boolean}
   */
  @Input() public preventClose: boolean = false;

  /**
   * @name value
   * @desc any value associated to the item
   * @type {any}
   */
  @Input() public value: any;

  constructor(private state: DropdownStateService,
    private element: ElementRef,
    private renderer: Renderer) { }

  /**
   * @name isSelected
   * @desc returns current selected item
   * @returns {boolean}
   */
  public get isSelected(): boolean {
    return this === this.state.dropdownState.selectedItem;
  }

  /**
   * @name click
   * @desc emits select event
   */
  public select($event?): void {
    this.state.dropdownState.select(this, true);

    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }
  }

  /**
   * @name click
   * @desc emits click event
   */
  public click(): void {
    this.state.dropdownState.onItemClicked.emit(this);
  }

  /**
   * @name focus
   */
  public focus() {
    this.renderer.invokeElementMethod(this.element.nativeElement.children[0], 'focus');
  }
}
