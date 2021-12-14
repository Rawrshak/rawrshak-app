import { useEffect, useState } from 'react';
import { useData } from '../data';
import AssetCard from "./AssetCard";
import Button from "./Button";
import { AssetWithOrders } from "../data/data"

function SelectedAssets({
  selectedTags
}: {
  selectedTags: string[] | undefined
}) {
  const { assetsWithOrders } = useData();

  const [filteredAssets, setFilteredAssets] = useState<AssetWithOrders[]>();
  const [filteredAndSlicedAssets, setFilteredAndSlicedAssets] = useState<AssetWithOrders[]>();
  const [assetShowCount, setAssetShowCount] = useState<number>(6);

  useEffect(() => {
    if (selectedTags === undefined || assetsWithOrders === undefined) return;

    const checkIfAssetHasTags = (assetTags: string[], filteredTags: (string | undefined)[]) => {
      let foundTag = false;
      assetTags.forEach((tag) => {
        if (tag && filteredTags.includes(tag)) {
          foundTag = true;
        }
      });

      return foundTag;
    };

    const newFilteredAssets = assetsWithOrders.filter(assetWithOrders => {
      if (!assetWithOrders.tags) return false;
      if (checkIfAssetHasTags(assetWithOrders.tags, selectedTags)) {
        return true;
      } else {
        return false;
      }
    });

    setFilteredAssets(newFilteredAssets);

  }, [assetsWithOrders, selectedTags]);

  useEffect(() => {
    if (filteredAssets === undefined) return;

    setFilteredAndSlicedAssets(filteredAssets.slice(0, assetShowCount));
  }, [filteredAssets, assetShowCount])

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
            <AssetCard key={assetWithOrders.id} assetWithOrders={assetWithOrders} />
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

function Tag({
  tagId,
  selected,
  selectTag
}: {
  tagId: string,
  selected: boolean,
  selectTag: (tag: string, select: boolean) => void
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
    <div className={getClassName()} onClick={() => selectTag(tagId, !selected)}>
      {tagId}
    </div>
  );
}

function ExploreAssets({
  show
}: {
  show: boolean
}) {
  const [activeTradeAsset, setActiveTradeAsset] = useState<AssetWithOrders>();
  const [visibleTags, setVisibleTags] = useState<string[]>();
  const [selectedTags, setSelectedTags] = useState<string[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { curatedTags, allTags, assetsWithOrders } = useData();

  useEffect(() => {
    if (assetsWithOrders === undefined || activeTradeAsset === undefined) return;
    setActiveTradeAsset(assetsWithOrders.find(assetWithOrder => assetWithOrder.id === activeTradeAsset.id));
  }, [assetsWithOrders, activeTradeAsset])

  useEffect(() => {
    if (allTags === undefined) return;

    if (searchTerm === "") {
      setVisibleTags(curatedTags);
      setSelectedTags(curatedTags);
    } else {
      const newVisibleTags = allTags.filter(tag => (tag.toLowerCase()).includes(searchTerm.toLowerCase()));
      setVisibleTags(newVisibleTags);
      setSelectedTags(newVisibleTags);
    }
  }, [searchTerm, curatedTags, allTags]);

  useEffect(() => {
    if (visibleTags === undefined && curatedTags !== undefined) {
      setVisibleTags(curatedTags);
      setSelectedTags(curatedTags);
    }
  }, [curatedTags, visibleTags])

  const selectAllTags = () => {
    setSelectedTags(visibleTags);
  }

  const deselectAllTags = () => {
    setSelectedTags([]);
  }

  const selectTag = (tag: string, select: boolean) => {
    if (selectedTags === undefined) return;

    if (select) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      const index = selectedTags.indexOf(tag);
      if (index !== -1) {
        setSelectedTags([...selectedTags.slice(0, index), ...selectedTags.slice(index + 1, selectedTags.length)]);
      }
    }
  }

  if (show) {
    return (
      <div className="flex flex-col m-4">
        <div className="flex text-offWhite text-xxxl my-2 mx-4">
          Explore Assets
        </div>
        <div className="flex">
          <div className="flex flex-grow bg-black450 text-offWhite mb-2 mx-4 py-2 pl-3 pr-2 rounded-lg">
            <div className="flex text-offWhite text-sm mt-1 mr-2">
              Search All Tags
            </div>
            <div className="flex flex-grow">
              <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} type="text" className="flex flex-grow text-offWhite bg-black400 focus:outline-none rounded py-1 px-2" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap my-1 mx-3">
          {visibleTags ? visibleTags.map((tag, index) => (
            <Tag key={index} tagId={tag ? tag : "Undefined"} selected={selectedTags ? selectedTags.includes(tag) : false} selectTag={selectTag} />
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
          selectedTags={selectedTags}
        />
      </div>
    );
  } else {
    return (null);
  }
}


export default ExploreAssets;