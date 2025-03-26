import { graphql } from '@/lib/datocms/graphql';
import { TagFragment } from '@/lib/datocms/commonFragments';

export const ARTICLES_PATHS = graphql(`
  query ArticlePaths {
    allArticles {
      slug
    }
  }
`);

export const ARTICLE_BY_SLUG = graphql(
  `
    query ArticleBySlug($slug: String) {
      article(filter: { slug: { eq: $slug } }) {
        _publishedAt
        _seoMetaTags {
          ...TagFragment
        }
        id
        title
        slug
        categories {
          slug
          name
          description
        }
        featuredImage {
          url
        }
      }
    }
  `,
  [TagFragment]
);
