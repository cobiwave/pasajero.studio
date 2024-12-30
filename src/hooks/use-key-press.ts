import { useEffect } from 'react';

export const KEYS = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  SPACE: ' ',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  SHIFT: 'Shift',
  CTRL: 'Control',
  ALT: 'Alt',
  BACKSPACE: 'Backspace',
  DELETE: 'Delete',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

type KeyType = (typeof KEYS)[keyof typeof KEYS];

interface UseKeyPressProps {
  onPress: () => void;
  keys: KeyType | KeyType[];
  shouldListen?: boolean;
}

const useKeyPress = ({ onPress, keys, shouldListen = true }: UseKeyPressProps) => {
  useEffect(() => {
    if (!shouldListen) return;

    const keysArray = Array.isArray(keys) ? keys : [keys];

    const handleKeyPress = (e: KeyboardEvent) => {
      if (keysArray.includes(e.key as KeyType)) {
        onPress();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onPress, keys, shouldListen]);
};

export default useKeyPress;
