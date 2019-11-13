import produce from "immer"

import { AppState, Action } from "./types";

export default (state: AppState, reducerAction: Action) => {
  const nextState = produce((draft: AppState, action: Action) => {
    console.info('REDUCER: ', action.type);
    console.log(action.payload);
    switch (action.type) {
      case 'login':
        draft.auth.checked = true;

        if (!action.payload) {
          break;
        }

        draft.auth.loggedIn = true;
        draft.auth.user = action.payload.user;
        draft.auth.csrf = action.payload.csrf;
        break;
      case 'status':
        draft.offline = action.payload.offline;
        break;
    }
  })(state, reducerAction);
  console.log('new state', nextState);
  return nextState;
};