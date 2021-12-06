function AssetIcon({ index, name, amount, openAsset }: { index: number, name: string | undefined, amount: number | undefined, openAsset: any }) {
  return (
    <div onClick={() => openAsset({ index })} className="box-content h-24 w-24 m-1 border-2 border-darkBlue100 bg-darkBlue800 rounded-md cursor-pointer">
      <div className="flex justify-end">
        <div className="flex justify-center box-content h-5 w-5 mt-1 mr-1 border-2 border-none">
          <div className="text-offWhite text-xxsm">{amount}</div>
        </div>
      </div>
      <div className="flex flex-shrink text-offWhite text-xxsm justify-center">
        {name}
      </div>
    </div>
  );
}

export default AssetIcon;