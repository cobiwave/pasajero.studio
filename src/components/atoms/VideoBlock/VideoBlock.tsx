import VideoPlayer from '@/components/atoms/VideoPlayer/VideoPlayer';

import { type FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';

import { VideoPlayerFragment } from '../VideoPlayer/VideoPlayer';

export const VideoBlockFragment = graphql(
  /* GraphQL */ `
    fragment VideoBlockFragment on VideoBlockRecord {
      asset {
        title
        ...VideoPlayerFragment
      }
    }
  `,
  [VideoPlayerFragment]
);

type Props = {
  data: FragmentOf<typeof VideoBlockFragment>;
};

export default function VideoBlock({ data }: Props) {
  // Read unmasked data from fragment
  const unmaskedData = readFragment(VideoBlockFragment, data);

  return (
    <figure>
      {/* Render the video player component */}
      <VideoPlayer data={unmaskedData.asset} />
      {/* Display the title of the video asset below the video player */}
      <figcaption>{unmaskedData.asset.title}</figcaption>
    </figure>
  );
}
