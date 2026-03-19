import { useState, useRef } from 'react'
import { Reorder, useDragControls } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DeleteDialog } from './DeleteDialog'
import { PencilIcon, CheckIcon, XIcon, GripVerticalIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const LONG_PRESS_DELAY = 300

export function TodoItem({ todo, onUpdate, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [isDragReady, setIsDragReady] = useState(false)
  const dragControls = useDragControls()
  const longPressTimer = useRef(null)
  const dragStarted = useRef(false)

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

  const handlePointerDown = (e) => {
    // Only apply delay for touch - mouse can drag immediately
    if (e.pointerType === 'touch') {
      longPressTimer.current = setTimeout(() => {
        setIsDragReady(true)
        // Don't call dragControls.start() here - event is stale after 300ms
        // Wait for fresh pointerMove event instead
      }, LONG_PRESS_DELAY)
    } else {
      dragControls.start(e)
    }
  }

  const handlePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    setIsDragReady(false)
    dragStarted.current = false
  }

  const handlePointerMove = (e) => {
    if (longPressTimer.current && e.pointerType === 'touch') {
      // Finger moved BEFORE long press completed - user is scrolling
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    } else if (isDragReady && e.pointerType === 'touch' && !dragStarted.current) {
      // Long press completed, start drag with this FRESH event (only once!)
      dragStarted.current = true
      dragControls.start(e)
    }
  }

  return (
    <Reorder.Item
      value={todo}
      dragListener={false}
      dragControls={dragControls}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerMove={handlePointerMove}
      whileDrag={{
        scale: 1.02,
        boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        cursor: 'grabbing'
      }}
      className={cn(
        "group flex cursor-grab select-none items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50 active:cursor-grabbing",
        isDragReady && "touch-none"
      )}
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
