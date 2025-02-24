'use client';

import { useRef } from 'react';
import { useGsapFadeIn } from '@/hooks/useGsapFadeIn';
import styles from './ImageGallery.module.scss';

type Props = {
  children: React.ReactNode;
};

export default function ImageGalleryClient({ children }: Props) {
  const galleryRef = useRef(null);

  useGsapFadeIn(galleryRef, 'li');

  return (
    <div className={styles.root} ref={galleryRef}>
      {children}
    </div>
  );
}
