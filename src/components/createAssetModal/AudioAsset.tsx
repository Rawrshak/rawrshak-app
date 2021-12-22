import React from 'react';
import { AudioFileMetadata } from "../../data/data";
import Button from '../Button';
import { InputNumber } from '../Input';

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
            className="bg-neutral700 focus:outline-none rounded py-1 px-2"
            value={audioFileMetadata.engine}
          >
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
            className="bg-neutral700 focus:outline-none rounded py-1 px-2"
            value={audioFileMetadata.compression}
          >
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
            className="bg-neutral700 focus:outline-none rounded py-1 px-2"
            value={audioFileMetadata.contentType}
          >
            <option value="wav">
              WAV
            </option>
            <option value="mp3">
              MP3
            </option>
          </select>
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Duration (s)
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
  subtype,
  setSubType
}: {
  audioFilesMetadata: AudioFileMetadata[],
  setAudioFilesMetadata: React.Dispatch<React.SetStateAction<AudioFileMetadata[]>>,
  subtype: string,
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
            className="bg-neutral700 focus:outline-none rounded py-1 px-2"
            value={subtype}>
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


export default AudioAsset;