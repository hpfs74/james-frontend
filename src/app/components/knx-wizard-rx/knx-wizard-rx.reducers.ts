// import { createSelector } from '@ngrx/store';
// import { Car } from '../models/car';
// import * as CarActions from '../actions/car';

// export type Action = CarActions.All;

// export interface State {
//   loading: boolean;
//   loaded: boolean;
//   error: boolean;
//   license: string;
//   info: Car;
//   buyComplete: boolean;
//   buyError: boolean;
// }

// export const initialState: State = {
//   loading: false,
//   loaded: false,
//   error: false,
//   license: null,
//   info: null,
//   buyComplete: false,
//   buyError: false
// };

// export function reducer(state = initialState, action: Action): State {
//   switch (action.type) {
//     case CarActions.BUY_REQUEST:
//     case CarActions.GET_INFO_REQUEST: {
//       return Object.assign({}, state, {
//         loading: true
//       });
//     }

//     case CarActions.GET_INFO_SUCCESS: {
//       const car = action.payload;

//       return Object.assign({}, state, {
//         loading: false,
//         loaded: true,
//         error: false,
//         license: car.license,
//         info: car
//       });
//     }

//     case CarActions.GET_INFO_FAILURE: {
//       return Object.assign({}, state, {
//         loading: false,
//         loaded: false,
//         error: true,
//         license: null,
//         info: null
//       });
//     }

//     case CarActions.BUY_SUCCESS: {
//       return Object.assign({}, state, {
//         loading: false,
//         buyComplete: true,
//         buyError: false
//       });
//     }

//     case CarActions.BUY_FAILURE: {
//       return Object.assign({}, state, {
//         loading: false,
//         buyComplete: false,
//         buyError: true
//       });
//     }

//     case CarActions.RESET_CAR_STATE: {
//       return Object.assign({}, state, initialState);
//     }

//     default: {
//       return state;
//     }
//   }
// }

// export const getInfo = (state: State) => state.info;
// export const getLoaded = (state: State) => state.loaded;
// export const getLoading = (state: State) => state.loading;
// export const getError = (state: State) => state.error;
// export const getCarInfo = (state: State) => state.info;
// export const getLicense = (state: State) => state.license;
// export const getBuyComplete = (state: State) => state.buyComplete;
// export const getBuyError = (state: State) => state.buyError;
