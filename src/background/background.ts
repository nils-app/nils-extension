import { browser } from "webextension-polyfill-ts";

import { BackgroundApi } from './types';
import { getUrlStatus } from "../popup/src/lib/tabs";

// Extend the window object
declare global {
  interface Window { nils: BackgroundApi; }
}

window.nils = window.nils || {};

/**
 * Define the public API, callable from the Popup window
 * It will be available in background.nils
 */
const backgroundApi: BackgroundApi = {};

/**
 * Private API
 */

browser.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (tab.url && (change.attention === false || change.status === 'complete')) {
    console.log('tab updated', change, tab.url);
    onLoad(tabId, tab.url);
  }
}, {
  properties: ['attention', 'status'],
});

const onLoad = async (tabId: number, url: string) => {
  if (url === undefined) {
    browser.browserAction.setIcon({
      path: '/assets/icon512-gray.png',
      tabId,
    });
    return;
  }

  const tabStatus = await getUrlStatus(url);
  const statusMapping: any = {
    blocked: '/assets/icon512-orange.png',
    paid: '/assets/icon512-green.png',
    unsupported: '/assets/icon512-gray.png',
  };
  browser.browserAction.setIcon({
    path: statusMapping[tabStatus.status],
    tabId,
  });
};

window.nils = backgroundApi;