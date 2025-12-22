chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("alonQuoteAlarm", { periodInMinutes: 2 });
});

function triggerAlonQuote(tabId) {
  chrome.tabs.sendMessage(tabId, { action: "show_quote" }).catch(() => {});
}

chrome.action.onClicked.addListener((tab) => {
    if (tab.id) triggerAlonQuote(tab.id);
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "alonQuoteAlarm") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url.startsWith("http")) {
        triggerAlonQuote(tabs[0].id);
      }
    });
  }
});
