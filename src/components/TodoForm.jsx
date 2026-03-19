import { useState, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusIcon, MicIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TodoForm({ onAdd }) {
  const [text, setText] = useState('')
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  // Sync transcript to input field
  useEffect(() => {
    if (transcript) {
      setText(transcript)
    }
  }, [transcript])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text)
      setText('')
      resetTranscript()
      SpeechRecognition.stopListening()
    }
  }

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      resetTranscript()
      SpeechRecognition.startListening({ continuous: true })
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
      {browserSupportsSpeechRecognition && (
        <Button
          type="button"
          size="icon"
          variant={listening ? 'destructive' : 'outline'}
          onClick={toggleListening}
          aria-label={listening ? 'Stop recording' : 'Start voice input'}
        >
          <MicIcon className={cn('size-4', listening && 'animate-pulse')} />
        </Button>
      )}
    </form>
  )
}
