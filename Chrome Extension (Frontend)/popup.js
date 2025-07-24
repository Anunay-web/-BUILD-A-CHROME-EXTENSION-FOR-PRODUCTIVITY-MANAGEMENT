document.getElementById("openReport").addEventListener("click", () => {
  chrome.tabs.create({ url: "http://localhost:3000/report" });
});
