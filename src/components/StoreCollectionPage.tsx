import { useHistory, useParams } from 'react-router-dom';
import { useData } from '../data';
import Image from './Image';
import { useEffect, useState } from 'react';
import { Asset, ContentDataWithMetadata } from '../data/data';
import Button from "./Button";
import { ContentManager, ContentManager__factory } from '../assets/typechain';
import UpdateAssetModal from './createAssetModal/UpdateAssetModal';
import UpdateRoyaltyModal from './UpdateRoyaltyModal';
import DeveloperAssetModal from './DeveloperAssetModal';
import DeveloperAssetCard from './DeveloperAssetCard';
import { useWeb3 } from '../web3';

function StoreCollectionPage() {

  const { ownedContentWithMetadata } = useData();
  const { collectionID } = useParams<{ collectionID: string }>();
  const [activeContent,setActiveContent] = useState<ContentDataWithMetadata>()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const history = useHistory();
  const { signerOrProvider } = useWeb3();
  const [activeContentManagerContract, setActiveContentManagerContract] = useState<ContentManager>();
  const [showUpdateAssetModal, setShowUpdateAssetModal] = useState<boolean>(false);
  const [showUpdateRoyaltyModal, setShowUpdateRoyaltyModal] = useState<boolean>(false);
  const [assetToUpdate, setAssetToUpdate] = useState<Asset | undefined>();

  const openUpdateAssetModal = (asset: Asset | undefined) => {
    setShowUpdateAssetModal(true);
    setAssetToUpdate(asset);
  }

  useEffect(() => {
    if (ownedContentWithMetadata === undefined) return
    setActiveContent(ownedContentWithMetadata.find(content => content.id === collectionID))
    if (activeContent === undefined || signerOrProvider === undefined) {
      console.log('Cannot find content/collection to display')
      return
    }
    setActiveContentManagerContract(ContentManager__factory.connect(activeContent.managerAddress, signerOrProvider))
  }, [activeContent, collectionID, ownedContentWithMetadata, signerOrProvider]);

  if (activeContent !== undefined) {
    return (
      <>
        <UpdateAssetModal show={showUpdateAssetModal} setShow={setShowUpdateAssetModal} contentManagerContract={activeContentManagerContract} asset={assetToUpdate} />
        <UpdateRoyaltyModal show={showUpdateRoyaltyModal} setShow={setShowUpdateRoyaltyModal} activeContent={activeContent} />
        <div className="flex flex-col flex-grow text-offWhite text-xsm">
          <div className="flex flex-row bg-black450 rounded-lg px-6 py-4 m-4">
            <div className="flex flex-col flex-grow">
              <div className="flex justify-center">
                <Image src={activeContent.imageUri} className="flex w-1/3" type="content" />
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

              <div className="flex">
                <div className="flex flex-grow" />
                <div className="text-offWhite text-sm my-1 justify-end">
                  <Button
                    label="EDIT ROYALTIES"
                    onClick={() => setShowUpdateRoyaltyModal(true)}
                    enabled={true}
                    show={true}
                    enabledClassName="bg-black450 text-chartreuse500 border-chartreuse500 border-2 text-sm px-6 py-2 rounded-md"
                    disabledClassName="bg-black45000 text-neutral900 text-xsm mr-4 px-6 py-2 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-12 mb-4">
            <div className="text-offWhite text-xl ml-4">
              {activeContent.assets.length} {activeContent.assets.length === 1 ? "Asset" : "Assets"}
            </div>
            <div className="flex justify-end mx-4">
              <Button
                label="NEW ASSET"
                onClick={() => history.push('/create/a_creation/'.concat(activeContent.contractAddress))}
                enabled={true}
                show={true}
                enabledClassName="flex justify-center text-chartreuse500 text-sm border-chartreuse500 border-2 py-2 px-4 rounded-lg w-36"
                disabledClassName=""
              />
            </div>
          </div>
          <SmartContractAssets activeContent={activeContent} openUpdateAssetModal={openUpdateAssetModal} />
        </div >
      </>
    );
  } else {
    return (null);
  }
}


function SmartContractAssets({
  activeContent,
  openUpdateAssetModal
}: {
  activeContent: ContentDataWithMetadata | undefined,
  openUpdateAssetModal: (asset: Asset | undefined) => void
}) {
  const [showAssetModal, setShowAssetModal] = useState<boolean>(false);
  const [openedAsset, setOpenedAsset] = useState<Asset>();
  const { collectionID } = useParams<{ collectionID: string }>();

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
          <DeveloperAssetCard key={asset.id} collectionID={collectionID} asset={asset} openAsset={openAsset} />
        ))}
      </div>
    );
  }
}

export default StoreCollectionPage;