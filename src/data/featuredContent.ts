import { useEffect, useState } from 'react';
import { ContentDataWithMetadata } from './data';

const useFeaturedContent = (allContent: ContentDataWithMetadata[] | undefined) => {
  const [featuredContent, setFeaturedContent] = useState<ContentDataWithMetadata[] | undefined>();

  useEffect(() => {
    if (allContent === undefined) return;

    if (!process.env.REACT_APP_FEATURED_CONTENT_ADDRESSES) {
      console.error("Featured content addresses have not been set!");
      return;
    }

    const featuredContentAddresses = JSON.parse(process.env.REACT_APP_FEATURED_CONTENT_ADDRESSES);

    setFeaturedContent(allContent.filter(content => featuredContentAddresses.includes(content.id)));
  }, [allContent]);

  return featuredContent;
}

export { useFeaturedContent }