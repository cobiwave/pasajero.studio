'use client';

import { useEffect, useState } from 'react';

import styles from './DebugGrid.module.scss';

export default function DebugGrid() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'g' && e.ctrlKey) {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {Array.from({ length: 12 })
          .fill(0)
          .map((_, index) => (
            <div className={styles.column} key={index}>
              <span className={styles.colNum}>{index + 1}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
