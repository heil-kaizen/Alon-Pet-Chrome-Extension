document.getElementById('get-quote').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "show_quote" });
    window.close(); // Closes the popup after clicking
  });
});

document.getElementById('wake-up').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // This wakes Alon up and makes him happy
    chrome.tabs.sendMessage(tabs[0].id, { action: "pet_alon" }); 
    window.close();
  });
});