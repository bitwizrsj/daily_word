chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ lastWordDate: null, wordData: {} });
});

chrome.tabs.onCreated.addListener(() => {
    const today = new Date().toISOString().slice(0, 10);
    chrome.storage.local.get(['lastWordDate'], function(result) {
        if (result.lastWordDate !== today) {
            fetchWordOfTheDay();
        }
    });
});
