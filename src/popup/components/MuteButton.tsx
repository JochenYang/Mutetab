/**
 * Mute button component for Popup
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
        type={isMuted ? 'default' : 'primary'}
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
          backgroundColor: isMuted ? 'var(--color-card)' : 'var(--color-primary)',
          borderColor: isMuted ? 'var(--color-border)' : 'var(--color-primary)',
          boxShadow: isMuted ? 'var(--shadow-md)' : 'var(--shadow-lg)',
          transform: 'translateY(0)',
          transition: 'all var(--transition-normal)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      />
      <Text strong style={{
        marginTop: 16,
        color: 'var(--color-text)',
        fontSize: 16
      }}>
        {isMuted ? '已静音' : '播放中'}
      </Text>
      <Text style={{
        marginTop: 4,
        color: 'var(--color-text-secondary)',
        fontSize: 12
      }}>
        {pageTitle}
      </Text>
    </div>
  );
}
