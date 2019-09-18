chrome.tabs.onActivated.addListener((info) => {
  chrome.tabs.get(info.tabId, (change) => {
    console.log('loaded', change.url);
    if (change.url === undefined) {
      chrome.browserAction.setPopup({ tabId: info.tabId, popup: '' })
      chrome.browserAction.setIcon({
        path: 'icons/icon512-gray.png',
        tabId: info.tabId
      })
      console.log('tab not defined')
    } else if (change.url.match(/https:\/\/(www\.)?google\.com\/*/) == null) {
      chrome.browserAction.setPopup({ tabId: info.tabId, popup: '' })
      chrome.browserAction.setIcon({
        path: 'icons/icon512-green.png',
        tabId: info.tabId
      })
      console.log('tab is not google')
    } else {
      chrome.browserAction.setPopup({
        tabId: info.tabId,
        popup: 'html/popup.html'
      })
      chrome.browserAction.setIcon({
        path: 'icons/icon512-orange.png',
        tabId: info.tabId
      })
      console.log('tab is google')
    }
  })
})
// chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
//   if (tab.url === undefined) {
//     return
//   } else if (tab.url.match(/https:\/\/google\.com\/*/) == null) {
//     chrome.browserAction.setPopup({ tabId: tabId, popup: '' })
//     chrome.browserAction.setIcon({
//       path: 'icons/icon512-green.png',
//       tabId: tabId
//     })
//     console.log('updated: not google')
//   } else {
//     chrome.browserAction.setIcon({ path: 'icons/icon512-orange.png', tabId: tabId })
//     console.log('updated: google')
//   }
// })
