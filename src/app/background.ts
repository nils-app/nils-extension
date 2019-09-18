import { getUrlStatus } from '../lib/tab';

chrome.tabs.onActivated.addListener((info) => {
  chrome.tabs.get(info.tabId, (change) => {
    onLoad(info.tabId, change.url);
  });
});
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  onLoad(tabId, tab.url);
});

const onLoad = (tabId: number, url: string) => {
  if (url === undefined) {
    chrome.browserAction.setIcon({
      path: 'icons/icon512-gray.png',
      tabId,
    });
  } else {
    const tabStatus = getUrlStatus(url);
    const statusMapping = {
      blocked: 'icons/icon512-orange.png',
      paid: 'icons/icon512-green.png',
      unsupported: 'icons/icon512-gray.png',
    };
    chrome.browserAction.setIcon({
      path: statusMapping[tabStatus.status],
      tabId,
    });
  }
};
