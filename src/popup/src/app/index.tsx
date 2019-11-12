import React, { useEffect, useState } from "react";
import { browser } from "webextension-polyfill-ts";

import { TabStatus, getUrlStatus } from "../lib/tabs";
import useCheckLogin from "../lib/checkAuth";
import { useStateValue } from "../store/state";
import { BackgroundApi } from '../../../background/types';

export default () => {
  const { state } = useStateValue();
  const [ tabStatus, setTabStatus ] = useState<TabStatus | null>(null);

  useCheckLogin();

  useEffect(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then(
      tabs => {
        if (tabs.length < 1 || !tabs[0].url) {
          console.log(" no tab!");
          return null;
        }
        getUrlStatus(tabs[0].url).then((status) => {
          setTabStatus(status);
        });
      },
      () => {
        setTabStatus(null);
      }
    );
  }, []);

  // chrome.runtime.getBackgroundPage(async (backgroundWindow: any) => {
  //   if (!backgroundWindow.nils) {
  //     return;
  //   }
  //   const backgroundApi: BackgroundApi = backgroundWindow.nils;
  //   // access any background methods here
  // });

  if (!state.auth.checked) {
    // Loading
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <pre className='code'>
      <p>Popup content, live reloads</p>
      <p>{ JSON.stringify(tabStatus, null, 2) }</p>
      <p>{ JSON.stringify(state.auth.user, null, 2) }</p>
    </pre>
  );
};
