import { type ImagePropTypes, SRCImage } from 'react-datocms';

import { type FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';

export const ResponsiveImageFragment = graphql(/* GraphQL */ `
  fragment ResponsiveImageFragment on ResponsiveImage {
    # always required
    src
    srcSet
    width
    height

    # not required, but strongly suggested!
    alt
    title

    # LQIP (base64-encoded)
    base64

    # you can omit 'sizes' if you explicitly pass the 'sizes' prop to the image component
    # sizes
  }
`);

export type ResponsiveImageProps = Omit<ImagePropTypes, 'data'> & {
  data: FragmentOf<typeof ResponsiveImageFragment>;
};

/**
 * This component is a wrapper for the `<SRCImage />` component provided by
 * react-datocms, optimized for use with graphql.tada. We define the necessary
 * GraphQL fragment for this component to function only once, then reuse it
 * wherever needed.
 */
export default function ResponsiveImage({ data, ...other }: ResponsiveImageProps) {
  const unmaskedData = readFragment(ResponsiveImageFragment, data);

  return <SRCImage data={unmaskedData} {...other} />;
}
