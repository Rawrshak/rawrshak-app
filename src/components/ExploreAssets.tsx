import { useEffect, useState } from 'react';
import { useData } from '../data';
import AssetCard from "./AssetCard";
import TradeAssetModal from "./TradeAssetModal";
import AssetModal from "./AssetModal";
import Button from "./Button";
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
  const [filteredAndSlicedAssets, setFilteredAndSlicedAssets] = useState<AssetWithOrders[]>();
  const [assetShowCount, setAssetShowCount] = useState<number>(6);

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

  useEffect(() => {
    if (filteredAssets === undefined) return;

    setFilteredAndSlicedAssets(filteredAssets.slice(0, assetShowCount));
  }, [filteredAssets, assetShowCount])

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

  if (filteredAndSlicedAssets === undefined || filteredAssets === undefined || filteredAndSlicedAssets.length === 0) {
    return null;
  } else {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSlicedAssets.map(assetWithOrders => (
            <AssetCard key={assetWithOrders.id} assetWithOrders={assetWithOrders} buyNow={tradeAsset} openAsset={openAsset} />
          ))}
        </div>
        <Button
          label="Show More Assets"
          onClick={() => setAssetShowCount(assetShowCount + 6)}
          enabled={true}
          show={filteredAssets.length > assetShowCount}
          enabledClassName="flex text-chartreuse500 border-chartreuse500 border-2 text-sm rounded-md w-44 h-8 justify-center pt-1 ml-3 mt-2"
          disabledClassName=""
        />
      </>
    );
  }
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
  const [firstSelection, setFirstSelection] = useState<boolean>(false);

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
    if (firstSelection === false) {
      changeFilteredTags([...(new Array<boolean>(index).fill(false)), true, ...(new Array<boolean>(filteredTags.length - index - 1).fill(false))]);
      setFirstSelection(true);
    } else {
      changeFilteredTags([...filteredTags.slice(0, index), selected, ...filteredTags.slice(index + 1, filteredTags.length)]);
    }
  }

  const selectAllTags = () => {
    if (tags === undefined) return;
    changeFilteredTags(new Array<boolean>(tags.length).fill(true));
  }

  const deselectAllTags = () => {
    if (tags === undefined) return;
    changeFilteredTags(new Array<boolean>(tags.length).fill(false));
  }

  if (show) {
    return (
      <div className="flex flex-grow flex-col m-4">
        <TradeAssetModal show={showTradeAssetModal} setShow={setShowTradeAssetModal} assetWithOrders={activeTradeAsset} />
        <AssetModal show={showAssetModal} setShow={setShowAssetModal} assetWithOrders={activeAsset} tradeAsset={tradeAsset} />
        <div className="flex text-offWhite text-xxxl my-2 mx-4">
          Explore Assets
        </div>
        <div className="flex flex-wrap my-1 mx-3">
          {tags ? tags.map((tag, index) => (
            <TagSelector key={index} index={index} tagId={tag ? tag : "Undefined"} selected={filteredTags ? filteredTags[index] : false} setSelected={updateFilteredTags} />
          )) : ""}
        </div>
        <div className="flex my-1 mx-3">
          <div onClick={() => { selectAllTags() }} className="flex flex-shrink text-chartreuse500 text-sm bg-gray rounded-xl m-1 px-3 py-1 border-2 cursor-pointer border-chartreuse500">
            Select All
          </div>
          <div onClick={() => { deselectAllTags() }} className="flex flex-shrink text-chartreuse500 text-sm bg-gray rounded-xl m-1 px-3 py-1 border-2 cursor-pointer border-chartreuse500">
            Deselect All
          </div>
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