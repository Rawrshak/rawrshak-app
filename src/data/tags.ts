import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const useTags = (contentsSubgraphEndpoint: string | undefined) => {
  const [tags, setTags] = useState<string[] | undefined>();

  useEffect(() => {
    if (contentsSubgraphEndpoint === undefined) return;

    const tagsQuery = `
      query {
        tags {
          id
        }
      }
    `;

    const client = new ApolloClient({
      uri: contentsSubgraphEndpoint,
      cache: new InMemoryCache(),
    });

    client.query({
      query: gql(tagsQuery)
    })
      .then((data) => {
        const newTags: string[] = data.data.tags.map((tag: any) => tag.id);
        setTags(newTags);
      })
      .catch(err => {
        console.error("Error fetching GraphQL data: ", err);
        setTags(undefined);
      });
  }, [contentsSubgraphEndpoint]);

  return tags;
}

export { useTags }