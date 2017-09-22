import {
  OpenLeftSideNav,
  CloseLeftSideNav,
  OpenRightSideNav,
  CloseRightSideNav,
  OpenModal,
  CloseModal
} from '../actions/layout';
import * as fromLayout from './layout';

describe('Layout reducer', () => {
  describe('undefined action', () => {
    it('should handle initial state', () => {
      const action = {} as any;
      const result = fromLayout.reducer(undefined, action);
      expect(result).toEqual(fromLayout.initialState);
    });
  });

  describe('OPEN_LEFT_SIDENAV', () => {
    it('should set left sidebar as open', () => {
      const action = new OpenLeftSideNav();
      const expectedResult = {
        leftSideBarOpen: true,
        rightSideBarOpen: false,
        openedModalName: null
      };

      const result = fromLayout.reducer(fromLayout.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('CLOSE_LEFT_SIDENAV', () => {
    it('should set left sidebar as closed', () => {
      const action = new CloseLeftSideNav();
      const result = fromLayout.reducer(fromLayout.initialState, action);
      expect(result).toEqual(fromLayout.initialState);
    });
  });

  describe('OPEN_RIGHT_SIDENAV', () => {
    it('should set left sidebar as open', () => {
      const action = new OpenRightSideNav();
      const expectedResult = {
        leftSideBarOpen: false,
        rightSideBarOpen: true,
        openedModalName: null
      };

      const result = fromLayout.reducer(fromLayout.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('CLOSE_RIGHT_SIDENAV', () => {
    it('should set right sidebar as closed', () => {
      const action = new CloseRightSideNav();
      const result = fromLayout.reducer(fromLayout.initialState, action);
      expect(result).toEqual(fromLayout.initialState);
    });
  });

  describe('OPEN_MODAL', () => {
    it('should set open modal name', () => {
      const action = new  OpenModal('myModalName');
      const expectedResult = {
        leftSideBarOpen: false,
        rightSideBarOpen: false,
        openedModalName: 'myModalName'
      };

      const result = fromLayout.reducer(fromLayout.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('CLOSE_MODAL', () => {
    it('should set open modal to empty', () => {
      const action = new CloseModal();
      const result = fromLayout.reducer(fromLayout.initialState, action);
      expect(result).toEqual(fromLayout.initialState);
    });
  });

});
