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
  subtype,
  setSubtype,
  subtypeEditable,
  setAudioFilesMetadata,
  setImageFilesMetadata,
  setStatic3dObjectFilesMetadata,
  setTextFileMetadata,
  isModal
}: {
  assetType: string,
  audioFilesMetadata: AudioFileMetadata[],
  imageFilesMetadata: ImageFileMetadata[],
  static3dObjectFilesMetadata: Static3dObjectFileMetadata[],
  textFileMetadata: TextFileMetadata,
  subtype: string,
  setSubtype: React.Dispatch<React.SetStateAction<string>>,
  subtypeEditable: boolean,
  setAudioFilesMetadata: React.Dispatch<React.SetStateAction<AudioFileMetadata[]>>,
  setImageFilesMetadata: React.Dispatch<React.SetStateAction<ImageFileMetadata[]>>,
  setStatic3dObjectFilesMetadata: React.Dispatch<React.SetStateAction<Static3dObjectFileMetadata[]>>,
  setTextFileMetadata: React.Dispatch<React.SetStateAction<TextFileMetadata>>,
  isModal: boolean
}) {
  if (assetType === "audio") {
    return (
      <AudioAsset
        audioFilesMetadata={audioFilesMetadata}
        setAudioFilesMetadata={setAudioFilesMetadata}
        subtype={subtype}
        setSubtype={setSubtype}
        subtypeEditable={subtypeEditable}
      />);
  } else if (assetType === "image") {
    return (
      <ImageAsset
        imageFilesMetadata={imageFilesMetadata}
        setImageFilesMetadata={setImageFilesMetadata}
        subtype={subtype}
        setSubtype={setSubtype}
        subtypeEditable={subtypeEditable}
        isModal={isModal}
      />
    );
  } else if (assetType === "static3dobject") {
    return (
      <Static3dObjectAsset
        static3dObjectFilesMetadata={static3dObjectFilesMetadata}
        setStatic3dObjectFilesMetadata={setStatic3dObjectFilesMetadata}
        setSubtype={setSubtype}
        subtype={subtype}
        subtypeEditable={subtypeEditable}
      />);
  } else {
    return (
      <TextAsset
        textFileMetadata={textFileMetadata}
        setTextFileMetadata={setTextFileMetadata}
        setSubtype={setSubtype}
        subtype={subtype}
        subtypeEditable={subtypeEditable}
      />
    );
  }
}

export default AssetTypes;