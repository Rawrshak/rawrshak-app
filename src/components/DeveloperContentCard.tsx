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
      <div className="flex w-64 h-44 m-3 bg-black rounded-xl cursor-pointer" onClick={() => openSmartContract(smartContract)} >
        <div className="flex flex-grow absolute justify-center h-6 w-64">
          <div className="flex text-offWhite text-sm z-10 mt-1 h-6 truncate ...">
            {smartContract.name}
          </div>
        </div>
        <div className="flex absolute text-offWhite text-sm z-10 mt-36 ml-4 h-6 truncate ...">
          Assets: {smartContract.assets.length}
        </div>
        <div className="flex h-38">
          <Image src={smartContract.imageUri} className="object-cover h-44 w-64 rounded-xl opacity-95" type="content" />
        </div>
      </div>
    );
  }
}

export default DeveloperContentCard;