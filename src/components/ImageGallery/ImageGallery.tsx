import Image from 'next/image';
import styles from './ImageGallery.module.scss';

export default function ImageGallery() {
  return (
    <div className={styles.root}>
      <ul>
        {[...Array(12)].map((_, i) => (
          <li key={i}>
            <Image
              src={`https://picsum.photos/500/500?random=${i}`}
              alt={`Random image ${i + 1}`}
              width={500}
              height={500}
              unoptimized
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
