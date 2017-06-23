import { createSelector } from 'reselect';
import { Profile } from '../models/profile';
import * as profile from '../actions/profile';

export interface State {
  loading: boolean;
  loaded: boolean;
  profile: Profile | {};
}

export const initialState: State = {
  loading: false,
  loaded: false,
  profile: {}
};

export function reducer(state = initialState, action: profile.Actions): State {
  switch (action.type) {

    case profile.SAVE_PROFILE_REQUEST:
    case profile.LOAD_PROFILE_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case profile.SAVE_PROFILE_SUCCESS:
    case profile.LOAD_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        profile: Object.assign({}, action.payload)
      });
    }

    case profile.SAVE_PROFILE_FAIL:
    case profile.LOAD_PROFILE_FAIL: {
      return state;
    }

    // case book.SEARCH_COMPLETE:
    // case collection.LOAD_SUCCESS: {
    //   const books = action.payload;
    //   const newBooks = books.filter(book => !state.entities[book.id]);

    //   const newBookIds = newBooks.map(book => book.id);
    //   const newBookEntities = newBooks.reduce((entities: { [id: string]: Book }, book: Book) => {
    //     return Object.assign(entities, {
    //       [book.id]: book
    //     });
    //   }, {});

    //   return {
    //     ids: [ ...state.ids, ...newBookIds ],
    //     entities: Object.assign({}, state.entities, newBookEntities),
    //     selectedBookId: state.selectedBookId
    //   };
    // }

    // case book.LOAD: {
    //   const book = action.payload;

    //   if (state.ids.indexOf(book.id) > -1) {
    //     return state;
    //   }

    //   return {
    //     ids: [ ...state.ids, book.id ],
    //     entities: Object.assign({}, state.entities, {
    //       [book.id]: book
    //     }),
    //     selectedBookId: state.selectedBookId
    //   };
    // }

    // case book.SELECT: {
    //   return {
    //     ids: state.ids,
    //     entities: state.entities,
    //     selectedBookId: action.payload
    //   };
    // }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */
export const getCurrent = (state: State) => state.profile;

// export const getBookCollection = createSelector(getBookEntities, getCollectionBookIds, (entities, ids) => {
//   return ids.map(id => entities[id]);
// });

// export const getProfile = createSelector()

// export const getEntities = (state: State) => state.entities;

// export const getIds = (state: State) => state.ids;

// export const getSelectedId = (state: State) => state.selectedBookId;

// export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
//   return entities[selectedId];
// });

// export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
//   return ids.map(id => entities[id]);
// });
