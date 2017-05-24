import { EventEmitter } from '@angular/core';
import { MenuItemComponent } from './dropdown-menu-item.component';

export class DropdownState {
    public onItemSelected: EventEmitter<MenuItemComponent> = new EventEmitter<MenuItemComponent>();
    public onItemClicked: EventEmitter<MenuItemComponent> = new EventEmitter<MenuItemComponent>();
    private _selectedItem: MenuItemComponent;

    /**
     * @name selectedItem
     * @desc getter for _selectedItem
     * @returns {MenuItemComponent}
     */
    public get selectedItem(): MenuItemComponent {
        return this._selectedItem;
    }

    /**
     * @name selects a menu item and emits event
     * @param item {MenuItemComponent}
     * @param dispatchEvent {boolean}
     */
    public select(item: MenuItemComponent, dispatchEvent = true): void {
        this._selectedItem = item;

        if (!dispatchEvent) {
            return;
        }

        item.focus();

        this.onItemSelected.emit(item);
    }

    /**
     * @name unselect
     * @desc sets _selectedItem as undefined
     */
    public unselect(): void {
        this._selectedItem = undefined;
    }
}
