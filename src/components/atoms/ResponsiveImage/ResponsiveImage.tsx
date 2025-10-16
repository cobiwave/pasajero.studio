import { type ImagePropTypes, SRCImage } from 'react-datocms';

import { ResponsiveImageFragment } from '@/graphql/atoms/ResponsiveImage.fragment';
import { type FragmentOf, readFragment } from '@/lib/datocms/graphql';

type Props = Omit<ImagePropTypes, 'data'> & {
  data: FragmentOf<typeof ResponsiveImageFragment>;
};

/**
 * This component is a wrapper for the `<SRCImage />` component provided by
 * react-datocms, optimized for use with graphql.tada. We define the necessary
 * GraphQL fragment for this component to function only once, then reuse it
 * wherever needed.
 */
export default function ResponsiveImage({ data, ...other }: Props) {
  const unmaskedData = readFragment(ResponsiveImageFragment, data);

  return <SRCImage data={unmaskedData} {...other} />;
}
