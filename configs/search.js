const queries = [
  {
    query: `
    {
      pages: allSitePage {
        edges {
          node {
            id
            path
            pageContext
          }
        }
      }
    }`,
    transformer: ({ data }) => {
      return data.pages.edges.map(
        ({
          node: {
            id,
            path,
            pageContext: { locale, i18n },
          },
        }) => {
          const { title, description, updated } = i18n ? JSON.parse(i18n) : {};
          const result = {
            id,
            path,
            locale,
            title,
            description,
            updated,
          };
          return result;
        }
      );
    },
  },
  {
    query: `
    {
      items: allNewsItem {
        edges {
          node {
            id
            link
            date
            locale
            description
            newsType
            source
            title
            author
          }
        }
      }
    }`,
    transformer: ({ data }) => {
      return data.items.edges.map(({ node }) => node);
    },
  },
];

module.exports = {
  // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
  appId: process.env.ALGOLIA_APP_ID,
  // Use Admin API key without GATSBY_ prefix, so that the key isn't exposed in the application
  // Tip: use Search API key with GATSBY_ prefix to access the service from within components
  apiKey: process.env.ALGOLIA_API_KEY,
  indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
  queries,
  chunkSize: 10000, // default: 1000
  settings: {
    // optional, any index settings
    // Note: by supplying settings, you will overwrite all existing settings on the index
  },
  // enablePartialUpdates: true, // default: false
  // matchFields: ["slug", "modified"], // Array<String> default: ['modified']
  concurrentQueries: false, // default: true
  // skipIndexing: true, // default: false, useful for e.g. preview deploys or local development
  continueOnFailure: false, // default: false, don't fail the build if algolia indexing fails
};