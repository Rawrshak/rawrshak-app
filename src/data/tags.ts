import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useSubgraphEndpoints } from '../web3/chains';
import { useWeb3 } from '../web3';

const useTags = () => {
  const [tags, setTags] = useState<string[] | undefined>();
  const { chainId } = useWeb3();
  const { contentsSubgraphEndpoint } = useSubgraphEndpoints(chainId);

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