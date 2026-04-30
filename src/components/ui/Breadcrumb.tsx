import clsx from 'clsx';
import { ChevronRight } from '@mui/icons-material';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={clsx('flex items-center flex-wrap', className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center">
            {isLast ? (
              <span
                aria-current="page"
                className="font-sans text-xs font-medium text-default"
              >
                {item.label}
              </span>
            ) : (
              <>
                <button
                  onClick={item.onClick}
                  className={clsx(
                    'font-sans text-xs font-normal text-muted transition-colors duration-150',
                    item.onClick ? 'hover:text-default cursor-pointer' : 'cursor-default',
                  )}
                >
                  {item.label}
                </button>
                <ChevronRight sx={{ fontSize: 14, color: 'var(--color-disabled)', mx: '2px' }} />
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}
