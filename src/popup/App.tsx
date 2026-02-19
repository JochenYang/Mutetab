/**
 * Popup main App component
 */

import { useState, useEffect } from 'react';
import { Button, Space, Typography, Divider } from 'antd';
import { SoundOutlined, SettingOutlined, CopyrightOutlined } from '@ant-design/icons';
import MuteButton from './components/MuteButton';
import ShortcutHint from './components/ShortcutHint';
import { Settings } from '../types';

const { Text } = Typography;

interface AppProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export default function App({ settings }: AppProps) {
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
      setCurrentTab(tab);
      setIsMuted(tab?.mutedInfo?.muted || false);
    });
  }, []);

  const handleOpenSettings = () => {
    chrome.runtime.openOptionsPage();
  };

  const getPageTitle = () => {
    if (!currentTab?.title) return '未知页面';
    return currentTab.title.length > 30
      ? currentTab.title.substring(0, 30) + '...'
      : currentTab.title;
  };

  return (
    <div style={{
      width: 320,
      padding: 16,
      background: 'var(--color-bg)',
      transition: 'background var(--transition-slow)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <Space>
          <SoundOutlined style={{ fontSize: 20, color: 'var(--color-primary)' }} />
          <Text strong style={{ color: 'var(--color-text)' }}>标签页静音</Text>
        </Space>
        <Button
          type="text"
          icon={<SettingOutlined />}
          onClick={handleOpenSettings}
          style={{ color: 'var(--color-text-secondary)' }}
        />
      </div>

      {/* Main mute button */}
      <MuteButton
        isMuted={isMuted}
        pageTitle={getPageTitle()}
        onToggle={async () => {
          if (currentTab?.id) {
            const newState = !isMuted;
            await chrome.tabs.update(currentTab.id, { muted: newState });
            setIsMuted(newState);
          }
        }}
      />

      <Divider style={{ margin: '20px 0', borderColor: 'var(--color-border)' }} />

      {/* Shortcut hints */}
      <ShortcutHint
        shortcuts={settings.shortcuts}
      />

      {/* Footer with signature */}
      <div style={styles.footer}>
        <CopyrightOutlined style={styles.footerIcon} />
        <Text style={styles.footerText}>2026 Jochen</Text>
      </div>
    </div>
  );
}

const styles = {
  footer: {
    marginTop: 16,
    paddingTop: 12,
    borderTop: '1px solid var(--color-border)',
    textAlign: 'center' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  footerIcon: {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
  },
  footerText: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
  },
};
