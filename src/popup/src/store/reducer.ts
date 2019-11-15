import produce from "immer"
import { browser } from "webextension-polyfill-ts";

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
        draft.offline = false;
        draft.auth.user = action.payload.user;
        draft.auth.csrf = action.payload.csrf;
        break;
      case 'status':
        draft.offline = action.payload.offline;
        break;
      case 'updateState':
        draft.auth = {
          ...draft.auth,
          ...action.payload.auth,
        };
        draft.offline = action.payload.offline;
        draft.transactions = action.payload.transactions;
        break;
    }
  })(state, reducerAction);

  console.log('next state', nextState);

  // Preserve state locally
  if (browser.storage) {
    browser.storage.local.set({
      state: nextState,
    })
  }
  return nextState;
};