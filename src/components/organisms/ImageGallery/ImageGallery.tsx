import ResponsiveImage, {
  ResponsiveImageFragment,
} from '@/components/atoms/ResponsiveImage/ResponsiveImage';
import { type FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import styles from './ImageGallery.module.scss';

export const ImageGalleryBlockFragment = graphql(
  /* GraphQL */ `
    fragment ImageGalleryBlockFragment on ImageGalleryBlockRecord {
      assets {
        id
        title
        responsiveImage {
          ...ResponsiveImageFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment],
);

type Props = {
  data: FragmentOf<typeof ImageGalleryBlockFragment>;
};

export default function ImageGallery({ data }: Props) {
  const unmaskedData = readFragment(ImageGalleryBlockFragment, data);

  return (
    <div className={styles.root}>
      <ul>
        {unmaskedData.assets.map((asset) => (
          <li key={asset.id}>
            <figure>
              {/* Display responsive image for each asset */}
              <ResponsiveImage
                imgStyle={{
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  objectFit: 'cover',
                  aspectRatio: '1 / 1',
                }}
                data={asset.responsiveImage}
              />
              {/* Display title for each asset */}
              <figcaption>{asset.title}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
