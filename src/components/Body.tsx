import { Switch, Route } from 'react-router-dom';
import Inventory from "./Inventory";
import Marketplace from "./Marketplace";
import Store from "./Store";
import Orders from "./Orders";
import Explore from './Explore';
import FullAssetPage from './FullAssetPage copy';
import SearchPage from './SearchPage';
import FullCollectionPage from './FullCollectionPage';
import AboutPage from './AboutPage';
import CreatePage from './CreatePage';
import CreateCollectionPage from './CreateCollectionPage';
import CreateAssetPage from './CreateAssetPage';
import ChooseCollection from './ChooseCollection';
import StoreCollectionPage from './StoreCollectionPage';
import StoreAssetPage from './StoreAssetPage';
import RoyaltiesHistory from './RoyaltiesHistory';
import InventoryAssetPage from './InventoryAssetPage';

function Body({
  searchTerm,
}:{
  searchTerm:string
}) {

  return (
    <div className="container -z-10 inline-block">
      <Switch>
        <Route exact path="/">
          <Marketplace />
        </Route>
        <Route path="/inventory/asset/:assetID">
          <InventoryAssetPage />
        </Route>
        <Route path="/explore">
          <Explore />
        </Route>
        <Route path="/inventory">
          <Inventory />
        </Route>
        <Route path="/store/collection/:collectionID/asset/:assetID">
          <StoreAssetPage />
        </Route>
        <Route path="/store/collection/:collectionID">
          <StoreCollectionPage />
        </Route>
        <Route path="/store/royalties_history">
          <RoyaltiesHistory />
        </Route>
        <Route path="/store">
          <Store />
        </Route>
        <Route path="/create/sc_creation">
          <CreateCollectionPage />
        </Route>
        <Route path="/create/a_creation/:collectionID">
          <CreateAssetPage />
        </Route>
        <Route path="/chooseCollection">
          <ChooseCollection />
        </Route>
        <Route path="/create">
          <CreatePage />
        </Route>
        <Route path="/orders">
          <div>
            <Orders />
          </div>
        </Route>
        <Route path="/asset/:assetID">
          <FullAssetPage />
        </Route>
        <Route path="/collection/:collectionID">
          <FullCollectionPage />
        </Route>
        <Route path="/search/:searchTerm">
          <SearchPage searchTerm={searchTerm}/>
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
      </Switch>
    </div>
  );
}

export default Body;