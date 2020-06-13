// Init core for calling background and content script
const core = chrome;

/**
 * Send an event to backgroundJS
 */
export function sendEventToBackground(event: { action: string; data?: any }): Promise<any> {
	// TODO: Send and event to backgroundJS
	return new Promise((rs, rj) => {
		try {
			core.runtime.sendMessage(
				core.runtime.id,
				{
					from: 'popup',
					action: event.action,
					data: event?.data,
				},
				(res: any) => {
					// Response from background
					rs(res);
				},
			);
		} catch (e) {
			rs(false);
		}
	});
}

/**
 * Return url of current website
 */
export function getCurrentWebUrl(): Promise<string> {
	return new Promise((rs, rj) => {
		try {
			core.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
				rs(tabs[0].url);
			});
		} catch (e) {
			rs('');
		}
	});
}
