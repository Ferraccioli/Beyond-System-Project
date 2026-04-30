import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblings?: number;
  className?: string;
}

function buildRange(current: number, total: number, siblings: number): (number | '…')[] {
  if (total <= 1) return [1];
  if (total <= 2 * siblings + 5) return Array.from({ length: total }, (_, i) => i + 1);

  const left  = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  const pages: (number | '…')[] = [1];
  if (left > 2) pages.push('…');
  for (let p = left; p <= right; p++) pages.push(p);
  if (right < total - 1) pages.push('…');
  pages.push(total);
  return pages;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  siblings = 1,
  className,
}: PaginationProps) {
  const pages = buildRange(page, totalPages, siblings);

  const btnBase = 'w-8 h-8 flex items-center justify-center rounded-md text-xs font-sans font-medium transition-colors duration-150 select-none';

  return (
    <nav aria-label="pagination" className={clsx('flex items-center gap-1', className)}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={clsx(btnBase, page <= 1 ? 'text-disabled cursor-not-allowed' : 'text-body hover:bg-surface-dark cursor-pointer')}
        aria-label="Página anterior"
      >
        <ChevronLeft sx={{ fontSize: 18 }} />
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} className={clsx(btnBase, 'text-muted cursor-default')}>…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            aria-current={p === page ? 'page' : undefined}
            className={clsx(
              btnBase,
              'cursor-pointer',
              p === page ? 'bg-brand-500 text-inverted' : 'text-body hover:bg-surface-dark',
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={clsx(btnBase, page >= totalPages ? 'text-disabled cursor-not-allowed' : 'text-body hover:bg-surface-dark cursor-pointer')}
        aria-label="Próxima página"
      >
        <ChevronRight sx={{ fontSize: 18 }} />
      </button>
    </nav>
  );
}
