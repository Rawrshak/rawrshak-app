import { useEffect, useState } from 'react';
import { useWeb3 } from '../web3';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ContentApproval } from './data';
import {
  Content,
  Content__factory,
} from '../assets/typechain';

const useContents = () => {
  const { signerOrProvider } = useWeb3();
  const [contents, setContents] = useState<Content[] | undefined>();
  const [contentsApprovals, setContentsApprovals] = useState<ContentApproval[] | undefined>();

  useEffect(() => {
    if (contentsApprovals !== undefined || signerOrProvider === undefined) return;

    const contentsQuery = `
      query {
        contents {
          id
        }
      }
    `;

    const client = new ApolloClient({
      uri: process.env.REACT_APP_LOCAL_CONTENTS_SUBGRAPH_ENDPOINT,
      cache: new InMemoryCache(),
    });

    client.query({
      query: gql(contentsQuery)
    })
      .then((data) => {
        const newContents: Content[] = data.data.contents.map((content: any) => {
          return Content__factory.connect(content.id, signerOrProvider)
        });
        setContents(newContents);
      })
      .catch(err => {
        console.error("Error fetching GraphQL data: ", err);
        setContents(undefined);
      });
  });

  // useEffect(() => {
  //   if(contents === undefined) return;

  //   interface FilterListener {
  //     contract: Content,
  //     filter: TypedEventFilter<[string, string, boolean], { _owner: string, _operator: string, _approved: boolean }>,
  //     callback: ((_owner: string, _operator: string, _approved: boolean, ___: any) => void),
  //   }

  //   const filterListeners: FilterListener[] = [];

  //   contents?.forEach(content => {
  //     const allowanceFilter = content.filters.ApprovalForAll(web3.account, )
  //   });

  // }, [contents]);

  return contents;
}

export { useContents }