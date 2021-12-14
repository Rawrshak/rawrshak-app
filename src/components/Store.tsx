import { useEffect, useState } from 'react';
import { useData } from '../data';
import { useWeb3 } from '../web3';
import { ContentDataWithMetadata, Asset } from '../data/data';
import DeveloperContentCard from "./DeveloperContentCard";
import DeveloperAssetCard from "./DeveloperAssetCard";
import DeveloperAssetModal from "./DeveloperAssetModal";
import CreateSmartContractModal from "./CreateSmartContractModal";
import CreateAssetModal from "./CreateAssetModal";
import { ContentManager, ContentManager__factory } from '../assets/typechain';
import Button from "./Button";
import Image from './Image';

function SmartContractAssets({ activeContent }: { activeContent: ContentDataWithMetadata | undefined }) {
  const [showAssetModal, setShowAssetModal] = useState<boolean>(false);
  const [openedAsset, setOpenedAsset] = useState<Asset>();

  const openAsset = (asset: Asset) => {
    setShowAssetModal(true);
    setOpenedAsset(asset);
  }

  if (activeContent === undefined) {
    return (
      <div className="text-offWhite text-xl">No assets found</div>
    );
  } else {
    return (
      <div className="flex flex-wrap mt-6">
        <DeveloperAssetModal show={showAssetModal} setShow={setShowAssetModal} assetWithOrders={openedAsset} content={activeContent} />
        {activeContent.assets.map((asset) => (
          <DeveloperAssetCard key={asset.id} asset={asset} openAsset={openAsset} />
        ))}
      </div>
    );
  }
}

function AssetsView({
  setShowAssetsView,
  activeContent,
  show
}: {
  setShowAssetsView: React.Dispatch<React.SetStateAction<boolean>>,
  activeContent: ContentDataWithMetadata | undefined,
  show: boolean
}) {
  const { signerOrProvider } = useWeb3();
  const [activeContentManagerContract, setActiveContentManagerContract] = useState<ContentManager>();
  const [showCreateAssetModal, setShowCreateAssetModal] = useState<boolean>(false);

  useEffect(() => {
    if (activeContent === undefined || signerOrProvider === undefined) return;

    setActiveContentManagerContract(ContentManager__factory.connect(activeContent.managerAddress, signerOrProvider))
  }, [activeContent, signerOrProvider]);

  if (show && activeContent !== undefined) {
    return (
      <div className="text-offWhite text-xsm">
        <CreateAssetModal show={showCreateAssetModal} setShow={setShowCreateAssetModal} contentManagerContract={activeContentManagerContract} />
        <div onClick={() => setShowAssetsView(false)} className="cursor-pointer">
          {`< Back to smart contracts`}
        </div>

        <div className="flex mt-8 mx-3">
          <Image src={activeContent.imageUri} className="object-cover h-44 w-64 rounded-xl opacity-95" type="content" />
        </div>

        <div className="flex text-xxxl mx-3">
          {activeContent.name}
        </div>
        <div className="flex text-lg mx-3">
          {activeContent.description}
        </div>



        <div className="grid grid-cols-2 mt-12 mb-4">
          <div className="text-offWhite text-xl ml-4">
            {activeContent.assets.length} {activeContent.assets.length === 1 ? "Asset" : "Assets"}
          </div>
          <div className="flex justify-end">
            <Button
              label="NEW ASSET"
              onClick={() => setShowCreateAssetModal(true)}
              enabled={true}
              show={true}
              enabledClassName="flex justify-center text-chartreuse500 text-sm border-chartreuse500 border-2 py-2 px-4 rounded-lg w-36"
              disabledClassName=""
            />
          </div>
        </div>
        <SmartContractAssets activeContent={activeContent} />
      </div >
    );
  } else {
    return (null);
  }
}

function OwnedSmartContracts({
  ownedContentWithMetadata,
  openSmartContract
}: {
  ownedContentWithMetadata: ContentDataWithMetadata[] | undefined,
  openSmartContract: (smartContract: ContentDataWithMetadata) => void,
}) {
  if (ownedContentWithMetadata === undefined) {
    return (null);
  } else {
    return (
      <div className="flex flex-wrap mt-6">
        {ownedContentWithMetadata.map((content) => (
          <DeveloperContentCard
            key={content.id}
            smartContract={content}
            openSmartContract={openSmartContract}
          />
        ))}
      </div>
    );
  }
}

function SmartContractsView({
  ownedContentWithMetadata,
  setActiveSmartContract,
  setShowAssetsView,
  show,
}: {
  ownedContentWithMetadata: ContentDataWithMetadata[] | undefined,
  setActiveSmartContract: React.Dispatch<React.SetStateAction<ContentDataWithMetadata | undefined>>,
  setShowAssetsView: React.Dispatch<React.SetStateAction<boolean>>
  show: boolean
}) {
  const [showSmartContractModal, setShowSmartContractModal] = useState(false);

  const openSmartContract = (smartContract: ContentDataWithMetadata) => {
    if (!ownedContentWithMetadata) return;

    setActiveSmartContract(smartContract);
    setShowAssetsView(true);
  }
  if (show) {
    return (
      <>
        <div className="flex justify-end mt-6">
          <Button
            label="NEW SMART CONTRACT"
            onClick={() => setShowSmartContractModal(true)}
            enabled={true}
            show={true}
            enabledClassName="flex justify-center text-chartreuse500 text-sm border-chartreuse500 border-2 py-2 px-4 rounded-lg"
            disabledClassName=""
          />
        </div>
        <CreateSmartContractModal
          show={showSmartContractModal}
          setShow={setShowSmartContractModal}
        />
        <OwnedSmartContracts
          ownedContentWithMetadata={ownedContentWithMetadata}
          openSmartContract={openSmartContract}
        />
      </>
    );
  } else {
    return (null);
  }
}

function Store() {
  const [showAssetsView, setShowAssetsView] = useState<boolean>(false);
  const [activeSmartContract, setActiveSmartContract] = useState<ContentDataWithMetadata>();

  const { ownedContentWithMetadata } = useData();

  useEffect(() => {
  }, [ownedContentWithMetadata]);

  return (
    <div className="container">
      <AssetsView
        setShowAssetsView={setShowAssetsView}
        activeContent={activeSmartContract}
        show={showAssetsView}
      />
      <SmartContractsView
        ownedContentWithMetadata={ownedContentWithMetadata}
        setActiveSmartContract={setActiveSmartContract}
        setShowAssetsView={setShowAssetsView}
        show={!showAssetsView}
      />
    </div>
  );
}

export default Store;