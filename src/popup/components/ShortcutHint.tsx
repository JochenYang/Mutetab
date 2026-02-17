/**
 * Shortcut hint component for Popup
 * Displays keyboard shortcut information with styled kbd elements
 */

import React from 'react';
import { Typography } from 'antd';
import { KeyOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ShortcutHintProps {
  shortcuts?: {
    muteCurrentTab?: string;
    muteAllTabs?: string;
  };
}

/**
 * Renders a keyboard shortcut with styled kbd elements
 * @param keys - Array of key names to display
 */
function ShortcutKeys({ keys }: { keys: string[] }) {
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

export default function ShortcutHint(_props: ShortcutHintProps) {
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
            <ShortcutKeys keys={['Ctrl', 'M']} />
          </div>
        </div>

        <div style={styles.divider} />

        {/* All tabs mute */}
        <div style={styles.shortcutItem}>
          <Text style={styles.shortcutLabel}>全部标签页</Text>
          <div style={styles.shortcutKeys}>
            <ShortcutKeys keys={['Ctrl', 'Shift', 'M']} />
          </div>
        </div>
      </div>

      <Text style={styles.hint}>
        点击右上角设置 → 快捷键设置 查看详情
      </Text>
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
    display: 'block',
    marginTop: 12,
    fontSize: 11,
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
  },
  needsSetup: {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
    fontStyle: 'italic',
  },
};
