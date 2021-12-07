import { useEffect, useState } from 'react';

const useExchangeSubgraphEndpoint = () => {
  const [exchangeSubgraphEndpoint, setExchangeSubgraphEndpoint] = useState<string | undefined>();

  useEffect(() => {
    if (!process.env.REACT_APP_EXCHANGE_SUBGRAPH_ENDPOINT) {
      console.error("Exchange subgraph endpoint has not been set!");
      return;
    }

    setExchangeSubgraphEndpoint(process.env.REACT_APP_EXCHANGE_SUBGRAPH_ENDPOINT);
  }, []);

  return exchangeSubgraphEndpoint;
}

const useContentsSubgraphEndpoint = () => {
  const [contentsSubgraphEndpoint, setContentsSubgraphEndpoint] = useState<string | undefined>();

  useEffect(() => {
    if (!process.env.REACT_APP_CONTENTS_SUBGRAPH_ENDPOINT) {
      console.error("Contents subgraph endpoint has not been set!");
      return;
    }

    setContentsSubgraphEndpoint(process.env.REACT_APP_CONTENTS_SUBGRAPH_ENDPOINT);
  }, []);

  return contentsSubgraphEndpoint;
}

export {
  useExchangeSubgraphEndpoint,
  useContentsSubgraphEndpoint
}
