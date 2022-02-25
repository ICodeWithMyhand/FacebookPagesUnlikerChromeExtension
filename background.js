chrome.action.onClicked.addListener((tab) => {
  console.log('cliced')
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});