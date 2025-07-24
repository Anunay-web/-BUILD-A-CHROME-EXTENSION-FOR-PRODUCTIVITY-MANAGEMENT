let currentTab = null;
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  handleTabChange(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    handleTabChange(tab.url);
  }
});

function handleTabChange(url) {
  const domain = new URL(url).hostname;
  const endTime = Date.now();
  const timeSpent = (endTime - startTime) / 1000;

  if (currentTab) {
    sendToServer({ domain: currentTab, timeSpent });
  }

  currentTab = domain;
  startTime = endTime;
}

function sendToServer(data) {
  fetch("http://localhost:5000/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}
