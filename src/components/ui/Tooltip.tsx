import React from 'react';
import MuiTooltip from '@mui/material/Tooltip';
import type { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: MuiTooltipProps['placement'];
  delay?: number;
  disabled?: boolean;
}

export default function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 300,
  disabled = false,
}: TooltipProps) {
  if (disabled || !content) return children;

  return (
    <MuiTooltip
      title={content}
      placement={placement}
      enterDelay={delay}
      arrow
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: 'var(--color-gray-800)',
            color: 'var(--color-gray-0)',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 400,
            lineHeight: 1.5,
            padding: '4px 8px',
            borderRadius: '4px',
            maxWidth: 240,
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          },
        },
        arrow: {
          sx: { color: 'var(--color-gray-800)' },
        },
      }}
    >
      {children}
    </MuiTooltip>
  );
}
