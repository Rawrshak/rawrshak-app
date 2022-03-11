import { useData } from '../data';
import { useWeb3 } from '../web3';
import { ContentDataWithMetadata } from '../data/data';
import DeveloperContentCard from "./DeveloperContentCard";
import Button from "./Button";
import { ethers, BigNumber } from "ethers";
import { useTransaction } from "../web3/transactions";
import { useHistory } from 'react-router-dom';

function Store() {
  const { account } = useWeb3();
  const { ownedContentWithMetadata } = useData();
  const { claimableRoyalties, supportedToken, systemContracts: { exchange } } = useData();
  const [transaction] = useTransaction();
  const history = useHistory();

  const collectRoyalties = () => {
    if (exchange === undefined || account === undefined) return;
    transaction(() => exchange.claimRoyalties(), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, undefined, undefined);
  }

  return (
    <div className="flex flex-col flex-grow">
      <div className="grid grid-cols-5 mb-2">
        <div className="col-span-1 text-offWhite text-xxxl ml-4 mt-2">
          Store
        </div>
        {claimableRoyalties !== undefined && supportedToken !== undefined &&
          <div className="col-span-4 flex justify-end mr-4">
            <div className="flex flex-row bg-black450 rounded-lg py-2 px-4 justify-center mx-2">
              <div className="flex text-base text-offWhite mt-1">
                Create New:
              </div>
              <Button
                label="Collection"
                onClick={() => history.push('create/sc_creation/')}
                enabled={true}
                show={true}
                enabledClassName="flex justify-center text-chartreuse500 text-sm border-chartreuse500 border-2 py-1 px-4 rounded-lg ml-3"
                disabledClassName="flex justify-center text-black300 text-sm border-black300 border-2 py-1 px-4 rounded-lg ml-3"
              />
              <Button
                label="Asset"
                onClick={() => history.push('/chooseCollection/')}
                enabled={
                  ownedContentWithMetadata === undefined 
                    ?
                      false
                    :
                    ownedContentWithMetadata.length > 0 ? true : false
                }
                show={true}
                enabledClassName="flex justify-center text-chartreuse500 text-sm border-chartreuse500 border-2 py-1 px-4 rounded-lg ml-3"
                disabledClassName="flex justify-center text-black300 text-sm border-black300 border-2 py-1 px-4 rounded-lg ml-3"
              />
            </div>
            <div className="flex flex-row bg-black450 rounded-lg py-2 px-4 justify-center mx-2">
              <div className="flex text-base text-offWhite mt-1">
                Royalties: {`${Number(ethers.utils.formatUnits(claimableRoyalties, supportedToken.decimals))} ${supportedToken.symbol}`}
              </div>
              <Button
                label="COLLECT"
                onClick={() => collectRoyalties()}
                enabled={claimableRoyalties.gt(BigNumber.from("0"))}
                show={true}
                enabledClassName="flex justify-center text-chartreuse500 text-sm border-chartreuse500 border-2 py-1 px-4 rounded-lg ml-3"
                disabledClassName="flex justify-center text-black300 text-sm border-black300 border-2 py-1 px-4 rounded-lg ml-3"
              />
              <Button
                label="HISTORY"
                onClick={() => history.push('/store/royalties_history')}
                enabled={true}
                show={true}
                enabledClassName="flex justify-center text-chartreuse500 text-sm border-chartreuse500 border-2 py-1 px-4 rounded-lg ml-3"
                disabledClassName="flex justify-center text-black300 text-sm border-black300 border-2 py-1 px-4 rounded-lg ml-3"
              />
            </div>
          </div>
        }
      </div>
      <hr className="text-neutral800 mx-4" />
      <OwnedSmartContracts
        ownedContentWithMetadata={ownedContentWithMetadata}
      />
    </div>
  );
}


function OwnedSmartContracts({
  ownedContentWithMetadata
}: {
  ownedContentWithMetadata: ContentDataWithMetadata[] | undefined
}) {

  const history = useHistory();
  
  if (ownedContentWithMetadata === undefined) {
    return (null);
  } else {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {ownedContentWithMetadata.length > 0 ? ownedContentWithMetadata.map((content) => (
          <DeveloperContentCard
            key={content.id}
            smartContract={content}
            openSmartContract={() => history.push('/store/collection/'.concat(content.id))}
          />
        )) :
          <div className="flex flex-col flex-grow h-44 m-3 bg-opacity-1 border-black200 border-2 rounded-xl cursor-pointer" onClick={() => history.push('create/sc_creation/')}>
            <div className="flex text-offWhite text-center text-sm mt-16 m-3 underline">
              No existing Smart Contracts. Create your first by pressing the Create New Collection button above!
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Store;