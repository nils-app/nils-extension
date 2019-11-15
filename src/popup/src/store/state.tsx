import React, { useEffect } from 'react';
import { browser } from "webextension-polyfill-ts";

import reducer from './reducer';
import { AppState, AppContext, Action } from './types';

let initialState: AppState = {
  auth: {
    checked: false,
    loggedIn: false,
    user: null,
    csrf: null,
  },
  transactions: [],
  offline: false,
};

const defaultDispatch: React.Dispatch<Action> = () => {
  console.warn('Using default reducer, check StateProvider');
  return initialState;
}
export const StateContext = React.createContext<AppContext>({
  state: initialState,
  dispatch: defaultDispatch,
});

type Props = {
  children: any,
};

export const StateProvider = (props: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    // Read from local storage
    if (browser.storage) {
      try {
        const stateKey = 'state';
        browser.storage.local.get(stateKey).then((storageData) => {
          const initialStoredState = storageData[stateKey];
          if (initialStoredState) {
            console.log('reading stored state', initialStoredState);
            dispatch({
              type: 'updateState',
              payload: initialStoredState,
            })
          }
        });
      } catch (e) {
        console.warn('Unable to read stored state', e);
      }
    }
  }, []);

  return (
    <StateContext.Provider value={ value }>
      { props.children }
    </StateContext.Provider>
  );
};

export const useStateValue = (): AppContext => React.useContext(StateContext);