import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import WarehouseAdd from "./components/WarehouseAdd/WarehouseAdd";
import TotalInventory from "./components/TotalInventory/TotalInventory";
import WarehouseInventory from "./components/WarehouseInventory/WarehouseInventory";
import InventoryItem from "./components/InventoryItem/InventoryItem";
import ItemAdd from "./components/ItemAdd/ItemAdd";
import ItemEdit from "./components/ItemEdit/ItemEdit";
import WarehouseEdit from "./components/WarehouseEdit/WarehouseEdit";

import HomePage from './components/Homepage/HomePage';

function App() {
  return (
    <div className='app-container'>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/warehouse' exact component={HomePage} />
          <Route path="/warehouse/add" component={WarehouseAdd} />
          <Route
            path="/warehouse/edit/:warehouseid"
            component={WarehouseEdit}
          />
          <Route
            path="/warehouse/inventory/:warehouseid"
            component={WarehouseInventory}
          />
          <Route path="/inventory" exact component={TotalInventory} />
          <Route exact path='/inventory/add' component={ItemAdd} />
          <Route path='/inventory/edit/:itemid' component={ItemEdit} />
          <Route path="/inventory/:itemid" component={InventoryItem} />
          
        </Switch>
      </BrowserRouter>
      <h2 className='app-container__copyright'>© InStock Inc. All Rights Reserved.</h2>
    </div>
  );
}

export default App;
