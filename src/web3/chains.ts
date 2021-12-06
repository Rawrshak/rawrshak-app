import { useState, useEffect } from 'react';

const supportedChains = () => {
  const dev = process.env.NODE_ENV !== 'production' ? [parseInt(process.env.REACT_APP_LOCAL_CHAIN_ID || "0", 10)] : [];
  const supported = [...dev, ...(process.env.REACT_APP_SUPPORTED_CHAIN_IDS || "").split(",").map(i => parseInt(i, 10))];
  return supported;
};

const useAddresses = (chainId: number | undefined) => {
  const [addresses, setAddresses] = useState<{ addressResolver?: string, supportedToken?: string }>({});

  useEffect(() => {
    if (!chainId) return;

    if (
      process.env.REACT_APP_LOCAL_CHAIN_ID &&
      chainId === parseInt(process.env.REACT_APP_LOCAL_CHAIN_ID, 10)
    ) {
      if (!process.env.REACT_APP_LOCAL_ADDRESS_RESOLVER_ADDRESS || !process.env.REACT_APP_LOCAL_SUPPORTED_TOKEN_ADDRESS) {
        console.error("No local addresses have been set!");
        setAddresses({});
        return;
      }

      setAddresses({
        addressResolver: process.env.REACT_APP_LOCAL_ADDRESS_RESOLVER_ADDRESS,
        supportedToken: process.env.REACT_APP_LOCAL_SUPPORTED_TOKEN_ADDRESS
      });
    } else {
      if (!process.env.REACT_APP_ADDRESS_RESOLVER_ADDRESSES || !process.env.REACT_APP_SUPPORTED_TOKEN_ADDRESSES) {
        console.error("No addresses have been set!");
        setAddresses({});
        return;
      }

      const addressResolverAddresses = JSON.parse(process.env.REACT_APP_ADDRESS_RESOLVER_ADDRESSES);
      const addressResolverAddress: string = addressResolverAddresses[chainId];

      const supportedTokenAddresses = JSON.parse(process.env.REACT_APP_SUPPORTED_TOKEN_ADDRESSES);
      const supportedTokenAddress: string = supportedTokenAddresses[chainId];

      if (!addressResolverAddress || !supportedTokenAddress) {
        console.error(`Addresses for network ${chainId} is not set!`);
        setAddresses({});
        return;
      }

      setAddresses({
        addressResolver: addressResolverAddress,
        supportedToken: supportedTokenAddress
      });
    }
  }, [chainId]);

  return addresses;
};

const useSubgraphEndpoints = (chainId: number | undefined) => {
  const [subgraphEndpoints, setSubgraphEndpoints] = useState<{ exchangeSubgraphEndpoint?: string, contentsSubgraphEndpoint?: string }>({});

  useEffect(() => {
    if (!chainId) return;

    if (
      process.env.REACT_APP_LOCAL_CHAIN_ID &&
      chainId === parseInt(process.env.REACT_APP_LOCAL_CHAIN_ID, 10)
    ) {
      if (!process.env.REACT_APP_LOCAL_EXCHANGE_SUBGRAPH_ENDPOINT || !process.env.REACT_APP_LOCAL_CONTENTS_SUBGRAPH_ENDPOINT) {
        console.error("No local subgraph endpoints have been set!");
        setSubgraphEndpoints({});
        return;
      }

      setSubgraphEndpoints({
        exchangeSubgraphEndpoint: process.env.REACT_APP_LOCAL_EXCHANGE_SUBGRAPH_ENDPOINT,
        contentsSubgraphEndpoint: process.env.REACT_APP_LOCAL_CONTENTS_SUBGRAPH_ENDPOINT
      });
    } else {
      if (!process.env.REACT_APP_EXCHANGE_SUBGRAPH_ENDPOINTS || !process.env.REACT_APP_CONTENTS_SUBGRAPH_ENDPOINTS) {
        console.error("No subgraph endpoints have been set!");
        setSubgraphEndpoints({});
        return;
      }

      const exchangeSubgraphEndpoints = JSON.parse(process.env.REACT_APP_EXCHANGE_SUBGRAPH_ENDPOINTS);
      const exchangeSubgraphEndpoint: string = exchangeSubgraphEndpoints[chainId];

      const contentsSubgraphEndpoints = JSON.parse(process.env.REACT_APP_CONTENTS_SUBGRAPH_ENDPOINTS);
      const contentsSubgraphEndpoint: string = contentsSubgraphEndpoints[chainId];

      if (!exchangeSubgraphEndpoint || !contentsSubgraphEndpoint) {
        console.error(`Subgraph endpoints for network ${chainId} is not set!`);
        setSubgraphEndpoints({});
        return;
      }

      setSubgraphEndpoints({
        exchangeSubgraphEndpoint: exchangeSubgraphEndpoint,
        contentsSubgraphEndpoint: contentsSubgraphEndpoint
      });
    }
  }, [chainId]);

  return subgraphEndpoints;
};

export {
  supportedChains,
  useAddresses,
  useSubgraphEndpoints
};
