/**
 * Settings page main App component
 */

import { useState, useEffect } from 'react';
import { Card, Typography, Radio, Switch, Button, Divider, message } from 'antd';
import { BgColorsOutlined, KeyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Settings } from '../types';
import { saveSettings } from '../utils/storage';

const { Title, Text } = Typography;
const { Group: RadioGroup, Button: RadioButton } = Radio;

export default function App({
  settings,
  onSettingsChange
}: {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}) {
  const [theme, setTheme] = useState<Settings['theme']>(settings.theme);
  const [rememberPreference, setRememberPreference] = useState(settings.rememberPreference);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTheme(settings.theme);
    setRememberPreference(settings.rememberPreference);
  }, [settings]);

  const handleThemeChange = (value: Settings['theme']) => {
    setTheme(value);
  };

  const handleRememberPreferenceChange = (checked: boolean) => {
    setRememberPreference(checked);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const newSettings: Settings = {
        theme,
        rememberPreference,
        shortcuts: settings.shortcuts
      };
      await saveSettings(newSettings);
      onSettingsChange(newSettings);
      message.success('设置已保存');
    } catch (error) {
      message.error('保存失败，请重试');
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const openChromeShortcuts = () => {
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
  };

  const openEdgeShortcuts = () => {
    chrome.tabs.create({ url: 'edge://extensions/shortcuts' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <Title level={4} style={styles.title}>静音插件设置</Title>
          <Text type="secondary">自定义您的静音体验</Text>
        </div>

        <Card style={styles.card} bordered={false}>
          <div style={styles.cardHeader}>
            <BgColorsOutlined style={styles.cardIcon} />
            <Text strong style={styles.cardTitle}>主题外观</Text>
          </div>

          <RadioGroup
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            style={styles.radioGroup}
          >
            <RadioButton value="light" style={styles.radioButton}>
              浅色
            </RadioButton>
            <RadioButton value="dark" style={styles.radioButton}>
              深色
            </RadioButton>
            <RadioButton value="system" style={styles.radioButton}>
              跟随系统
            </RadioButton>
          </RadioGroup>

          <div style={styles.cardHint}>
            <InfoCircleOutlined style={{ marginRight: 4 }} />
            <Text type="secondary">选择浅色、深色或跟随系统主题设置</Text>
          </div>
        </Card>

        <Card style={styles.card} bordered={false}>
          <div style={styles.cardHeader}>
            <KeyOutlined style={styles.cardIcon} />
            <Text strong style={styles.cardTitle}>快捷键设置</Text>
          </div>

          <div style={styles.shortcutInfo}>
            <div style={styles.shortcutRow}>
              <Text style={styles.shortcutLabel}>当前标签页静音</Text>
              <kbd style={styles.kbd}>Ctrl + M</kbd>
            </div>
            <div style={styles.shortcutRow}>
              <Text style={styles.shortcutLabel}>全部标签页静音</Text>
              <Text type="secondary">需手动设置</Text>
            </div>
          </div>

          <div style={styles.cardHint}>
            <InfoCircleOutlined style={{ marginRight: 4 }} />
            <Text type="secondary">请在浏览器扩展设置中自定义快捷键：</Text>
            <div style={styles.linkContainer}>
              <Text style={styles.link} onClick={openChromeShortcuts}>
                Chrome: chrome://extensions/shortcuts
              </Text>
              <Text style={styles.link} onClick={openEdgeShortcuts}>
                Edge: edge://extensions/shortcuts
              </Text>
            </div>
          </div>
        </Card>

        <Card style={styles.card} bordered={false}>
          <div style={styles.cardHeader}>
            <Text strong style={styles.cardTitle}>偏好设置</Text>
          </div>

          <div style={styles.preferenceItem}>
            <div style={styles.preferenceLabel}>
              <Text>记住域名静音偏好</Text>
              <Text type="secondary" style={styles.preferenceDesc}>
                自动记忆每个网站的静音状态
              </Text>
            </div>
            <Switch
              checked={rememberPreference}
              onChange={handleRememberPreferenceChange}
            />
          </div>
        </Card>

        <div style={styles.saveSection}>
          <Button
            type="primary"
            size="large"
            onClick={handleSave}
            loading={saving}
            style={styles.saveButton}
          >
            保存设置
          </Button>
        </div>

        <Divider style={styles.divider} />
        <div style={styles.footer}>
          <Text type="secondary" style={styles.version}>
            MuteTab v1.0.0
          </Text>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg)',
    transition: 'background-color var(--transition-slow)',
    padding: '24px 16px',
  },
  content: {
    maxWidth: 560,
    margin: '0 auto',
  },
  header: {
    marginBottom: 24,
    textAlign: 'center',
  },
  title: {
    marginBottom: 4,
    color: 'var(--color-text)',
  },
  card: {
    marginBottom: 16,
    backgroundColor: 'var(--color-card)',
    borderRadius: 'var(--radius-md)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 18,
    marginRight: 8,
    color: 'var(--color-primary)',
  },
  cardTitle: {
    fontSize: 15,
    color: 'var(--color-text)',
  },
  radioGroup: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  radioButton: {
    flex: 1,
    textAlign: 'center',
    minWidth: 80,
  },
  cardHint: {
    marginTop: 12,
    fontSize: 12,
  },
  shortcutInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  shortcutRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  shortcutLabel: {
    color: 'var(--color-text)',
    fontSize: 14,
    whiteSpace: 'nowrap',
  },
  kbd: {
    display: 'inline-block',
    padding: '4px 10px',
    fontSize: 12,
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
    fontWeight: 600,
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
  },
  linkContainer: {
    marginTop: 8,
  },
  link: {
    color: 'var(--color-primary)',
    cursor: 'pointer',
    display: 'block',
    marginTop: 4,
  },
  preferenceItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preferenceLabel: {
    display: 'flex',
    flexDirection: 'column',
  },
  preferenceDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  saveSection: {
    marginTop: 24,
    textAlign: 'center',
  },
  saveButton: {
    minWidth: 160,
    height: 44,
  },
  divider: {
    borderColor: 'var(--color-border)',
    margin: '24px 0',
  },
  footer: {
    textAlign: 'center',
  },
  version: {
    fontSize: 12,
  },
};
