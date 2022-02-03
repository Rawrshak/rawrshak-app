import React from 'react';
import { AudioFileMetadata } from "../../data/data";
import Button from '../Button';
import { InputNumber } from '../Input';
import X from '../../assets/icons/X';

function AudioFile({
  audioFileMetadata,
  updateAudioFileMetadata,
  index,
  deleteFile
}: {
  audioFileMetadata: AudioFileMetadata,
  updateAudioFileMetadata: (index: number, audioFileMetadata: AudioFileMetadata) => void,
  index: number,
  deleteFile: (index: number) => void
}) {

  const updateName = (name: string) => {
    const newAudioFileMetadata = Object.assign({}, audioFileMetadata);
    newAudioFileMetadata.name = name;
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

  return (
    <div className="bg-neutral900 pt-1 pb-3 mb-4 rounded-lg">
      <div className="grid grid-cols-8 justify-center">
        <div className="col-span-1" />
        <div className="col-span-6 justify-center text-lg">
          <div className="flex justify-center my-2">
            Audio File #{index + 1}
          </div>
        </div>
        <div className="flex justify-end mr-2">
          <div className="col-span-1 justify-end">
            <button onClick={() => deleteFile(index)} className="focus:outline-none p-1" >
              <X />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-4 my-3 mr-2 text-right">
          Name
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <input value={audioFileMetadata.name} onChange={(e) => updateName(e.target.value)} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Audio File URI
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <textarea value={audioFileMetadata.uri} onChange={(e) => { updateUri(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
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
            <option value="audio/wav">
              WAV
            </option>
            <option value="audio/mp3">
              MP3
            </option>
            <option value="audio/ogg">
              OGG
            </option>
            <option value="audio/aiff">
              AIFF
            </option>
          </select>
        </div>
        <div className="col-span-4 my-3 mr-2 text-right">
          Duration (ms)
        </div>
        <div className="flex flex-grow col-span-7 my-2">
          <InputNumber
            value={(audioFileMetadata.duration).toString()}
            onChange={(e: any) => updateDuration(e)}
            className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2"
            disabled={false} />
        </div>
      </div>
    </div>
  );
}

function AudioAssetSubtype({
  subtype,
  setSubtype,
  subtypeEditable
}: {
  subtype: string,
  setSubtype: React.Dispatch<React.SetStateAction<string>>,
  subtypeEditable: boolean
}) {
  if (subtypeEditable) {
    return (
      <div className="col-span-8 my-2">
        <select
          onChange={(e) => setSubtype(e.target.value)}
          name="assetType"
          className="bg-neutral700 focus:outline-none rounded py-1 px-2"
          value={subtype}>
          <option value="sound-effect">
            Sound Effect
          </option>
          <option value="shout">
            Shout
          </option>
          <option value="character-line">
            Character Line
          </option>
          <option value="background-music">
            Background Music
          </option>
        </select>
      </div>
    );
  } else {
    let subtypeText;
    if (subtype === "sound-effect") {
      subtypeText = "Sound Effect"
    } else if (subtype === "shout") {
      subtypeText = "Shout";
    } else if (subtype === "character-line") {
      subtypeText = "Character Line";
    } else if (subtype === "background-music") {
      subtypeText = "Background Music";
    }

    return (
      <div className="col-span-8 ml-1 my-3">
        {subtypeText}
      </div>
    );
  }
}

function AudioAsset({
  audioFilesMetadata,
  setAudioFilesMetadata,
  subtype,
  setSubtype,
  subtypeEditable
}: {
  audioFilesMetadata: AudioFileMetadata[],
  setAudioFilesMetadata: React.Dispatch<React.SetStateAction<AudioFileMetadata[]>>,
  subtype: string,
  setSubtype: React.Dispatch<React.SetStateAction<string>>,
  subtypeEditable: boolean
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
      uri: "https://arweave.net/",
      contentType: "audio/wav",
      duration: 0,
    }
    newAudioFilesMetadata[newAudioFilesMetadata.length] = newAudioFile;
    setAudioFilesMetadata(newAudioFilesMetadata);
  }

  const deleteAudioFile = (index: number) => {
    setAudioFilesMetadata([...audioFilesMetadata.slice(0, index), ...audioFilesMetadata.slice(index + 1, audioFilesMetadata.length)])
  }

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-4 my-3 mr-2 text-right">
          Audio Asset SubType
        </div>
        <AudioAssetSubtype subtype={subtype} setSubtype={setSubtype} subtypeEditable={subtypeEditable} />
      </div>
      {audioFilesMetadata.map((audioFile, index) => (
        <React.Fragment key={index}>
          <AudioFile
            audioFileMetadata={audioFile}
            updateAudioFileMetadata={updateAudioFileMetadata}
            index={index}
            deleteFile={deleteAudioFile}
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