// Helper to send message to the active tab
function sendCommand(actionName) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: actionName });
      // We don't close window automatically anymore so you can click multiple things
    }
  });
}

document.getElementById('btn-jump').addEventListener('click', () => sendCommand('trigger_jump'));
document.getElementById('btn-money').addEventListener('click', () => sendCommand('trigger_money'));
document.getElementById('btn-sleep').addEventListener('click', () => sendCommand('trigger_sleep'));
document.getElementById('btn-quote').addEventListener('click', () => sendCommand('show_quote'));
