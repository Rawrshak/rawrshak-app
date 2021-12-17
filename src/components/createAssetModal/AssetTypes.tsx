import React from 'react';
import {
  AudioFileMetadata,
  ImageFileMetadata,
  Static3dObjectFileMetadata,
  TextFileMetadata,
} from "../../data/data";
import AudioAsset from './AudioAsset';
import ImageAsset from './ImageAsset';
import Static3dObjectAsset from './Static3dObjectAsset';
import TextAsset from './TextAsset';

function AssetTypes({
  assetType,
  audioFilesMetadata,
  imageFilesMetadata,
  static3dObjectFilesMetadata,
  textFileMetadata,
  setSubType,
  setAudioFilesMetadata,
  setImageFilesMetadata,
  setStatic3dObjectFilesMetadata,
  setTextFileMetadata
}: {
  assetType: string,
  audioFilesMetadata: AudioFileMetadata[],
  imageFilesMetadata: ImageFileMetadata[],
  static3dObjectFilesMetadata: Static3dObjectFileMetadata[],
  textFileMetadata: TextFileMetadata,
  setSubType: React.Dispatch<React.SetStateAction<string>>,
  setAudioFilesMetadata: React.Dispatch<React.SetStateAction<AudioFileMetadata[]>>,
  setImageFilesMetadata: React.Dispatch<React.SetStateAction<ImageFileMetadata[]>>,
  setStatic3dObjectFilesMetadata: React.Dispatch<React.SetStateAction<Static3dObjectFileMetadata[]>>,
  setTextFileMetadata: React.Dispatch<React.SetStateAction<TextFileMetadata>>
}) {
  if (assetType === "audio") {
    return (
      <AudioAsset
        audioFilesMetadata={audioFilesMetadata}
        setAudioFilesMetadata={setAudioFilesMetadata}
        setSubType={setSubType}
      />);
  } else if (assetType === "image") {
    return (
      <ImageAsset
        imageFilesMetadata={imageFilesMetadata}
        setImageFilesMetadata={setImageFilesMetadata}
        setSubType={setSubType}
      />
    );
  } else if (assetType === "static3dobject") {
    return (
      <Static3dObjectAsset
        static3dObjectFilesMetadata={static3dObjectFilesMetadata}
        setStatic3dObjectFilesMetadata={setStatic3dObjectFilesMetadata}
        setSubType={setSubType}
      />);
  } else {
    return (
      <TextAsset
        textFileMetadata={textFileMetadata}
        setTextFileMetadata={setTextFileMetadata}
        setSubType={setSubType}
      />
    );
  }
}

export default AssetTypes;