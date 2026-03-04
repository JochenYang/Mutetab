/**
 * Shortcut hint component for Popup
 * Displays keyboard shortcut information with styled kbd elements
 * Dynamically reads shortcuts from Chrome commands API
 */

import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { KeyOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ShortcutHintProps {
  shortcuts?: {
    muteCurrentTab?: string;
    muteAllTabs?: string;
  };
}

interface CommandInfo {
  name?: string;
  description?: string;
  shortcut?: string;
}

/**
 * Parses a shortcut string like "Ctrl+Shift+M" into an array
 * @param shortcut - Shortcut string from Chrome commands API
 * @returns Array of key names
 */
function parseShortcut(shortcut: string | undefined): string[] {
  if (!shortcut) return [];
  return shortcut.split('+').map(key => {
    // Normalize key names for display
    const keyMap: Record<string, string> = {
      'Control': 'Ctrl',
      'Command': 'Cmd',
      'Alt': 'Alt',
      'Shift': 'Shift',
    };
    return keyMap[key] || key;
  });
}

/**
 * Renders a keyboard shortcut with styled kbd elements
 * @param keys - Array of key names to display
 */
function ShortcutKeys({ keys }: { keys: string[] }) {
  if (keys.length === 0) {
    return null;
  }
  return (
    <>
      {keys.map((key, index) => (
        <React.Fragment key={key}>
          <kbd style={styles.kbd}>{key}</kbd>
          {index < keys.length - 1 && <Text style={styles.plus}>+</Text>}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * Renders when shortcut is not configured
 */
function NotConfigured() {
  return (
    <span style={styles.notConfigured}>
      未设置
    </span>
  );
}

export default function ShortcutHint(_props: ShortcutHintProps) {
  const [commands, setCommands] = useState<CommandInfo[]>([]);

  useEffect(() => {
    // Fetch actual registered shortcuts from Chrome
    chrome.commands.getAll((cmds) => {
      setCommands(cmds as CommandInfo[]);
    });
  }, []);

  // Find shortcut by command name
  const getShortcut = (commandName: string): string[] => {
    const cmd = commands.find(c => c.name === commandName);
    if (cmd && cmd.shortcut) {
      return parseShortcut(cmd.shortcut);
    }
    return [];
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <KeyOutlined style={{ color: 'var(--color-text-secondary)', marginRight: 8 }} />
        <Text strong style={{ color: 'var(--color-text)', fontSize: 13 }}>
          快捷键
        </Text>
      </div>

      <div style={styles.shortcutList}>
        {/* Single tab mute */}
        <div style={styles.shortcutItem}>
          <Text style={styles.shortcutLabel}>当前标签页</Text>
          <div style={styles.shortcutKeys}>
            <ShortcutKeys keys={getShortcut('mute-current-tab')} />
            {getShortcut('mute-current-tab').length === 0 && (
              <NotConfigured />
            )}
          </div>
        </div>

        <div style={styles.divider} />

        {/* All tabs mute */}
        <div style={styles.shortcutItem}>
          <Text style={styles.shortcutLabel}>全部标签页</Text>
          <div style={styles.shortcutKeys}>
            <ShortcutKeys keys={getShortcut('mute-all-tabs')} />
            {getShortcut('mute-all-tabs').length === 0 && (
              <NotConfigured />
            )}
          </div>
        </div>
      </div>

      <div style={styles.hint}>
        <Text style={styles.hintText}>
          点击右上角 ⚙️ 设置 → 快捷键设置
        </Text>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '4px 0',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
  },
  shortcutList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  shortcutItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: 'var(--color-card)',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)',
  },
  shortcutLabel: {
    color: 'var(--color-text)',
    fontSize: 13,
  },
  shortcutKeys: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  kbd: {
    display: 'inline-block',
    padding: '4px 8px',
    fontSize: 11,
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
    fontWeight: 600,
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    minWidth: 24,
    textAlign: 'center',
  },
  plus: {
    color: 'var(--color-text-secondary)',
    fontSize: 11,
    margin: '0 2px',
  },
  divider: {
    height: 1,
    backgroundColor: 'var(--color-border)',
    margin: '4px 0',
  },
  hint: {
    marginTop: 12,
    padding: '8px 12px',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-sm)',
    border: '1px dashed var(--color-border)',
    textAlign: 'center' as const,
  },
  hintText: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
  },
  notConfigured: {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
  },
};
