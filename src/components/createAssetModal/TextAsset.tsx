import React from 'react';
import { TextFileMetadata } from "../../data/data";

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
            <option value="custom">
              Custom
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

export default TextAsset;