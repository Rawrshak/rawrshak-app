import { ContentDataWithMetadata } from '../data/data';
import Image from './Image';

function DeveloperContentCard({
  smartContract,
  openSmartContract
}: {
  smartContract: ContentDataWithMetadata | undefined,
  openSmartContract: any
}) {

  if (smartContract === undefined) {
    return (null);
  } else {

    return (
      <div className="flex flex-col flex-grow h-44 m-3 bg-black400 rounded-xl cursor-pointer" onClick={() => openSmartContract(smartContract)}>
        <div className="grid grid-cols-5">
          <div className="col-span-4 h-6 text-offWhite text-sm ml-4 mt-1 truncate ...">
            {smartContract.name}
          </div>
        </div>
        <div className="flex justify-center h-28 text-offWhite text-xxl mt-1 mx-4 rounded-xl">
          <Image src={smartContract.imageUri} className="flex object-scale-down" type="content" />
        </div>
        <div className="h-5 text-offWhite text-sm mx-4 mt-1 truncate ...">
          Assets: {Number(smartContract.assets.length)}
        </div>
      </div>
    );
  }
}

export default DeveloperContentCard;