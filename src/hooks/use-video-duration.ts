import { useEffect, useState } from 'react';

import { formatDuration } from '@/utils/basic-functions';

const useVideoDuration = (videoRef: React.RefObject<HTMLVideoElement> | null) => {
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const videoElement = videoRef?.current;

    const handleLoadedMetadata = () => {
      if (videoElement) {
        setDuration(videoElement.duration);
      }
    };

    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [videoRef]);

  return formatDuration(duration);
};

export default useVideoDuration;
