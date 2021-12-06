import { ContentDataWithMetadata } from '../data/data';

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
      <div onClick={() => openSmartContract(smartContract)} className="box-content h-44 w-64 m-3 bg-black400 rounded-xl cursor-pointer overflow-hidden">
        <div className="flex text-offWhite text-sm ml-4 h-6 justify-center truncate ...">
          {smartContract.name}
        </div>
        <div className="flex h-38">
          <img
            src={smartContract.imageUri}
            alt="Rawrshak Game"
            className="object-cover h-44 w-64 rounded-xl"
          />
        </div>
      </div>
    );
  }
}

export default GameCard;