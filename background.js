// 1. Setup the 2-minute alarm on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("alonQuoteAlarm", { periodInMinutes: 2 });
});

// 2. Helper function to send message to the active tab
function triggerAlonQuote(tabId) {
  chrome.tabs.sendMessage(tabId, { action: "show_quote" }).catch((err) => {
    console.log("Waiting for page to be ready for Alon...");
  });
}

// 3. Handle manual icon clicks
chrome.action.onClicked.addListener((tab) => {
  triggerAlonQuote(tab.id);
});

// 4. Handle automated alarm (Every 2 Minutes)
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "alonQuoteAlarm") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url.startsWith("http")) {
        triggerAlonQuote(tabs[0].id);
      }
    });
  }
});
