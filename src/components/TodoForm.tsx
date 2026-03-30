import { useState, type FormEvent, type ChangeEvent } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon, MicIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [typedText, setTypedText] = useState('');
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Derive the display value instead of syncing with useEffect
  // When listening, show transcript; otherwise show what user typed
  const displayValue = listening ? transcript : typedText;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textToSubmit = displayValue.trim();
    if (textToSubmit) {
      onAdd(textToSubmit);
      setTypedText('');
      resetTranscript();
      try {
        await SpeechRecognition.stopListening();
      } catch (error) {
        console.error('Failed to stop listening:', error);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // If user types while listening, stop listening and transfer transcript to typed text
    if (listening) {
      SpeechRecognition.stopListening().catch(console.error);
      // Keep the transcript content plus any new input
      setTypedText(transcript + newValue.slice(transcript.length));
    } else {
      setTypedText(newValue);
    }
  };

  const toggleListening = async () => {
    if (listening) {
      try {
        await SpeechRecognition.stopListening();
        // Transfer transcript to typed text when stopping
        if (transcript) {
          setTypedText(transcript);
        }
      } catch (error) {
        console.error('Failed to stop listening:', error);
      }
    } else {
      resetTranscript();
      setTypedText('');
      try {
        await SpeechRecognition.startListening({ continuous: true });
      } catch (error) {
        console.error('Speech recognition failed:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        placeholder="What needs to be done?"
        className="flex-1"
      />
      <Button type="submit" disabled={!displayValue.trim()}>
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
  );
}
