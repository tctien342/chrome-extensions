/**
 * Receive message from background or popup
 * @param event Message from background or popup script
 */
const contentEventHandle = (event: { from: string; action: string; data: any }) => {
    console.log('<i> Incoming event from:', event.from, ' - action:', event.action);
    switch (event.action) {
        // TODO: Handle event for contentJS
        default: {
            return true;
            break;
        }
    }
};

// Start scripts after setting up the connection
chrome.runtime.onConnect.addListener((eventPort) => {
    // Listen for popup or background messenger
    eventPort.onMessage.addListener(contentEventHandle);
    // Set listener for disconnection (aka. popup closed)
    eventPort.onDisconnect.addListener(() => {
        console.log('<i> Content.js - disconnected');
    });
});
