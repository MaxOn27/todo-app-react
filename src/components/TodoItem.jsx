import { useState } from 'react'
import { motion } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DeleteDialog } from './DeleteDialog'
import { PencilIcon, CheckIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TodoItem({ todo, onUpdate, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

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
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50"
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="shrink-0"
      />

      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
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
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
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
    </motion.div>
  )
}
