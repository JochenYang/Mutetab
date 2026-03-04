/**
 * Mute button component for Popup
 * Enhanced with professional visual feedback and smooth transitions
 */

import { Button, Typography } from 'antd';
import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface MuteButtonProps {
  isMuted: boolean;
  pageTitle: string;
  onToggle: () => void;
}

export default function MuteButton({ isMuted, pageTitle, onToggle }: MuteButtonProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 0'
    }}>
      <Button
        type="default"
        shape="circle"
        size="large"
        icon={isMuted
          ? <AudioMutedOutlined style={{ fontSize: 32 }} />
          : <AudioOutlined style={{ fontSize: 32 }} />
        }
        onClick={onToggle}
        style={{
          width: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Enhanced visual states with stronger contrast
          backgroundColor: isMuted ? 'var(--color-card)' : 'var(--color-primary)',
          borderColor: isMuted ? 'var(--color-border)' : 'var(--color-primary)',
          boxShadow: isMuted ? 'var(--shadow-md)' : 'var(--shadow-primary)',
          transform: 'translateY(0)',
          transition: 'all var(--transition-normal)',
          // Visual feedback for muted state
          opacity: isMuted ? 0.85 : 1,
        }}
        onMouseEnter={(e) => {
          // Subtle scale on hover
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = isMuted ? 'var(--shadow-lg)' : 'var(--shadow-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = isMuted ? 'var(--shadow-md)' : 'var(--shadow-primary)';
        }}
      />
      <Text strong style={{
        marginTop: 16,
        color: 'var(--color-text)',
        fontSize: 16,
        transition: 'color var(--transition-normal)',
      }}>
        {isMuted ? '已静音' : '播放中'}
      </Text>
      <Text style={{
        marginTop: 4,
        color: 'var(--color-text-secondary)',
        fontSize: 12,
        maxWidth: 260,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {pageTitle}
      </Text>
    </div>
  );
}
