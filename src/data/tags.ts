import { useEffect, useState } from 'react';

const useTags = () => {
  const [tags, setTags] = useState<string[] | undefined>();

  useEffect(() => {
    if (process.env.REACT_APP_CURATED_TAGS === undefined) {
      console.error("Curated tags have not been set!");
      return;
    }

    setTags(JSON.parse(process.env.REACT_APP_CURATED_TAGS));
  }, []);

  return tags;
}

export { useTags }