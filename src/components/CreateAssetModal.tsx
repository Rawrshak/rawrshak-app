import React, { useEffect, useState } from 'react';
import { BigNumber } from "ethers";
import {
  PublicAssetMetadata,
  AudioFileMetadata,
  ImageFileMetadata,
  Static3dObjectFileMetadata,
  TextFileMetadata,
  AudioAssetMetadata,
  ImageAssetMetadata,
  Static3dObjectAssetMetadata,
  TextAssetMetadata
} from "../data/data";
import axios from 'axios';
import Modal from './Modal';
import Button from './Button';
import Loader from './Loader';
import { InputNumber } from './Input';
import { ContentManager } from '../assets/typechain';
import { useTransaction } from "../web3/transactions";

function AudioFile({
  audioFileMetadata,
  updateAudioFileMetadata,
  index
}: {
  audioFileMetadata: AudioFileMetadata,
  updateAudioFileMetadata: (index: number, audioFileMetadata: AudioFileMetadata) => void,
  index: number
}) {

  const updateName = (name: string) => {
    const newAudioFileMetadata = Object.assign({}, audioFileMetadata);
    newAudioFileMetadata.name = name;
    updateAudioFileMetadata(index, newAudioFileMetadata);
  }

  const updateEngine = (engine: string) => {
    const newAudioFileMetadata = Object.assign({}, audioFileMetadata);
    newAudioFileMetadata.engine = engine;
    updateAudioFileMetadata(index, newAudioFileMetadata);
  }

  const updateCompression = (compression: string) => {
    const newAudioFileMetadata = Object.assign({}, audioFileMetadata);
    newAudioFileMetadata.compression = compression;
    updateAudioFileMetadata(index, newAudioFileMetadata);
  }

  const updateUri = (uri: string) => {
    const newAudioFileMetadata = Object.assign({}, audioFileMetadata);
    newAudioFileMetadata.uri = uri;
    updateAudioFileMetadata(index, newAudioFileMetadata);
  }

  const updateContentType = (contentType: string) => {
    const newAudioFileMetadata = Object.assign({}, audioFileMetadata);
    newAudioFileMetadata.contentType = contentType;
    updateAudioFileMetadata(index, newAudioFileMetadata);
  }

  const updateDuration = (duration: number) => {
    const newAudioFileMetadata = Object.assign({}, audioFileMetadata);
    newAudioFileMetadata.duration = duration;
    updateAudioFileMetadata(index, newAudioFileMetadata);
  }

  const updateChannelCount = (channelCount: number) => {
    const newAudioFileMetadata = Object.assign({}, audioFileMetadata);
    newAudioFileMetadata.channelCount = channelCount;
    updateAudioFileMetadata(index, newAudioFileMetadata);
  }

  const updateSampleRate = (sampleRate: number) => {
    const newAudioFileMetadata = Object.assign({}, audioFileMetadata);
    newAudioFileMetadata.sampleRate = sampleRate;
    updateAudioFileMetadata(index, newAudioFileMetadata);
  }

  return (
    <div className="bg-neutral900 pt-1 pb-3 mb-4 px-5 rounded-lg">
      <div className="flex justify-center text-lg">
        Audio File #{index + 1}
      </div>
      <div className="grid grid-cols-2">
        <div className="my-3 mr-2 text-right">
          Name
        </div>
        <div className="my-2">
          <input value={audioFileMetadata.name} onChange={(e) => updateName(e.target.value)} className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
        <div className="my-3 mr-2 text-right">
          Engine
        </div>
        <div className="my-2">
          <select
            onChange={(e) => updateEngine(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="unity">
              Unity
            </option>
            <option value="none">
              None
            </option>
          </select>
        </div>
        <div className="my-3 mr-2 text-right">
          Compression
        </div>
        <div className="my-2">
          <select
            onChange={(e) => updateCompression(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="compressed">
              Compressed
            </option>
            <option value="raw">
              Raw
            </option>
          </select>
        </div>
        <div className="my-3 mr-2 text-right">
          Audio File URI
        </div>
        <div className="my-2">
          <input value={audioFileMetadata.uri} onChange={(e) => { updateUri(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
        <div className="my-3 mr-2 text-right">
          Content Type
        </div>
        <div className="my-2">
          <select
            onChange={(e) => updateContentType(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="wav">
              WAV
            </option>
            <option value="mp3">
              MP3
            </option>
          </select>
        </div>
        <div className="my-3 mr-2 text-right">
          Duration
        </div>
        <div className="my-2">
          <InputNumber
            value={(audioFileMetadata.duration).toString()}
            onChange={(e: any) => updateDuration(e)}
            className="bg-neutral700 focus:outline-none rounded py-1 px-2"
            disabled={false} />
        </div>
        <div className="my-3 mr-2 text-right">
          Channel Count
        </div>
        <div className="my-2">
          <InputNumber
            value={(audioFileMetadata.channelCount).toString()}
            onChange={(e: any) => updateChannelCount(e)}
            className="bg-neutral700 focus:outline-none rounded py-1 px-2"
            disabled={false}
          />
        </div>
        <div className="my-3 mr-2 text-right">
          Sample Rate
        </div>
        <div className="my-2">
          <InputNumber
            value={(audioFileMetadata.sampleRate).toString()}
            onChange={(e: any) => updateSampleRate(e)}
            className="bg-neutral700 focus:outline-none rounded py-1 px-2"
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}

function AudioAsset({
  audioFilesMetadata,
  setAudioFilesMetadata,
  setSubType
}: {
  audioFilesMetadata: AudioFileMetadata[],
  setAudioFilesMetadata: React.Dispatch<React.SetStateAction<AudioFileMetadata[]>>,
  setSubType: React.Dispatch<React.SetStateAction<string>>,
}) {
  const updateAudioFileMetadata = (index: number, audioFileMetadata: AudioFileMetadata) => {
    const newAudioFilesMetadata = audioFilesMetadata.map(audioFile => { return { ...audioFile } });
    newAudioFilesMetadata[index] = audioFileMetadata;
    setAudioFilesMetadata(newAudioFilesMetadata);
  }

  const addAudioFile = () => {
    const newAudioFilesMetadata = audioFilesMetadata.map(audioFile => { return { ...audioFile } });
    const newAudioFile: AudioFileMetadata = {
      name: "",
      engine: "",
      compression: "",
      uri: "",
      contentType: "",
      duration: 0,
      channelCount: 0,
      sampleRate: 0,
    }
    newAudioFilesMetadata[newAudioFilesMetadata.length] = newAudioFile;
    setAudioFilesMetadata(newAudioFilesMetadata);
  }

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="my-3 mr-2 text-right">
          Audio Asset SubType
        </div>
        <div className="my-2">
          <select
            onChange={(e) => setSubType(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="sound-effect">
              Sound Effect
            </option>
            <option value="background-music">
              Background Music
            </option>
          </select>
        </div>
      </div>
      {audioFilesMetadata.map((audioFile, index) => (
        <React.Fragment key={index}>
          <AudioFile
            audioFileMetadata={audioFile}
            updateAudioFileMetadata={updateAudioFileMetadata}
            index={index}
          />
        </React.Fragment>
      ))}
      <div className="flex justify-center">
        <Button
          label="Add Audio File"
          onClick={() => addAudioFile()}
          enabled={true}
          show={true}
          enabledClassName="bg-neutral900 text-offWhite text-xsm mr-4 px-6 py-2 rounded-md"
          disabledClassName=""
        />
      </div>
    </div>
  );
}

function ImageFile({
  imageFileMetadata,
  updateImageFileMetadata,
  index
}: {
  imageFileMetadata: ImageFileMetadata,
  updateImageFileMetadata: (index: number, imageFileMetadata: ImageFileMetadata) => void,
  index: number
}) {
  const updateUri = (uri: string) => {
    const newImageFileMetadata = Object.assign({}, imageFileMetadata);
    newImageFileMetadata.uri = uri;
    updateImageFileMetadata(index, newImageFileMetadata);
  }

  const updateHeight = (height: number) => {
    const newImageFileMetadata = Object.assign({}, imageFileMetadata);
    newImageFileMetadata.height = height;
    updateImageFileMetadata(index, newImageFileMetadata);
  }

  const updateWidth = (width: number) => {
    const newImageFileMetadata = Object.assign({}, imageFileMetadata);
    newImageFileMetadata.width = width;
    updateImageFileMetadata(index, newImageFileMetadata);
  }

  const updateContentType = (contentType: string) => {
    const newImageFileMetadata = Object.assign({}, imageFileMetadata);
    newImageFileMetadata.contentType = contentType;
    updateImageFileMetadata(index, newImageFileMetadata);
  }

  return (
    <div className="bg-neutral900 pt-1 pb-3 mb-4 px-5 rounded-lg">
      <div className="flex justify-center text-lg">
        Image File #{index + 1}
      </div>
      <div className="grid grid-cols-2">
        <div className="my-3 mr-2 text-right">
          Image URI
        </div>
        <div className="my-2">
          <input value={imageFileMetadata.uri} onChange={(e) => { updateUri(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
        <div className="my-3 mr-2 text-right">
          Height (pixels)
        </div>
        <div className="my-2">
          <InputNumber
            value={(imageFileMetadata.height).toString()}
            onChange={(e: any) => updateHeight(e)}
            className="bg-neutral700 focus:outline-none rounded py-1 px-2"
            disabled={false} />
        </div>
        <div className="my-3 mr-2 text-right">
          Width (pixels)
        </div>
        <div className="my-2">
          <InputNumber
            value={(imageFileMetadata.width).toString()}
            onChange={(e: any) => updateWidth(e)}
            className="bg-neutral700 focus:outline-none rounded py-1 px-2"
            disabled={false}
          />
        </div>
        <div className="my-3 mr-2 text-right">
          Content Type
        </div>
        <div className="my-2">
          <select
            onChange={(e) => updateContentType(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="png">
              png
            </option>
            <option value="jpg">
              jpg
            </option>
            <option value="svg">
              svg
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ImageAsset({
  imageFilesMetadata,
  setImageFilesMetadata,
  setSubType
}: {
  imageFilesMetadata: ImageFileMetadata[],
  setImageFilesMetadata: React.Dispatch<React.SetStateAction<ImageFileMetadata[]>>,
  setSubType: React.Dispatch<React.SetStateAction<string>>
}) {

  const updateImageFileMetadata = (index: number, imageFileMetadata: ImageFileMetadata) => {
    const newImageFilesMetadata = imageFilesMetadata.map(imageFile => { return { ...imageFile } });
    newImageFilesMetadata[index] = imageFileMetadata;
    setImageFilesMetadata(newImageFilesMetadata);
  }

  const addImageFile = () => {
    const newImageFilesMetadata = imageFilesMetadata.map(imageFile => { return { ...imageFile } });

    const newImageFile: ImageFileMetadata = {
      uri: "",
      height: 0,
      width: 0,
      contentType: "",
    }

    newImageFilesMetadata[newImageFilesMetadata.length] = newImageFile;

    setImageFilesMetadata(newImageFilesMetadata);
  }

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="my-3 mr-2 text-right">
          Image SubType
        </div>
        <div className="my-2">
          <select onChange={(e) => setSubType(e.target.value)} name="assetType" className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="Square">
              Square
            </option>
            <option value="HorizontalBanner">
              HorizontalBanner
            </option>
          </select>
        </div>
      </div>
      {imageFilesMetadata.map((imageFile, index) => (
        <React.Fragment key={index}>
          <ImageFile
            imageFileMetadata={imageFile}
            updateImageFileMetadata={updateImageFileMetadata}
            index={index}
          />
        </React.Fragment>
      ))}
      <div className="flex justify-center">
        <Button
          label="Add Image File"
          onClick={() => addImageFile()}
          enabled={true}
          show={true}
          enabledClassName="bg-neutral900 text-offWhite text-xsm mr-4 px-6 py-2 rounded-md"
          disabledClassName=""
        />
      </div>
    </div>
  );
}

function Static3dObject({
  static3dObjectFileMetadata,
  updateStatic3dObjectFileMetadata,
  index
}: {
  static3dObjectFileMetadata: Static3dObjectFileMetadata,
  updateStatic3dObjectFileMetadata: (index: number, static3dObjectFileMetadata: Static3dObjectFileMetadata) => void,
  index: number
}) {

  const updateName = (name: string) => {
    const newStatic3dObjectFileMetadata = Object.assign({}, static3dObjectFileMetadata);
    newStatic3dObjectFileMetadata.name = name;
    updateStatic3dObjectFileMetadata(index, newStatic3dObjectFileMetadata);
  }

  const updateEngine = (engine: string) => {
    const newStatic3dObjectFileMetadata = Object.assign({}, static3dObjectFileMetadata);
    newStatic3dObjectFileMetadata.engine = engine;
    updateStatic3dObjectFileMetadata(index, newStatic3dObjectFileMetadata);
  }

  const updatePlatform = (platform: string) => {
    const newStatic3dObjectFileMetadata = Object.assign({}, static3dObjectFileMetadata);
    newStatic3dObjectFileMetadata.platform = platform;
    updateStatic3dObjectFileMetadata(index, newStatic3dObjectFileMetadata);
  }

  const updateRenderPipeline = (renderPipeline: string) => {
    const newStatic3dObjectFileMetadata = Object.assign({}, static3dObjectFileMetadata);
    newStatic3dObjectFileMetadata.renderPipeline = renderPipeline;
    updateStatic3dObjectFileMetadata(index, newStatic3dObjectFileMetadata);
  }

  const updateFidelity = (fidelity: string) => {
    const newStatic3dObjectFileMetadata = Object.assign({}, static3dObjectFileMetadata);
    newStatic3dObjectFileMetadata.fidelity = fidelity;
    updateStatic3dObjectFileMetadata(index, newStatic3dObjectFileMetadata);
  }

  const updateShape = (shape: string) => {
    const newStatic3dObjectFileMetadata = Object.assign({}, static3dObjectFileMetadata);
    newStatic3dObjectFileMetadata.shape = shape;
    updateStatic3dObjectFileMetadata(index, newStatic3dObjectFileMetadata);
  }

  const updateUri = (uri: string) => {
    const newStatic3dObjectFileMetadata = Object.assign({}, static3dObjectFileMetadata);
    newStatic3dObjectFileMetadata.uri = uri;
    updateStatic3dObjectFileMetadata(index, newStatic3dObjectFileMetadata);
  }

  return (
    <div className="bg-neutral900 pt-1 pb-3 mb-4 px-5 rounded-lg">
      <div className="flex justify-center text-lg mt-5">
        Static 3D Object File #{index + 1}
      </div>
      <div className="grid grid-cols-2">
        <div className="my-3 mr-2 text-right">
          Name
        </div>
        <div className="my-2">
          <input value={static3dObjectFileMetadata.name} onChange={(e) => updateName(e.target.value)} className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
        <div className="my-3 mr-2 text-right">
          Engine
        </div>
        <div className="my-2">
          <select
            onChange={(e) => updateEngine(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="unity">
              Unity
            </option>
            <option value="none">
              None
            </option>
          </select>
        </div>
        <div className="my-3 mr-2 text-right">
          Platform
        </div>
        <div className="my-2">
          <select
            onChange={(e) => updatePlatform(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="windows">
              Windows
            </option>
            <option value="ios">
              iOS
            </option>
            <option value="android">
              Android
            </option>
            <option value="webgl">
              WebGL
            </option>
          </select>
        </div>
        <div className="my-3 mr-2 text-right">
          Render Pipeline
        </div>
        <div className="my-2">
          <select
            onChange={(e) => updateRenderPipeline(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="brp">
              BRP
            </option>
          </select>
        </div>
        <div className="my-3 mr-2 text-right">
          Fidelity
        </div>
        <div className="my-2">
          <select
            onChange={(e) => updateFidelity(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="low">
              Low
            </option>
            <option value="medium">
              Medium
            </option>
            <option value="high">
              High
            </option>
          </select>
        </div>
        <div className="my-3 mr-2 text-right">
          Shape
        </div>
        <div className="my-2">
          <select
            onChange={(e) => updateShape(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="horizontal">
              Horizontal
            </option>
          </select>
        </div>
        <div className="my-3 mr-2 text-right">
          Static 3D Object File URI
        </div>
        <div className="my-2">
          <input value={static3dObjectFileMetadata.uri} onChange={(e) => { updateUri(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
      </div>
    </div>
  );
}

function Static3dObjectAsset({
  static3dObjectFilesMetadata,
  setStatic3dObjectFilesMetadata,
  setSubType
}: {
  static3dObjectFilesMetadata: Static3dObjectFileMetadata[],
  setStatic3dObjectFilesMetadata: React.Dispatch<React.SetStateAction<Static3dObjectFileMetadata[]>>,
  setSubType: React.Dispatch<React.SetStateAction<string>>
}) {

  const updateStatic3dObjectFileMetadata = (index: number, static3dObjectFileMetadata: Static3dObjectFileMetadata) => {
    const newStatic3dObjectFilesMetadata = static3dObjectFilesMetadata.map(static3dObjectFile => { return { ...static3dObjectFile } });
    newStatic3dObjectFilesMetadata[index] = static3dObjectFileMetadata;
    setStatic3dObjectFilesMetadata(newStatic3dObjectFilesMetadata);
  }

  const addStatic3dObjectFile = () => {
    const newStatic3dObjectFilesMetadata = static3dObjectFilesMetadata.map(static3dObjectFile => { return { ...static3dObjectFile } });
    const newStatic3dObjectFile: Static3dObjectFileMetadata = {
      name: "",
      engine: "",
      platform: "",
      renderPipeline: "",
      fidelity: "",
      shape: "",
      uri: "",
    }
    newStatic3dObjectFilesMetadata[newStatic3dObjectFilesMetadata.length] = newStatic3dObjectFile;
    setStatic3dObjectFilesMetadata(newStatic3dObjectFilesMetadata);
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="my-3 mr-2 text-right">
          Asset SubType
        </div>
        <div className="my-2">
          <select
            onChange={(e) => setSubType(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="trophy">
              Trophy
            </option>
          </select>
        </div>
      </div>
      {static3dObjectFilesMetadata.map((static3dObjectFile, index) => (
        <React.Fragment key={index}>
          <Static3dObject
            static3dObjectFileMetadata={static3dObjectFile}
            updateStatic3dObjectFileMetadata={updateStatic3dObjectFileMetadata}
            index={index}
          />
        </React.Fragment>
      ))}
      <div className="flex justify-center mt-2">
        <Button
          label="Add Static 3D Object File"
          onClick={() => addStatic3dObjectFile()}
          enabled={true}
          show={true}
          enabledClassName="bg-neutral900 text-offWhite text-xsm mr-4 px-6 py-2 rounded-md"
          disabledClassName=""
        />
      </div>
    </>
  );
}

function TextFile({
  textFileMetadata,
  updateTextFileMetadata,
  index
}: {
  textFileMetadata: TextFileMetadata,
  updateTextFileMetadata: (index: number, textFileMetadata: TextFileMetadata) => void,
  index: number
}) {

  const updateTitle = (title: string) => {
    const newTextFileMetadata = Object.assign({}, textFileMetadata);
    newTextFileMetadata.title = title;
    updateTextFileMetadata(index, newTextFileMetadata);
  }

  const updateDescription = (description: string) => {
    const newTextFileMetadata = Object.assign({}, textFileMetadata);
    newTextFileMetadata.description = description;
    updateTextFileMetadata(index, newTextFileMetadata);
  }

  return (
    <div className="bg-neutral900 pt-1 pb-3 mb-4 px-5 rounded-lg">
      <div className="flex justify-center text-lg mt-5">
        Text File #{index + 1}
      </div>
      <div className="grid grid-cols-2">
        <div className="my-3 mr-2 text-right">
          Title
        </div>
        <div className="my-2">
          <input value={textFileMetadata.title} onChange={(e) => updateTitle(e.target.value)} className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
        <div className="my-3 mr-2 text-right">
          Description
        </div>
        <div className="my-2">
          <input value={textFileMetadata.description} onChange={(e) => updateDescription(e.target.value)} className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
      </div>
    </div>
  );
}

function TextAsset({
  textFilesMetadata,
  setTextFilesMetadata,
  setSubType
}: {
  textFilesMetadata: TextFileMetadata[],
  setTextFilesMetadata: React.Dispatch<React.SetStateAction<TextFileMetadata[]>>,
  setSubType: React.Dispatch<React.SetStateAction<string>>,
}) {

  const updateTextFileMetadata = (index: number, textFileMetadata: TextFileMetadata) => {
    const newTextFilesMetadata = textFilesMetadata.map(textFile => { return { ...textFile } });
    newTextFilesMetadata[index] = textFileMetadata;
    setTextFilesMetadata(newTextFilesMetadata);
  }

  const addTextFile = () => {
    const newTextFilesMetadata = textFilesMetadata.map(textFile => { return { ...textFile } });

    const newTextFile: TextFileMetadata = {
      title: "",
      description: "",
    }

    newTextFilesMetadata[newTextFilesMetadata.length] = newTextFile;

    setTextFilesMetadata(newTextFilesMetadata);
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="my-3 mr-2 text-right">
          Text Asset SubType
        </div>
        <div className="my-2">
          <select
            onChange={(e) => setSubType(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="title">
              Title
            </option>
            <option value="lore">
              Lore
            </option>
          </select>
        </div>
      </div>

      {textFilesMetadata.map((textFile, index) => (
        <React.Fragment key={index}>
          <TextFile
            textFileMetadata={textFile}
            updateTextFileMetadata={updateTextFileMetadata}
            index={index}
          />
        </React.Fragment>
      ))}
      <div className="flex justify-center mb-5 mt-2">
        <Button
          label="Add Text File"
          onClick={() => addTextFile()}
          enabled={true}
          show={true}
          enabledClassName="bg-neutral900 text-offWhite text-xsm mr-4 px-6 py-2 rounded-md"
          disabledClassName=""
        />
      </div>
    </>
  );
}

function AssetTypes({
  assetType,
  subType,
  audioFilesMetadata,
  imageFilesMetadata,
  static3dObjectFilesMetadata,
  textFilesMetadata,
  setSubType,
  setAudioFilesMetadata,
  setImageFilesMetadata,
  setStatic3dObjectFilesMetadata,
  setTextFilesMetadata
}: {
  assetType: string,
  subType: string,
  audioFilesMetadata: AudioFileMetadata[],
  imageFilesMetadata: ImageFileMetadata[],
  static3dObjectFilesMetadata: Static3dObjectFileMetadata[],
  textFilesMetadata: TextFileMetadata[],
  setSubType: React.Dispatch<React.SetStateAction<string>>,
  setAudioFilesMetadata: React.Dispatch<React.SetStateAction<AudioFileMetadata[]>>,
  setImageFilesMetadata: React.Dispatch<React.SetStateAction<ImageFileMetadata[]>>,
  setStatic3dObjectFilesMetadata: React.Dispatch<React.SetStateAction<Static3dObjectFileMetadata[]>>,
  setTextFilesMetadata: React.Dispatch<React.SetStateAction<TextFileMetadata[]>>
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
        textFilesMetadata={textFilesMetadata}
        setTextFilesMetadata={setTextFilesMetadata}
        setSubType={setSubType}
      />
    );
  }
}

function CreateAssetModal({
  show,
  setShow,
  contentManagerContract
}: {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  contentManagerContract: ContentManager | undefined
}) {
  const [pinataApiKey, setPinataApiKey] = useState<string>("");
  const [pinataApiSecret, setPinataApiSecret] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("0");
  const [imageUri, setImageUri] = useState<string>("https://arweave.net/");
  const [tags, setTags] = useState<string[]>([""]);
  const [type, setType] = useState<string>("audio");
  const [subType, setSubType] = useState<string>("sound-effect");
  const [nsfw, setNsfw] = useState<boolean>(false);
  const [maxSupply, setMaxSupply] = useState<BigNumber>(BigNumber.from("0"));
  const [royaltyReceiver, setRoyaltyReceiver] = useState<string>("");

  const [transaction] = useTransaction();
  const [transactionPending, setTransactionPending] = useState<boolean>(false);

  const [publicAssetMetadata, setPublicAssetMetadata] = useState<PublicAssetMetadata>(
    {
      name: "",
      description: "",
      image: "",
      tags: [""],
      type: "",
      subType: "",
      nsfw: false,
    }
  );

  const [audioFilesMetadata, setAudioFilesMetadata] = useState<AudioFileMetadata[]>(
    [
      {
        name: "",
        engine: "",
        compression: "",
        uri: "https://arweave.net/",
        contentType: "",
        duration: 0,
        channelCount: 0,
        sampleRate: 0,
      }
    ]
  );
  const [imageFilesMetadata, setImageFilesMetadata] = useState<ImageFileMetadata[]>(
    [
      {
        uri: "https://arweave.net/",
        height: 0,
        width: 0,
        contentType: "",
      }
    ]
  );
  const [static3dObjectFilesMetadata, setStatic3dObjectFilesMetadata] = useState<Static3dObjectFileMetadata[]>(
    [
      {
        name: "",
        engine: "",
        platform: "",
        renderPipeline: "",
        fidelity: "",
        shape: "",
        uri: "https://arweave.net/",
      }
    ]
  );
  const [textFilesMetadata, setTextFilesMetadata] = useState<TextFileMetadata[]>(
    [
      {
        title: "",
        description: "",
      }
    ]
  );

  const [audioAssetMetadata, setAudioAssetMetadata] = useState<AudioAssetMetadata>();
  const [imageAssetMetadata, setImageAssetMetadata] = useState<ImageAssetMetadata>();
  const [static3dObjectAssetMetadata, setStatic3dObjectAssetMetadata] = useState<Static3dObjectAssetMetadata>();
  const [textAssetMetadata, setTextAssetMetadata] = useState<TextAssetMetadata>();

  const [royaltyRateString, setRoyaltyRateString] = useState<string>("0");
  const updateRoyaltyRateString = (royaltyRateString: string) => {
    if (Number(royaltyRateString) > 100) {
      royaltyRateString = "100";
    }
    setRoyaltyRateString(royaltyRateString);
  }

  const [royaltyRate, setRoyaltyRate] = useState<BigNumber>(BigNumber.from("0"));
  useEffect(() => {
    setRoyaltyRate(BigNumber.from(Number(royaltyRateString) * 10000));
  }, [royaltyRateString]);

  useEffect(() => {
    const newAudioAssetMetadata: AudioAssetMetadata = {
      name: publicAssetMetadata.name,
      description: publicAssetMetadata.description,
      image: publicAssetMetadata.image,
      tags: publicAssetMetadata.tags,
      type: publicAssetMetadata.type,
      subType: publicAssetMetadata.subType,
      nsfw: publicAssetMetadata.nsfw,
      assetProperties: audioFilesMetadata
    }

    setAudioAssetMetadata(newAudioAssetMetadata);
  }, [publicAssetMetadata, audioFilesMetadata]);

  useEffect(() => {
    const newImageAssetMetadata: ImageAssetMetadata = {
      name: publicAssetMetadata.name,
      description: publicAssetMetadata.description,
      image: publicAssetMetadata.image,
      tags: publicAssetMetadata.tags,
      type: publicAssetMetadata.type,
      subType: publicAssetMetadata.subType,
      nsfw: publicAssetMetadata.nsfw,
      assetProperties: imageFilesMetadata
    }

    setImageAssetMetadata(newImageAssetMetadata);
  }, [publicAssetMetadata, imageFilesMetadata]);

  useEffect(() => {
    const newStatic3dObjectAssetMetadata: Static3dObjectAssetMetadata = {
      name: publicAssetMetadata.name,
      description: publicAssetMetadata.description,
      image: publicAssetMetadata.image,
      tags: publicAssetMetadata.tags,
      type: publicAssetMetadata.type,
      subType: publicAssetMetadata.subType,
      nsfw: publicAssetMetadata.nsfw,
      assetProperties: static3dObjectFilesMetadata
    }

    setStatic3dObjectAssetMetadata(newStatic3dObjectAssetMetadata);
  }, [publicAssetMetadata, static3dObjectFilesMetadata]);

  useEffect(() => {
    const newTextAssetMetadata: TextAssetMetadata = {
      name: publicAssetMetadata.name,
      description: publicAssetMetadata.description,
      image: publicAssetMetadata.image,
      tags: publicAssetMetadata.tags,
      type: publicAssetMetadata.type,
      subType: publicAssetMetadata.subType,
      nsfw: publicAssetMetadata.nsfw,
      assetProperties: textFilesMetadata
    }

    setTextAssetMetadata(newTextAssetMetadata);
  }, [publicAssetMetadata, textFilesMetadata]);

  useEffect(() => {
    const newPublicAssetMetadata: PublicAssetMetadata = {
      name: name,
      description: description,
      image: imageUri,
      tags: tags,
      type: type,
      subType: subType,
      nsfw: nsfw,
    }

    setPublicAssetMetadata(newPublicAssetMetadata);
  }, [name, description, imageUri, tags, type, subType, nsfw]);



  const uploadAndDeploy = async () => {
    if (contentManagerContract === undefined) return;

    setTransactionPending(true);

    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    let jsonToPin;

    if (type === "audio") {
      jsonToPin = audioAssetMetadata;
    } else if (type === "image") {
      jsonToPin = imageAssetMetadata;
    } else if (type === "static3dobject") {
      jsonToPin = static3dObjectAssetMetadata;
    } else {
      jsonToPin = textAssetMetadata;
    }

    console.log("json to pin: ", jsonToPin);

    axios
      .post(url, jsonToPin, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataApiSecret
        }
      })
      .then(function (response) {
        console.log("IPFS Hash: ", response.data.IpfsHash);

        const hiddenDataUri: string = "";
        transaction(() => contentManagerContract.addAssetBatch([{
          tokenId: tokenId,
          publicDataUri: response.data.IpfsHash,
          hiddenDataUri: hiddenDataUri,
          maxSupply: maxSupply,
          royaltyReceiver: royaltyReceiver,
          royaltyRate: royaltyRate
        }]),
          "Transaction pending",
          "Transaction failed",
          "Transaction succeeded",
          () => setTransactionPending(false),
          () => createAssetSuccess(),
          () => setTransactionPending(false)
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const createAssetSuccess = () => {
    setTokenId("");
    setName("");
    setDescription("");
    setImageUri("");
    setTags([""]);
    setMaxSupply(BigNumber.from("0"));
    setRoyaltyReceiver("");
    setRoyaltyRateString("0");
    setNsfw(false);
    setType("audio");

    setShow(false);
  }

  return (
    <Modal isOpen={show} setIsOpen={setShow}>
      <div>
        <div className="flex justify-center text-xl mb-4">
          Create Asset
        </div>
        <div className="grid grid-cols-2">
          <div className="my-3 mr-2 text-right">
            Pinata API Key
          </div>
          <div className="my-2">
            <input value={pinataApiKey} onChange={(e) => { setPinataApiKey(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Pinata API Secret
          </div>
          <div className="my-2">
            <input value={pinataApiSecret} onChange={(e) => { setPinataApiSecret(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Token ID
          </div>
          <div className="my-2">
            <InputNumber value={tokenId} onChange={(e: string) => { setTokenId(e) }} className="bg-neutral700 focus:outline-none rounded py-1 px-2" disabled={false} />
          </div>
          <div className="my-3 mr-2 text-right">
            Name
          </div>
          <div className="my-2">
            <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Description
          </div>
          <div className="my-2">
            <input value={description} onChange={(e) => { setDescription(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Image URI
          </div>
          <div className="my-2">
            <input value={imageUri} onChange={(e) => { setImageUri(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Tags
          </div>
          <div className="my-2">
            {tags.map((tag, index) => (
              <div key={index}>
                <input value={tag} onChange={(e) => { setTags([...tags.slice(0, index), e.target.value, ...tags.slice(index + 1, tags.length)]) }} type="text" className="bg-neutral700 focus:outline-none rounded mb-2 py-1 px-2" />
                <button onClick={() => { setTags([...tags.slice(0, index), ...tags.slice(index + 1, tags.length)]) }} className="ml-2 text-chartreuse500">
                  X
                </button>
              </div>
            ))}
            <button onClick={() => { setTags(tags.concat([""])) }} className="bg-chartreuse500 text-neutral900 text-xl px-3 rounded-md">
              +
            </button>
          </div>
          <div className="my-3 mr-2 text-right">
            Max Supply
          </div>
          <div className="my-2">
            <input value={maxSupply?.toString()} onChange={(e) => { setMaxSupply(BigNumber.from(e.target.value)) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Royalty Receiver Address
          </div>
          <div className="my-2">
            <input value={royaltyReceiver} onChange={(e) => { setRoyaltyReceiver(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Royalty Rate (%)
          </div>
          <div className="my-2">
            <InputNumber
              value={royaltyRateString}
              onChange={(e) => updateRoyaltyRateString(e)}
              className="bg-neutral700 focus:outline-none rounded py-1 px-2"
              disabled={false}
            />
          </div>
          <div className="my-3 mr-2 text-right">
            NSFW
          </div>
          <div className="my-2 mt-3">
            <input checked={nsfw} onChange={(e) => { setNsfw(!nsfw) }} type="checkbox" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Asset Type
          </div>
          <div className="my-2">
            <select onChange={(e) => setType(e.target.value)} name="assetType" className="bg-neutral700 focus:outline-none rounded py-1 px-2">
              <option value="audio">
                Audio
              </option>
              <option value="image">
                Image
              </option>
              <option value="static3dobject">
                Static 3D Object
              </option>
              <option value="text">
                Text
              </option>
            </select>
          </div>
        </div>
        <AssetTypes
          assetType={type}
          subType={subType}
          audioFilesMetadata={audioFilesMetadata}
          imageFilesMetadata={imageFilesMetadata}
          static3dObjectFilesMetadata={static3dObjectFilesMetadata}
          textFilesMetadata={textFilesMetadata}
          setSubType={setSubType}
          setAudioFilesMetadata={setAudioFilesMetadata}
          setImageFilesMetadata={setImageFilesMetadata}
          setStatic3dObjectFilesMetadata={setStatic3dObjectFilesMetadata}
          setTextFilesMetadata={setTextFilesMetadata}
        />

        <div className="flex justify-center my-5 mt-10">
          <Button
            label="Create Asset"
            onClick={() => uploadAndDeploy()}
            enabled={true}
            show={!transactionPending}
            enabledClassName="bg-chartreuse500 text-neutral900 text-xsm mr-4 px-6 py-2 rounded-md"
            disabledClassName="bg-chartreuse500 text-neutral900 text-xsm mr-4 px-6 py-2 rounded-md"
          />
          <Loader show={transactionPending} />
        </div>
      </div>
    </Modal >
  );
}

export default CreateAssetModal;