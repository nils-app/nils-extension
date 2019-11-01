import React, { useEffect, useState } from "react";
import { browser } from "webextension-polyfill-ts";

import { TabStatus, getUrlStatus } from "../lib/tabs";

export default () => {
  const [ tabStatus, setTabStatus ] = useState<TabStatus | null>(null);

  useEffect(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then(
      tabs => {
        if (tabs.length < 1 || !tabs[0].url) {
          console.log(" no tab!");
          return null;
        }
        setTabStatus(
          getUrlStatus(tabs[0].url)
        );
      },
      () => {
        setTabStatus(null);
      }
    );
  }, []);

  return (
    <pre className='code'>
      <p>Popup content test</p>
      <p>{ JSON.stringify(tabStatus, null, 2) }</p>
    </pre>
  );
};
