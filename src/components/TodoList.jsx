import { Reorder, motion } from 'framer-motion'
import { TodoItem } from './TodoItem'
import { ListTodoIcon } from 'lucide-react'

export function TodoList({ todos, onUpdate, onDelete, onToggle, onReorder }) {
  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground"
      >
        <ListTodoIcon className="size-12 opacity-50" />
        <p className="text-sm">No todos yet. Add one above!</p>
      </motion.div>
    )
  }

  return (
    <Reorder.Group
      axis="y"
      values={todos}
      onReorder={onReorder}
      className="flex flex-col gap-2"
    >
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </Reorder.Group>
  )
}
