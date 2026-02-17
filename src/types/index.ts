/**
 * Type definitions for MuteTab Chrome Extension
 */

/**
 * Mute state for a single tab
 */
export interface MuteState {
  tabId: number;
  isMuted: boolean;
  url?: string;
}

/**
 * User settings for the extension
 */
export interface Settings {
  theme: 'light' | 'dark' | 'system';
  rememberPreference: boolean;
  shortcuts: {
    muteCurrentTab: string;
    muteAllTabs: string;
  };
}

/**
 * Default settings for the extension
 */
export const defaultSettings: Settings = {
  theme: 'light',
  rememberPreference: false,
  shortcuts: {
    muteCurrentTab: 'Ctrl+M',
    muteAllTabs: 'Ctrl+Alt+M'
  }
};
