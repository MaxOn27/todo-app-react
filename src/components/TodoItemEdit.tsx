import { useState, type KeyboardEvent, type ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckIcon, XIcon } from 'lucide-react';

interface TodoItemEditProps {
  initialText: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

export function TodoItemEdit({ initialText, onSave, onCancel }: TodoItemEditProps) {
  // editText state is initialized only when this component mounts (when entering edit mode)
  const [editText, setEditText] = useState(initialText);

  const handleSave = () => {
    if (editText.trim()) {
      onSave(editText);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  return (
    <div className="flex flex-1 items-center gap-2">
      <Input
        type="text"
        value={editText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
        className="flex-1"
      />
      <Button variant="ghost" size="icon-sm" onClick={handleSave}>
        <CheckIcon className="size-4" />
      </Button>
      <Button variant="ghost" size="icon-sm" onClick={onCancel}>
        <XIcon className="size-4" />
      </Button>
    </div>
  );
}
