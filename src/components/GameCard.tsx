import { ContentDataWithMetadata } from '../data/data';
import Image from './Image';
import contentIcon from '../assets/icons/contentIcon.png';

function GameCard({
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
      // <div className="flex w-64 h-44 m-3 bg-black rounded-xl cursor-pointer" onClick={() => openSmartContract(smartContract)} >
      //   <div className="flex h-38">
      //     <Image src={smartContract.imageUri} className="object-cover h-44 w-64 rounded-xl opacity-95" type="content" />
      //   </div>
      //   <div className="flex flex-grow absolute justify-center h-6 w-64">
      //     <div className="flex text-offWhite text-sm mt-1 h-6 truncate ...">
      //       {smartContract.name}
      //     </div>
      //   </div>
      //   <div className="flex absolute text-offWhite text-sm mt-36 ml-4 h-6 truncate ...">
      //     {smartContract.creator}
      //   </div>
      // </div>


      <div className="flex flex-col flex-grow m-3 bg-black400 rounded-xl cursor-pointer" onClick={() => openSmartContract(smartContract)}>
        <div className="grid grid-cols-5">
          <div className="col-span-4 h-6 text-offWhite text-sm ml-4 mt-1 truncate ...">

          </div>
          <div className="flex col-span-1 justify-end">
            <Image
              src={contentIcon}
              className={"h-5 mt-2 mr-2"}
              type="content"
            />
          </div>
        </div>
        <div className="flex justify-center text-offWhite text-xxl mt-1 mx-4 rounded-xl">
          <img src={smartContract.imageUri} alt="Rawrshak Asset" className="flex object-scale-down w-2/3" />
        </div>
        <div className="text-offWhite text-lg mx-4 mt-2 truncate ...">
          {smartContract.name}
        </div>
        <div className="text-offWhite text-sm mx-4 mb-2 truncate ...">
          {smartContract.creator}
        </div>
      </div>
    );
  }
}

export default GameCard;