/**
 * Chrome storage utilities for persisting settings and mute states
 */

import { Settings, defaultSettings } from '../types';

const SETTINGS_KEY = 'mute-tab-settings';
const MUTE_STATE_KEY = 'mute-tab-states';

/**
 * Get settings from chrome.storage.local
 */
export async function getSettings(): Promise<Settings> {
  const result = await chrome.storage.local.get(SETTINGS_KEY);
  return result[SETTINGS_KEY] || defaultSettings;
}

/**
 * Save settings to chrome.storage.local
 */
export async function saveSettings(settings: Settings): Promise<void> {
  await chrome.storage.local.set({ [SETTINGS_KEY]: settings });
}

/**
 * Get all mute states from chrome.storage.local
 */
export async function getMuteStates(): Promise<Record<number, boolean>> {
  const result = await chrome.storage.local.get(MUTE_STATE_KEY);
  return result[MUTE_STATE_KEY] || {};
}

/**
 * Save mute state for a specific tab
 */
export async function saveMuteState(tabId: number, isMuted: boolean): Promise<void> {
  const states = await getMuteStates();
  states[tabId] = isMuted;
  await chrome.storage.local.set({ [MUTE_STATE_KEY]: states });
}
