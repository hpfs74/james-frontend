import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownComponent } from './dropdown.component';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { DropdownButtonComponent } from './dropdown-button.component';
import { MenuItemComponent } from './dropdown-menu-item.component';

import { DropdownStateService } from './dropdown-state.service';

@NgModule({
  exports: [
    MenuItemComponent,
    DropdownButtonComponent,
    DropdownMenuComponent,
    DropdownComponent
  ],
  declarations: [
    DropdownComponent,
    MenuItemComponent,
    DropdownButtonComponent,
    DropdownMenuComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class DropdownModule { }

export {
  DropdownComponent,
  DropdownMenuComponent,
  MenuItemComponent,
  DropdownButtonComponent,
  DropdownStateService
};
