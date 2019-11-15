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

browser.tabs.onActivated.addListener((info) => {
  chrome.tabs.get(info.tabId, (change) => {
    if (change.url) {
      onLoad(info.tabId, change.url);
    }
  });
});

browser.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (tab.url) {
    onLoad(tabId, tab.url);
  }
});

const onLoad = async (tabId: number, url: string) => {
  if (url === undefined) {
    console.log('url undefined');
    browser.browserAction.setIcon({
      path: '/assets/icon512-gray.png',
      tabId,
    });
  } else {
    const tabStatus = await getUrlStatus(url);
    console.log('background', tabStatus);
    const statusMapping: any = {
      blocked: '/assets/icon512-orange.png',
      paid: '/assets/icon512-green.png',
      unsupported: '/assets/icon512-gray.png',
    };
    console.log('status for icon', tabStatus.status);
    browser.browserAction.setIcon({
      path: statusMapping[tabStatus.status],
      tabId,
    });
  }
};

window.nils = backgroundApi;