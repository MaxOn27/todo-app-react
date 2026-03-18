import { AnimatePresence, motion } from 'framer-motion'
import { TodoItem } from './TodoItem'
import { ListTodoIcon } from 'lucide-react'

export function TodoList({ todos, onUpdate, onDelete, onToggle }) {
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
    <div className="flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: index * 0.05 }
            }}
            exit={{ opacity: 0, x: -20 }}
          >
            <TodoItem
              todo={todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
