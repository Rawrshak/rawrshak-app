import { useState, useEffect } from 'react';
import content from '../assets/images/content.png';
import threeDimAsset from '../assets/images/threeDimAsset.png';
import audioAsset from '../assets/images/audioAsset.png';
import imageAsset from '../assets/images/imageAsset.png';
import textAsset from '../assets/images/textAsset.png';

function Image({
  src,
  className,
  type
}: {
  src: string
  className: string,
  type: "3d" | "image" | "audio" | "text" | "content"
}) {
  const [useFallback, setUseFallback] = useState<boolean>(false);
  const [fallbackImg, setFallbackImg] = useState<string>("");

  useEffect(() => {
    if (useFallback) {
      if (type === "3d") {
        setFallbackImg(threeDimAsset);
      } else if (type === "image") {
        setFallbackImg(imageAsset);
      } else if (type === "audio") {
        setFallbackImg(audioAsset);
      } else if (type === "text") {
        setFallbackImg(textAsset);
      } else {
        setFallbackImg(content);
      }
    }
  }, [useFallback, type]);

  if (useFallback) {
    return (
      <img
        src={fallbackImg}
        alt=" "
        className={className}
        onError={() => setUseFallback(true)}
      />
    );
  } else {
    return (
      <img
        src={src}
        alt=" "
        className={className}
        onError={() => setUseFallback(true)}
      />
    );
  }
}

export default Image;