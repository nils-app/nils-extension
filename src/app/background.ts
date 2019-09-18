chrome.tabs.onActivated.addListener((info) => {
  chrome.tabs.get(info.tabId, (change) => {
    onLoad(info.tabId, change.url)
  })
})
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  onLoad(tabId, tab.url)
})

const onLoad = (tabId: number, url: string) => {
  if (url === undefined) {
    chrome.browserAction.setIcon({
      path: 'icons/icon512-gray.png',
      tabId,
    })
    console.log('tab not defined')
  } else if (url.match(/https:\/\/(www\.)?google\.com\/*/) == null) {
    chrome.browserAction.setIcon({
      path: 'icons/icon512-green.png',
      tabId,
    })
    console.log('tab is not google')
  } else {
    chrome.browserAction.setPopup({
      tabId,
      popup: 'html/popup.html'
    })
    chrome.browserAction.setIcon({
      path: 'icons/icon512-orange.png',
      tabId,
    })
    console.log('tab is google')
  }
};