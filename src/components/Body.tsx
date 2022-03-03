import { Switch, Route } from 'react-router-dom';
import Inventory from "./Inventory";
import Marketplace from "./Marketplace";
import Store from "./Store";
import Orders from "./Orders";
import Explore from './Explore';
import FullAssetPage from './FullAssetPage';
import SearchPage from './SearchPage';

function Body({
  searchTerm,
  setSearchTerm
}:{
  searchTerm:string,
  setSearchTerm:React.Dispatch<React.SetStateAction<string>>
}) {

  return (
    <div className="container mt-24">
      <Switch>
        <Route exact path="/">
          <Marketplace />
        </Route>
        <Route path="/inventory">
          <Inventory />
        </Route>
        <Route path="/explore">
          <Explore searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </Route>
        <Route path="/store">
          <Store />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/assetPage/:assetID">
          <FullAssetPage />
        </Route>
        <Route path="/search/:searchTerm">
          <SearchPage searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </Route>
      </Switch>
    </div>
  );
}

export default Body;