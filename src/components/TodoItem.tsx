import { useState, type PointerEvent } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { TodoItemDisplay } from './TodoItemDisplay';
import { TodoItemEdit } from './TodoItemEdit';
import { GripVerticalIcon } from 'lucide-react';
import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export function TodoItem({ todo, onUpdate, onDelete, onToggle }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const dragControls = useDragControls();

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (text: string) => {
    onUpdate(todo.id, text);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDragStart = (e: PointerEvent) => {
    dragControls.start(e);
  };

  return (
    <Reorder.Item
      value={todo}
      dragListener={false}
      dragControls={dragControls}
      whileDrag={{
        scale: 1.02,
        boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        cursor: 'grabbing'
      }}
      className="group flex cursor-grab select-none items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50 active:cursor-grabbing"
    >
      <div
        onPointerDown={handleDragStart}
        className="cursor-grab touch-none text-muted-foreground opacity-50 transition-opacity hover:opacity-100 active:cursor-grabbing"
      >
        <GripVerticalIcon className="size-5 sm:size-4" />
      </div>

      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleToggle}
        className="shrink-0"
      />

      {isEditing ? (
        <TodoItemEdit
          initialText={todo.text}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <TodoItemDisplay
          todo={todo}
          onEdit={handleStartEdit}
          onDelete={handleDelete}
        />
      )}
    </Reorder.Item>
  );
}
