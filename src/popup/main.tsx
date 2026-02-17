/**
 * Popup page entry point for MuteTab Chrome Extension
 */

import { useEffect, useState, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme, Spin } from 'antd';
import App from './App';
import { getSettings } from '../utils/storage';
import '../styles/global.css';

function Root() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings().then(s => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  const currentTheme = settings?.theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : (settings?.theme || 'light');

  // Apply theme to document for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--color-bg)'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#0D9488',
          borderRadius: 12,
        }
      }}
    >
      <App settings={settings} onSettingsChange={setSettings} />
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
