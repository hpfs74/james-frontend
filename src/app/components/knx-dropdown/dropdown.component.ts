import {
    HostListener,
    Component,
    ContentChild,
    Output,
    EventEmitter,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import { DropdownButtonComponent } from './dropdown-button.component';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { DropdownStateService } from './dropdown-state.service';

@Component({
  selector: 'knx-dropdown',
  template: `
    <div class="knx-dropdown-container">
      <ng-content select="knx-dropdown-button"></ng-content>
      <ng-content select="knx-dropdown-menu"></ng-content>
    </div>
  `,
  providers: [ DropdownStateService ]
})
export class DropdownComponent implements OnInit {
    // get children components
    @ContentChild(DropdownButtonComponent) public button: DropdownButtonComponent;
    @ContentChild(DropdownMenuComponent) public menu: DropdownMenuComponent;

    @Input() public dynamicUpdate = true;

    // outputs
    @Output() public onItemClicked: EventEmitter<string> = new EventEmitter<string>();
    @Output() public onItemSelected: EventEmitter<string> = new EventEmitter<string>();
    @Output() public onShow: EventEmitter<DropdownComponent> = new EventEmitter<DropdownComponent>();
    @Output() public onHide: EventEmitter<DropdownComponent> = new EventEmitter<DropdownComponent>();

    constructor(private state: DropdownStateService) {}

    /**
     * @name toggleMenu
     * @desc toggles menu visibility
     */
    public toggleMenu(position = this.button.getPosition()): void {
        this.state.menuState.isVisible ? this.hide() : this.show(position);
    }

    /**
     * - hides dropdown
     * @name hide
     */
    public hide(): void {
        this.menu.hide();
        this.onHide.emit(this);
    }

    /**
     * - shows dropdown
     * @name show
     * @param position
     */
    public show(position = this.button.getPosition()): void {
        this.menu.show();

        // update menu position based on its button's
        this.menu.updatePosition(position);
        this.onShow.emit(this);
    }

    /**
     * @name scrollListener
     */
    @HostListener('window:scroll')
    public scrollListener() {
        if (this.state.menuState.isVisible && this.button && this.dynamicUpdate) {
            this.menu.updatePosition(this.button.getPosition());
        }
    }

    public ngOnInit() {
        this.state.dropdownState.onItemClicked.subscribe(item => {
            this.onItemClicked.emit(item);

            if (item.preventClose) {
                return;
            }

            this.hide.call(this);
        });

        if (this.button) {
            this.button.onMenuToggled.subscribe(() => {
                this.toggleMenu();
            });
        }

        this.state.dropdownState.onItemSelected.subscribe(item => this.onItemSelected.emit(item));
    }
}
