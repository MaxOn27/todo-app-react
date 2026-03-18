import { useState } from 'react'
import { Reorder, useDragControls } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DeleteDialog } from './DeleteDialog'
import { PencilIcon, CheckIcon, XIcon, GripVerticalIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TodoItem({ todo, onUpdate, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const dragControls = useDragControls()

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <Reorder.Item
      value={todo}
      dragListener={false}
      dragControls={dragControls}
      onPointerDown={(e) => dragControls.start(e)}
      whileDrag={{
        scale: 1.02,
        boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        cursor: 'grabbing'
      }}
      className="group flex cursor-grab touch-none select-none items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50 active:cursor-grabbing"
    >
      <div className="text-muted-foreground opacity-50">
        <GripVerticalIcon className="size-5 sm:size-4" />
      </div>

      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        onPointerDown={(e) => e.stopPropagation()}
        className="shrink-0"
      />

      {isEditing ? (
        <div className="flex flex-1 items-center gap-2" onPointerDown={(e) => e.stopPropagation()}>
          <Input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1"
          />
          <Button variant="ghost" size="icon-sm" onClick={handleSave}>
            <CheckIcon className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={handleCancel}>
            <XIcon className="size-4" />
          </Button>
        </div>
      ) : (
        <>
          <span
            className={cn(
              'flex-1 cursor-pointer transition-colors',
              todo.completed && 'text-muted-foreground line-through'
            )}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
          <div className="flex items-center gap-1 opacity-100 sm:opacity-0 transition-opacity sm:group-hover:opacity-100" onPointerDown={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsEditing(true)}
            >
              <PencilIcon className="size-4 text-muted-foreground" />
            </Button>
            <DeleteDialog onConfirm={() => onDelete(todo.id)} />
          </div>
        </>
      )}
    </Reorder.Item>
  )
}
