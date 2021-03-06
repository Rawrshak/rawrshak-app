import { Switch, Route } from 'react-router-dom';
import Home from "./Home";
import Inventory from "./Inventory";
import Marketplace from "./Marketplace";
import Store from "./Store";
import Orders from "./Orders";

function Body() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/inventory">
          <Inventory />
        </Route>
        <Route path="/marketplace">
          <Marketplace />
        </Route>
        <Route path="/store">
          <Store />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
      </Switch>
    </div>
  );
}

export default Body;