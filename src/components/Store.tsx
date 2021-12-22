import { useEffect, useState } from 'react';
import { useData } from '../data';
import { useWeb3 } from '../web3';
import { ContentDataWithMetadata, Asset } from '../data/data';
import DeveloperContentCard from "./DeveloperContentCard";
import DeveloperAssetCard from "./DeveloperAssetCard";
import DeveloperAssetModal from "./DeveloperAssetModal";
import CreateSmartContractModal from "./CreateSmartContractModal";
import CreateAssetModal from "./createAssetModal/CreateAssetModal";
import { ContentManager, ContentManager__factory } from '../assets/typechain';
import Button from "./Button";
import Image from './Image';
import { ethers, BigNumber } from "ethers";
import { useTransaction } from "../web3/transactions";
import UpdateAssetModal from './createAssetModal/UpdateAssetModal';

function SmartContractAssets({
  activeContent,
  openUpdateAssetModal
}: {
  activeContent: ContentDataWithMetadata | undefined,
  openUpdateAssetModal: (asset: Asset | undefined) => void
}) {
  const [showAssetModal, setShowAssetModal] = useState<boolean>(false);
  const [openedAsset, setOpenedAsset] = useState<Asset>();

  const openAsset = (asset: Asset) => {
    setShowAssetModal(true);
    setOpenedAsset(asset);
  }

  const _openUpdateAssetModal = (asset: Asset | undefined) => {
    setShowAssetModal(false);
    openUpdateAssetModal(openedAsset);
  }

  if (activeContent === undefined) {
    return (
      <div className="text-offWhite text-xl">No assets found</div>
    );
  } else {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <DeveloperAssetModal show={showAssetModal} setShow={setShowAssetModal} assetWithOrders={openedAsset} content={activeContent} openUpdateAssetModal={() => _openUpdateAssetModal(openedAsset)} />
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
  const [showUpdateAssetModal, setShowUpdateAssetModal] = useState<boolean>(false);
  const [assetToUpdate, setAssetToUpdate] = useState<Asset | undefined>();

  const openUpdateAssetModal = (asset: Asset | undefined) => {
    setShowUpdateAssetModal(true);
    setAssetToUpdate(asset);
  }

  useEffect(() => {
    if (activeContent === undefined || signerOrProvider === undefined) return;

    setActiveContentManagerContract(ContentManager__factory.connect(activeContent.managerAddress, signerOrProvider))
  }, [activeContent, signerOrProvider]);

  if (show && activeContent !== undefined) {
    return (
      <div className="flex flex-col flex-grow text-offWhite text-xsm">
        <CreateAssetModal show={showCreateAssetModal} setShow={setShowCreateAssetModal} contentManagerContract={activeContentManagerContract} />
        <UpdateAssetModal show={showUpdateAssetModal} setShow={setShowUpdateAssetModal} contentManagerContract={activeContentManagerContract} asset={assetToUpdate} />
        <div onClick={() => setShowAssetsView(false)} className="text-lg ml-4 cursor-pointer">
          {`< Back to smart contracts`}
        </div>
        <div className="flex flex-col bg-black450 rounded-lg px-6 py-4 m-4">
          <div className="flex">
            <Image src={activeContent.imageUri} className="flex" type="content" />
          </div>
          <div className="flex text-xxxl">
            {activeContent.name}
          </div>
          <div className="flex text-sm">
            Description: {activeContent.description}
          </div>
          <div className="flex text-sm">
            URI: {activeContent.contractUri}
          </div>
          <div className="flex text-sm">
            Contract Address: {activeContent.contractAddress}
          </div>
          <div className="flex text-sm">
            Creator Address: {activeContent.creatorAddress}
          </div>
          <div className="flex text-sm">
            Creator: {activeContent.creator}
          </div>
          <div className="flex text-sm">
            Game: {activeContent.game}
          </div>
        </div>
        <div className="grid grid-cols-2 mt-12 mb-4">
          <div className="text-offWhite text-xl ml-4">
            {activeContent.assets.length} {activeContent.assets.length === 1 ? "Asset" : "Assets"}
          </div>
          <div className="flex justify-end mx-4">
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
        <SmartContractAssets activeContent={activeContent} openUpdateAssetModal={openUpdateAssetModal} />
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
  const { claimableRoyalties, supportedToken, systemContracts: { exchange } } = useData();
  const [showSmartContractModal, setShowSmartContractModal] = useState(false);
  const [transaction] = useTransaction();
  const { account } = useWeb3();


  const openSmartContract = (smartContract: ContentDataWithMetadata) => {
    if (!ownedContentWithMetadata) return;

    setActiveSmartContract(smartContract);
    setShowAssetsView(true);
  }

  const collectRoyalties = () => {
    if (exchange === undefined || account === undefined) return;

    transaction(() => exchange.claimRoyalties(), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, undefined, undefined);
  }

  if (show) {
    return (
      <div className="flex flex-col flex-grow">
        <div className="grid grid-cols-2 mb-2">
          <div className="text-offWhite text-xxxl ml-4 mt-2">
            Store
          </div>
          {claimableRoyalties !== undefined && supportedToken !== undefined && <div className="flex justify-end mr-4">

            <div className="flex flex-row bg-black450 rounded-lg py-2 px-4 justify-center">
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

            </div>
          </div>}
        </div>
        <hr className="text-neutral800 mx-4" />
        <div className="flex justify-end mt-6 mr-4">
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
      </div>
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
    <div className="flex flex-grow">
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