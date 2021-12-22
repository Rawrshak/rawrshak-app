import React from 'react';
import { ImageFileMetadata } from "../../data/data";
import Button from '../Button';
import { InputNumber } from '../Input';

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
            className="bg-neutral700 focus:outline-none rounded py-1 px-2"
            value={imageFileMetadata.contentType}>
            <option value="png">
              image/png
            </option>
            <option value="jpg">
              image/jpg
            </option>
            <option value="svg">
              image/svg
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ImageAssetSubtype({
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
          value={subtype}
        >
          <option value="square">
            Square
          </option>
          <option value="horizontal-banner">
            Horizontal Banner
          </option>
          <option value="vertical-banner">
            Vertical Banner
          </option>
          <option value="custom">
            Custom
          </option>
        </select>
      </div>
    );
  } else {
    let subtypeText;
    if (subtype === "square") {
      subtypeText = "Square"
    } else if (subtype === "horizontal-banner") {
      subtypeText = "Horizontal Banner";
    } else if (subtype === "vertical-baner") {
      subtypeText = "Vertical Banner";
    } else if (subtype === "custom") {
      subtypeText = "Custom";
    }

    return (
      <div className="col-span-8 ml-1 my-3">
        {subtypeText}
      </div>
    );
  }
}

function ImageAsset({
  imageFilesMetadata,
  setImageFilesMetadata,
  subtype,
  setSubtype,
  subtypeEditable
}: {
  imageFilesMetadata: ImageFileMetadata[],
  setImageFilesMetadata: React.Dispatch<React.SetStateAction<ImageFileMetadata[]>>,
  subtype: string,
  setSubtype: React.Dispatch<React.SetStateAction<string>>,
  subtypeEditable: boolean
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
        <ImageAssetSubtype subtype={subtype} setSubtype={setSubtype} subtypeEditable={subtypeEditable} />
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

export default ImageAsset;