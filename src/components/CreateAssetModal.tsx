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
import { InputNumber, InputAmount } from './Input';
import { ContentManager } from '../assets/typechain';
import { useTransaction } from "../web3/transactions";
import { useWeb3 } from '../web3';

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
    <div className="bg-neutral900 pt-1 pb-3 mb-4 rounded-lg">
      <div className="flex justify-center text-lg">
        Audio File #{index + 1}
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-4 my-3 mr-2 text-right">
          Name
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <input value={audioFileMetadata.name} onChange={(e) => updateName(e.target.value)} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Engine
        </div>
        <div className="col-span-8 my-2">
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
        <div className="col-span-4 my-3 mr-2 text-right">
          Compression
        </div>
        <div className="col-span-8 my-2">
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
        <div className="col-span-4 my-3 mr-2 text-right">
          Audio File URI
        </div>
        <div className="col-span-8 my-2">
          <input value={audioFileMetadata.uri} onChange={(e) => { updateUri(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Content Type
        </div>
        <div className="col-span-8 my-2">
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
        <div className="col-span-4 my-3 mr-2 text-right">
          Duration
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <InputNumber
            value={(audioFileMetadata.duration).toString()}
            onChange={(e: any) => updateDuration(e)}
            className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2"
            disabled={false} />
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Channel Count
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <InputNumber
            value={(audioFileMetadata.channelCount).toString()}
            onChange={(e: any) => updateChannelCount(e)}
            className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2"
            disabled={false}
          />
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Sample Rate
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <InputNumber
            value={(audioFileMetadata.sampleRate).toString()}
            onChange={(e: any) => updateSampleRate(e)}
            className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2"
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
      engine: "unity",
      compression: "compressed",
      uri: "https://arweave.net/",
      contentType: "wav",
      duration: 0,
      channelCount: 0,
      sampleRate: 0,
    }
    newAudioFilesMetadata[newAudioFilesMetadata.length] = newAudioFile;
    setAudioFilesMetadata(newAudioFilesMetadata);
  }

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-4 my-3 mr-2 text-right">
          Audio Asset SubType
        </div>
        <div className="col-span-8 my-2">
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
          enabledClassName="bg-neutral900 text-offWhite text-xsm px-6 py-2 rounded-md"
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
    <div className="bg-neutral900 pt-1 pb-3 mb-4 rounded-lg">
      <div className="flex justify-center text-lg">
        Image File #{index + 1}
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-4 my-3 mr-2 text-right">
          Image URI
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <input value={imageFileMetadata.uri} onChange={(e) => { updateUri(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Height (pixels)
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <InputNumber
            value={(imageFileMetadata.height).toString()}
            onChange={(e: any) => updateHeight(e)}
            className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2"
            disabled={false} />
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Width (pixels)
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <InputNumber
            value={(imageFileMetadata.width).toString()}
            onChange={(e: any) => updateWidth(e)}
            className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2"
            disabled={false}
          />
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Content Type
        </div>
        <div className="col-span-8 my-2">
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
      uri: "https://arweave.net/",
      height: 0,
      width: 0,
      contentType: "png",
    }

    newImageFilesMetadata[newImageFilesMetadata.length] = newImageFile;

    setImageFilesMetadata(newImageFilesMetadata);
  }

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-4 my-3 mr-2 text-right">
          Image SubType
        </div>
        <div className="col-span-8 my-2">
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
          enabledClassName="bg-neutral900 text-offWhite text-xsm px-6 py-2 rounded-md"
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
    <div className="bg-neutral900 pt-1 pb-3 mb-4 rounded-lg">
      <div className="flex justify-center text-lg">
        Static 3D Object File #{index + 1}
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-4 my-3 mr-2 text-right">
          Name
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <input value={static3dObjectFileMetadata.name} onChange={(e) => updateName(e.target.value)} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Engine
        </div>
        <div className="col-span-8 my-2">
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
        <div className="col-span-4 my-3 mr-2 text-right">
          Platform
        </div>
        <div className="col-span-8 my-2">
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
        <div className="col-span-4 my-3 mr-2 text-right">
          Render Pipeline
        </div>
        <div className="col-span-8 my-2">
          <select
            onChange={(e) => updateRenderPipeline(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="brp">
              BRP
            </option>
          </select>
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Fidelity
        </div>
        <div className="col-span-8 my-2">
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
        <div className="col-span-4 my-3 mr-2 text-right">
          Shape
        </div>
        <div className="col-span-8 my-2">
          <select
            onChange={(e) => updateShape(e.target.value)}
            name="assetType"
            className="bg-neutral700 focus:outline-none rounded py-1 px-2">
            <option value="horizontal">
              Horizontal
            </option>
          </select>
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Static 3D Object File URI
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <input value={static3dObjectFileMetadata.uri} onChange={(e) => { updateUri(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
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
      engine: "unity",
      platform: "windows",
      renderPipeline: "brp",
      fidelity: "low",
      shape: "horizontal",
      uri: "https://arweave.net/",
    }
    newStatic3dObjectFilesMetadata[newStatic3dObjectFilesMetadata.length] = newStatic3dObjectFile;
    setStatic3dObjectFilesMetadata(newStatic3dObjectFilesMetadata);
  }

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-4 my-3 mr-2 text-right">
          Asset SubType
        </div>
        <div className="col-span-8 my-2">
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
          enabledClassName="bg-neutral900 text-offWhite text-xsm px-6 py-2 rounded-md"
          disabledClassName=""
        />
      </div>
    </>
  );
}

function TextFile({
  textFileMetadata,
  setTextFileMetadata
}: {
  textFileMetadata: TextFileMetadata,
  setTextFileMetadata: React.Dispatch<React.SetStateAction<TextFileMetadata>>
}) {

  const updateTitle = (title: string) => {
    const newTextFileMetadata = Object.assign({}, textFileMetadata);
    newTextFileMetadata.title = title;
    setTextFileMetadata(newTextFileMetadata);
  }

  const updateDescription = (description: string) => {
    const newTextFileMetadata = Object.assign({}, textFileMetadata);
    newTextFileMetadata.description = description;
    setTextFileMetadata(newTextFileMetadata);
  }

  return (
    <div className="bg-neutral900 pt-1 pb-3 mb-4 rounded-lg">
      <div className="flex justify-center text-lg">
        Text File
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-4 my-3 mr-2 text-right">
          Title
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <input value={textFileMetadata.title} onChange={(e) => updateTitle(e.target.value)} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Description
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <textarea value={textFileMetadata.description} onChange={(e) => { updateDescription(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2 h-20" />
        </div>
      </div>
    </div>
  );
}

function TextAsset({
  textFileMetadata,
  setTextFileMetadata,
  setSubType
}: {
  textFileMetadata: TextFileMetadata,
  setTextFileMetadata: React.Dispatch<React.SetStateAction<TextFileMetadata>>,
  setSubType: React.Dispatch<React.SetStateAction<string>>,
}) {

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-4 my-3 mr-2 text-right">
          Text Asset SubType
        </div>
        <div className="col-span-8 my-2">
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

      <TextFile
        textFileMetadata={textFileMetadata}
        setTextFileMetadata={setTextFileMetadata}
      />
    </>
  );
}

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

function CreateAssetModal({
  show,
  setShow,
  contentManagerContract
}: {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  contentManagerContract: ContentManager | undefined
}) {
  const web3 = useWeb3();

  const [pinataApiKey, setPinataApiKey] = useState<string>("");
  const [pinataApiSecret, setPinataApiSecret] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("0");
  const [imageUri, setImageUri] = useState<string>("https://arweave.net/");
  const [tags, setTags] = useState<string[]>([""]);
  const [type, setType] = useState<string>("audio");
  const [subtype, setSubtype] = useState<string>("sound-effect");
  const [nsfw, setNsfw] = useState<boolean>(false);
  const [maxSupply, setMaxSupply] = useState<BigNumber>(BigNumber.from("0"));
  const [royaltyReceiver, setRoyaltyReceiver] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [showStatusMessage, setShowStatusMessage] = useState<boolean>(false);
  const [transaction] = useTransaction();
  const [transactionPending, setTransactionPending] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showCreateButton, setShowCreateButton] = useState<boolean>(false);

  const [publicAssetMetadata, setPublicAssetMetadata] = useState<PublicAssetMetadata>(
    {
      name: "",
      description: "",
      image: "",
      tags: [""],
      type: "",
      subtype: "",
      nsfw: false,
    }
  );

  const [audioFilesMetadata, setAudioFilesMetadata] = useState<AudioFileMetadata[]>(
    [
      {
        name: "",
        engine: "unity",
        compression: "compressed",
        uri: "https://arweave.net/",
        contentType: "wav",
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
        contentType: "png",
      }
    ]
  );
  const [static3dObjectFilesMetadata, setStatic3dObjectFilesMetadata] = useState<Static3dObjectFileMetadata[]>(
    [
      {
        name: "",
        engine: "unity",
        platform: "windows",
        renderPipeline: "brp",
        fidelity: "low",
        shape: "horizontal",
        uri: "https://arweave.net/",
      }
    ]
  );
  const [textFileMetadata, setTextFileMetadata] = useState<TextFileMetadata>(
    {
      title: "",
      description: "",
    }

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

  useEffect(() => {
    if (transactionPending) {
      setShowCreateButton(false);
      setShowLoader(true);
      setShowStatusMessage(true);
      setStatusMessage("Pinning and propagating JSON to IPFS");
      setShowStatusMessage(true);
    } else {
      setShowCreateButton(true);
      setShowLoader(false);
      setStatusMessage("");
      setShowStatusMessage(false);
    }
  }, [transactionPending]);

  useEffect(() => {
    if (web3.account === undefined) return;

    setRoyaltyReceiver(web3.account);
  }, [web3.account]);

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
      subtype: publicAssetMetadata.subtype,
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
      subtype: publicAssetMetadata.subtype,
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
      subtype: publicAssetMetadata.subtype,
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
      subtype: publicAssetMetadata.subtype,
      nsfw: publicAssetMetadata.nsfw,
      assetProperties: textFileMetadata
    }

    setTextAssetMetadata(newTextAssetMetadata);
  }, [publicAssetMetadata, textFileMetadata]);

  useEffect(() => {
    const newPublicAssetMetadata: PublicAssetMetadata = {
      name: name,
      description: description,
      image: imageUri,
      tags: tags,
      type: type,
      subtype: subtype,
      nsfw: nsfw,
    }

    setPublicAssetMetadata(newPublicAssetMetadata);
  }, [name, description, imageUri, tags, type, subtype, nsfw]);

  useEffect(() => {
    console.log("type changed");
    if (type === "audio") {
      setSubtype("sound-effect");
    } else if (type === "image") {
      setSubtype("square");
    } else if (type === "static3dobject") {
      setSubtype("trophy");
    } else {
      setSubtype("title");
    }
  }, [type]);

  useEffect(() => {
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

    console.log("JSON to pin: ", jsonToPin);

  }, [type, audioAssetMetadata, imageAssetMetadata, static3dObjectAssetMetadata, textAssetMetadata]);

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
      .then(response => {
        setTimeout(() => {
          console.log("URI: ", response.data.IpfsHash);
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
        }, 60000);
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
      <div className="flex flex-col">
        <div className="flex justify-center text-xl mb-4">
          Create Asset
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-4 my-3 mr-2 text-right">
            Pinata API Key
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={pinataApiKey} onChange={(e) => { setPinataApiKey(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Pinata API Secret
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={pinataApiSecret} onChange={(e) => { setPinataApiSecret(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Token ID
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <InputNumber value={tokenId} onChange={(e: string) => { setTokenId(e) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" disabled={false} />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Name
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Description
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2 h-20" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Image URI
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={imageUri} onChange={(e) => { setImageUri(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 mt-3 mr-2 text-right">
            Tags
          </div>
          {tags.map((tag, index) => {
            let tagInputJsx = [];
            if (index > 0) {
              tagInputJsx.push(
                <div className="col-span-4" />
              );
            }
            tagInputJsx.push(
              <div key={index} className="flex flex-grow flex-row col-span-8">
                <input
                  value={tag}
                  onChange={e => setTags([...tags.slice(0, index), e.target.value, ...tags.slice(index + 1, tags.length)])}
                  type="text"
                  className="flex flex-grow bg-neutral700 focus:outline-none rounded mb-1 mt-2 py-1 px-2"
                />
                <Button
                  label="X"
                  onClick={() => { setTags([...tags.slice(0, index), ...tags.slice(index + 1, tags.length)]) }}
                  enabled={true}
                  show={true}
                  enabledClassName="ml-2 text-chartreuse500"
                  disabledClassName=""
                />
              </div>
            );
            return (tagInputJsx);
          }
          )}
          <div className="col-span-4" />
          <div className="col-span-8 mt-1 mb-2">
            <Button
              label="+"
              onClick={() => { setTags(tags.concat([""])) }}
              enabled={true}
              show={true}
              enabledClassName="flex bg-chartreuse500 text-neutral900 text-xl px-3 rounded-md"
              disabledClassName=""
            />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Max Supply
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={maxSupply?.toString()} onChange={(e) => { setMaxSupply(BigNumber.from(e.target.value)) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Royalty Receiver Address
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={royaltyReceiver} onChange={(e) => { setRoyaltyReceiver(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Royalty Rate (%)
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <InputAmount
              value={royaltyRateString}
              decimals={2}
              onChange={(e) => updateRoyaltyRateString(e)}
              className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2"
              disabled={false}
            />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            NSFW
          </div>
          <div className="col-span-8 my-2 mt-3">
            <input checked={nsfw} onChange={(e) => { setNsfw(!nsfw) }} type="checkbox" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Asset Type
          </div>
          <div className="col-span-8 my-2">
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
          audioFilesMetadata={audioFilesMetadata}
          imageFilesMetadata={imageFilesMetadata}
          static3dObjectFilesMetadata={static3dObjectFilesMetadata}
          textFileMetadata={textFileMetadata}
          setSubType={setSubtype}
          setAudioFilesMetadata={setAudioFilesMetadata}
          setImageFilesMetadata={setImageFilesMetadata}
          setStatic3dObjectFilesMetadata={setStatic3dObjectFilesMetadata}
          setTextFileMetadata={setTextFileMetadata}
        />
        <div className="flex flex-col justify-center mt-10">
          {showStatusMessage && <div className="flex justify-center text-offWhite">
            {statusMessage}
          </div>}
          <div className="flex justify-center">
            <Button
              label="Create Asset"
              onClick={() => uploadAndDeploy()}
              enabled={true}
              show={showCreateButton}
              enabledClassName="flex bg-chartreuse500 text-neutral900 text-xsm px-6 py-2 rounded-md w-30 justify-center"
              disabledClassName="flex bg-black400 text-black300 text-xsm px-6 py-2 rounded-md w-30 justify-center"
            />
          </div>
          <Loader show={showLoader} />
        </div>
      </div>
    </Modal >
  );
}

export default CreateAssetModal;