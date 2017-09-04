import { Action } from '@ngrx/store';

export const OPEN_LEFT_SIDENAV = '[Layout] Open Left Sidenav';
export const CLOSE_LEFT_SIDENAV = '[Layout] Close Left Sidenav';

export const OPEN_RIGHT_SIDENAV = '[Layout] Open Right Sidenav';
export const CLOSE_RIGHT_SIDENAV = '[Layout] Close Right Sidenav';

export const OPEN_MODAL = '[Layout] Open Modal';
export const CLOSE_MODAL = '[Layout] Close Modal';


export class OpenLeftSideNav implements Action {
  readonly type = OPEN_LEFT_SIDENAV;
}

export class CloseLeftSideNav implements Action {
  readonly type = CLOSE_LEFT_SIDENAV;
}

export class OpenRightSideNav implements Action {
  readonly type = OPEN_RIGHT_SIDENAV;
}

export class CloseRightSideNav implements Action {
  readonly type = CLOSE_RIGHT_SIDENAV;
}

export class OpenModal implements Action {
  readonly type = OPEN_MODAL;

  constructor(public payload: string) { }
}

export class CloseModal implements Action {
  readonly type = CLOSE_MODAL;
}

export type All
  = OpenLeftSideNav
  | CloseLeftSideNav
  | OpenRightSideNav
  | CloseRightSideNav
  | OpenModal
  | CloseModal;
