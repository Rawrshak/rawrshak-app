import React from 'react';
import { Static3dObjectFileMetadata } from "../../data/data";
import Button from '../Button';

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

export default Static3dObjectAsset;