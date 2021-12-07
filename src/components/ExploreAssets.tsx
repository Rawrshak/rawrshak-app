import { useEffect, useState } from 'react';
import { useData } from '../data';
import AssetCard from "./AssetCard";
import TradeAssetModal from "./TradeAssetModal";
import AssetModal from "./AssetModal";
import { AssetWithOrders } from "../data/data"

function SelectedAssets({
  tags,
  filteredTags,
  setShowBuyAssetModal,
  setActiveTradeAsset,
  setShowAssetModal,
  setActiveAsset
}: {
  tags: string[] | undefined,
  filteredTags: boolean[] | undefined
  setShowBuyAssetModal: React.Dispatch<React.SetStateAction<boolean>>,
  setActiveTradeAsset: React.Dispatch<React.SetStateAction<AssetWithOrders | undefined>>,
  setShowAssetModal: React.Dispatch<React.SetStateAction<boolean>>,
  setActiveAsset: React.Dispatch<React.SetStateAction<AssetWithOrders | undefined>>
}) {
  const { assetsWithOrders } = useData();

  const [filteredAssets, setFilteredAssets] = useState<AssetWithOrders[]>();
  useEffect(() => {
    if (!tags || !filteredTags || !assetsWithOrders) return;

    const checkIfAssetHasTags = (assetTags: string[], filteredTags: (string | undefined)[]) => {
      let foundTag = false;
      assetTags.forEach((tag) => {
        if (tag && filteredTags.includes(tag)) {
          foundTag = true;
        }
      });

      return foundTag;
    };

    const newFilteredTags = (tags.filter((tag, index) => filteredTags[index])).map((tag, index) => tag);
    const newFilteredAssets = assetsWithOrders.filter(assetWithOrders => {
      if (!assetWithOrders.tags) return false;
      if (checkIfAssetHasTags(assetWithOrders.tags, newFilteredTags)) {
        return true;
      } else {
        return false;
      }
    });

    setFilteredAssets(newFilteredAssets);

  }, [assetsWithOrders, tags, filteredTags]);

  const tradeAsset = (assetWithOrders: AssetWithOrders) => {
    setShowAssetModal(false);
    setShowBuyAssetModal(true);
    if (assetsWithOrders) {
      setActiveTradeAsset(assetWithOrders);
    }
  }

  const openAsset = (assetWithOrders: AssetWithOrders) => {
    setShowBuyAssetModal(false);
    setShowAssetModal(true);
    if (assetsWithOrders) {
      setActiveAsset(assetWithOrders);
    }
  }

  if (!assetsWithOrders) {
    return (
      <div>No assets found</div>
    );
  }

  return (
    <div className="flex flex-grow flex-wrap">
      {filteredAssets && filteredAssets.length > 0 ? filteredAssets.map(assetWithOrders => (
        <AssetCard key={assetWithOrders.id} assetWithOrders={assetWithOrders} buyNow={tradeAsset} openAsset={openAsset} />
      )) : <div className="flex text-offWhite text-xl mt-4">No assets found</div>}
    </div>
  )
}

function TagSelector({
  index,
  tagId,
  selected,
  setSelected
}: {
  index: number,
  tagId: string,
  selected: boolean,
  setSelected: (e: any, index: number) => void
}) {
  const getClassName = () => {
    const commonClassNames = "flex flex-shrink text-offWhite text-sm bg-gray rounded-xl m-1 px-3 py-1 border-2 cursor-pointer";
    if (selected) {
      return (commonClassNames + " border-neutral600");
    } else {
      return (commonClassNames + " border-gray");
    }
  }

  return (
    <div className={getClassName()} onClick={() => setSelected(!selected, index)}>
      {tagId}
    </div>
  );
}

function ExploreAssets({
  show
}: {
  show: boolean
}) {
  const [showTradeAssetModal, setShowTradeAssetModal] = useState(false);
  const [activeTradeAsset, setActiveTradeAsset] = useState<AssetWithOrders>();
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [activeAsset, setActiveAsset] = useState<AssetWithOrders>();

  const { tags, filteredTags, changeFilteredTags, assetsWithOrders } = useData();

  const tradeAsset = (assetWithOrders: AssetWithOrders) => {
    setShowAssetModal(false);
    setShowTradeAssetModal(true);
    if (assetsWithOrders) {
      setActiveTradeAsset(assetWithOrders);
    }
  }

  useEffect(() => {
    if (assetsWithOrders === undefined || activeTradeAsset === undefined) return;
    setActiveTradeAsset(assetsWithOrders.find(assetWithOrder => assetWithOrder.id === activeTradeAsset.id));
  }, [assetsWithOrders, activeTradeAsset])


  useEffect(() => {
    if (filteredTags === undefined && tags !== undefined) {
      changeFilteredTags(new Array<boolean>(tags.length).fill(true));
    }
  })

  const updateFilteredTags = (selected: boolean, index: number) => {
    if (filteredTags === undefined || filteredTags[index] === undefined) return;
    changeFilteredTags([...filteredTags.slice(0, index), selected, ...filteredTags.slice(index + 1, filteredTags.length)]);
  }

  if (show) {
    return (
      <div className="flex flex-col m-4">
        <TradeAssetModal show={showTradeAssetModal} setShow={setShowTradeAssetModal} assetWithOrders={activeTradeAsset} />
        <AssetModal show={showAssetModal} setShow={setShowAssetModal} assetWithOrders={activeAsset} tradeAsset={tradeAsset} />
        <div className="flex text-offWhite text-xxxl m-2">
          Explore Assets
        </div>
        <div className="flex flex-wrap">
          {tags ? tags.map((tag, index) => (
            <TagSelector key={index} index={index} tagId={tag ? tag : "Undefined"} selected={filteredTags ? filteredTags[index] : false} setSelected={updateFilteredTags} />
          )) : ""}
        </div>
        <SelectedAssets
          tags={tags}
          filteredTags={filteredTags}
          setShowBuyAssetModal={setShowTradeAssetModal}
          setActiveTradeAsset={setActiveTradeAsset}
          setShowAssetModal={setShowAssetModal}
          setActiveAsset={setActiveAsset}
        />
      </div>
    );
  } else {
    return (null);
  }
}


export default ExploreAssets;