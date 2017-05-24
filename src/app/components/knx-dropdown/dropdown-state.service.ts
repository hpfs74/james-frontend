import { Injectable } from '@angular/core';
import { DropdownState } from './dropdown-state';

@Injectable()
export class DropdownStateService {
  public menuState = {
    isVisible: <boolean>false,
    toString(): string {
      return this.isVisible === true ? 'visible' : 'hidden';
    }
  };

  public dropdownState: DropdownState = new DropdownState();
}
