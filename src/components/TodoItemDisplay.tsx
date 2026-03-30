import { Button } from '@/components/ui/button';
import { DeleteDialog } from './DeleteDialog';
import { PencilIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Todo } from '@/types/todo';

interface TodoItemDisplayProps {
  todo: Todo;
  onEdit: () => void;
  onDelete: () => void;
}

export function TodoItemDisplay({ todo, onEdit, onDelete }: TodoItemDisplayProps) {
  return (
    <>
      <span
        className={cn(
          'flex-1 cursor-pointer transition-colors',
          todo.completed && 'text-muted-foreground line-through'
        )}
        onDoubleClick={onEdit}
      >
        {todo.text}
      </span>
      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 transition-opacity sm:group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onEdit}
        >
          <PencilIcon className="size-4 text-muted-foreground" />
        </Button>
        <DeleteDialog onConfirm={onDelete} />
      </div>
    </>
  );
}
