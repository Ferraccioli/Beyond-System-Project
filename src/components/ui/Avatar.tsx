import clsx from 'clsx';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

const sizeMap = {
  xs: { wrap: 'w-6 h-6',   text: 'text-3xs', dot: 'w-1.5 h-1.5 -bottom-0.5 -right-0.5' },
  sm: { wrap: 'w-8 h-8',   text: 'text-2xs', dot: 'w-2 h-2 bottom-0 right-0' },
  md: { wrap: 'w-10 h-10', text: 'text-xs',  dot: 'w-2.5 h-2.5 bottom-0 right-0' },
  lg: { wrap: 'w-12 h-12', text: 'text-sm',  dot: 'w-3 h-3 bottom-0.5 right-0.5' },
  xl: { wrap: 'w-14 h-14', text: 'text-base',dot: 'w-3.5 h-3.5 bottom-0.5 right-0.5' },
};

const statusMap = {
  online:  'bg-success',
  offline: 'bg-disabled',
  busy:    'bg-warning',
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({ src, alt, name, size = 'md', status, className }: AvatarProps) {
  const { wrap, text, dot } = sizeMap[size];

  return (
    <div className={clsx('relative inline-flex flex-shrink-0', className)}>
      <div
        className={clsx(
          'rounded-full flex items-center justify-center overflow-hidden select-none font-sans font-semibold',
          wrap,
          text,
          src ? '' : 'bg-brand-100 text-brand-700',
        )}
      >
        {src
          ? <img src={src} alt={alt ?? name ?? 'avatar'} className="w-full h-full object-cover" />
          : <span>{name ? initials(name) : '?'}</span>
        }
      </div>

      {status && (
        <span
          className={clsx(
            'absolute rounded-full ring-2 ring-white',
            dot,
            statusMap[status],
          )}
        />
      )}
    </div>
  );
}
