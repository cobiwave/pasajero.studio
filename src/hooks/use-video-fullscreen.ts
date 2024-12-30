import { useEffect, useState } from 'react';

const useVideoFullscreen = (onFullscreenChange?: () => void, shouldListen: boolean = true) => {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!shouldListen) return;

    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
      onFullscreenChange?.();
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [fullscreen, shouldListen, onFullscreenChange]);

  return fullscreen;
};

export default useVideoFullscreen;
