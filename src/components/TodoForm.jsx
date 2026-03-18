import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export function TodoForm({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1"
      />
      <Button type="submit" disabled={!text.trim()}>
        <PlusIcon className="size-4" />
        Add
      </Button>
    </form>
  )
}
