import { useState, useEffect } from 'react'

const STORAGE_KEY = 'todos'

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now()
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const updateTodo = (id, text) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: text.trim() } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
  }
}
