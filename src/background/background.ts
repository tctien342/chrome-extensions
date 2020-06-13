import './prototype';
/**
 * BEGIN OF DECLARE VARIABLE
 */
// Init value
let currentTab: chrome.tabs.Tab;

/**
 * BEGIN OF EVENT HANDLE
 */

/**
 * On change tab
 */
chrome.tabs.onActivated.addListener((tabInfo) => {
    chrome.tabs.get(tabInfo.tabId, (tab) => {
        if (!currentTab || currentTab.id !== tab.id) {
            // Current tab have been changed => update it to currentTab
            console.log('<i> Call onActive:', tab.url);
            currentTab = tab;
            // TODO: Do something when user switch tab
        }
    });
});

/**
 * On tabs update
 */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // Only run after web is loaded
    if (tabId === currentTab.id && changeInfo?.status === 'complete') {
        console.log('<i> Call onUpdate:', tab.url);
        console.log('<i> Call onUpdate infos:', changeInfo);
        // TODO: Do something after tab update !!
    }
});

/**
 * On receive message from popup or contentJS
 */
chrome.runtime.onMessage.addListener((event: { from: string; action: string; data?: any }, sender, response) => {
    if (['content', 'popup'].indexOf(event.from) !== -1) {
        // Incoming message to handle
        console.log('<i> Incoming message from:', event.from, '- action:', event.action);
        switch (event.action) {
            // TODO: Do something with request from popup or contentJS injected to website
            default:
                response(true);
                break;
        }
    }
});

/**
 *
 * BEGIN OF FUNCTIONS
 */

/**
 * Change icon of extension base on web safe state
 * @param state State of icon that need to be changed
 */
function changeIconBaseOnState(state: string) {
    switch (state) {
        // TODO: add icons of extension base on state of processing
        case 'processing': {
            chrome.browserAction.setIcon({ path: './images/Load.svg' }, () => true);
            break;
        }
        case 'safe': {
            chrome.browserAction.setIcon({ path: './images/Safe.svg' }, () => true);
            break;
        }
        case 'critical': {
            chrome.browserAction.setIcon({ path: './images/Warn.svg' }, () => true);
            break;
        }
        case 'unsafe': {
            chrome.browserAction.setIcon({ path: './images/Warn.svg' }, () => true);
            break;
        }
        // Handle other message
        default:
            chrome.browserAction.setIcon({ path: './images/128x128.png' }, () => true);
            break;
    }
}

/**
 * Send message to contentJS injected to website on current tab
 */
function sendToContent(content: { action: string; data: any }) {
    // TODO: Use sendToContent to contact with contentJS injected to website
    try {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.connect(tabs[0].id)?.postMessage({ from: 'background', action: content.action, data: content.data });
        });
    } catch (e) {
        console.log('<e> Error when sending message to content:', e);
    }
}
