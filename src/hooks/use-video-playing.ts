import { useEffect, useState } from 'react';

const useVideoPlaying = (video: HTMLVideoElement | null, shouldListen: boolean = true) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!shouldListen || !video) return;

    const handlePlay = () => {
      setPlaying(true);
    };

    const handlePause = () => {
      setPlaying(false);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [video, shouldListen]);

  return playing;
};

export default useVideoPlaying;
