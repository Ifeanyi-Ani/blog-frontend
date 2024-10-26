import { ChevronUp, ChevronDown } from 'lucide-react';

export type SortField = string;
export type SortDirection = 'asc' | 'desc';

interface SortOption<T extends SortField> {
  field: T;
  label: string;
}

interface SortableHeaderProps<T extends SortField> {
  sortOptions: SortOption<T>[];
  currentSortField: T;
  currentSortDirection: SortDirection;
  onSort: (field: T) => void;
}

export function SortableHeader<T extends SortField>({
  sortOptions,
  currentSortField,
  currentSortDirection,
  onSort,
}: SortableHeaderProps<T>) {
  return (
    <div className="hidden items-center space-x-2 md:flex">
      {sortOptions.map((option) => (
        <SortButton
          key={option.field}
          field={option.field}
          label={option.label}
          isActive={currentSortField === option.field}
          direction={
            currentSortField === option.field ? currentSortDirection : undefined
          }
          onClick={() => onSort(option.field)}
        />
      ))}
    </div>
  );
}

interface SortButtonProps<T extends SortField> {
  field: T;
  label: string;
  isActive: boolean;
  direction?: SortDirection;
  onClick: () => void;
}

function SortButton<T extends SortField>({
  label,
  isActive,
  direction,
  onClick,
}: SortButtonProps<T>) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive
          ? 'bg-destructive text-destructive-foreground hover:bg-accent-foreground/50 hover:text-accent'
          : 'bg-secondary text-secondary-foreground hover:bg-accent-foreground/50 hover:text-accent'
      } h-10 px-4 py-2`}
    >
      {label}
      {isActive && direction && (
        <span className="ml-2">
          {direction === 'asc' ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      )}
    </button>
  );
}
