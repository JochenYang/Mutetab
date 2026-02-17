/**
 * Background Service Worker for MuteTab Chrome Extension
 * Handles keyboard shortcuts and tab mute operations
 */

import { saveMuteState } from '../utils/storage';

/**
 * Listen for keyboard shortcut commands
 */
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'mute-current-tab') {
    await muteCurrentTab();
  } else if (command === 'mute-all-tabs') {
    await muteAllTabs();
  }
});

/**
 * Mute/unmute the currently active tab
 */
async function muteCurrentTab(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id !== undefined) {
    const isMuted = tab.mutedInfo?.muted || false;
    // Use the correct Chrome API: 'muted' property instead of 'mutedInfo'
    await chrome.tabs.update(tab.id, { muted: !isMuted });
    await saveMuteState(tab.id, !isMuted);
  }
}

/**
 * Mute/unmute all tabs in the current window
 */
async function muteAllTabs(): Promise<void> {
  const tabs = await chrome.tabs.query({});

  // Check if all tabs are muted - if so, unmute all; otherwise mute all
  const allMuted = tabs.every(tab => tab.mutedInfo?.muted === true);
  const newMutedState = !allMuted;

  for (const tab of tabs) {
    if (tab.id !== undefined) {
      await chrome.tabs.update(tab.id, { muted: newMutedState });
      await saveMuteState(tab.id, newMutedState);
    }
  }
}

/**
 * Listen for tab updates to sync mute state
 */
chrome.tabs.onUpdated.addListener(async (tabId, _changeInfo, tab) => {
  if (tab?.mutedInfo) {
    await saveMuteState(tabId, tab.mutedInfo.muted);
  }
});

/**
 * Initialize extension on install
 */
chrome.runtime.onInstalled.addListener(() => {
  console.log('MuteTab 插件已安装');
});
