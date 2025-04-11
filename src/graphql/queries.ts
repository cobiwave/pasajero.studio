import { TagFragment } from '@/lib/datocms/commonFragments';
import { graphql } from '@/lib/datocms/graphql';

export const QueryAllArticles = graphql(/* GraphQL */ `
  query ArticlePaths {
    allArticles {
      id
      slug
    }
  }
`);

export const QueryArticle = graphql(
  /* GraphQL */ `
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
