chrome.action.onClicked.addListener((tab) => {
  if (tab.id && tab.url.startsWith('http')) {
    chrome.tabs.sendMessage(tab.id, { action: "show_quote" });
  }
});