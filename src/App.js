import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>

          <Route path="/shop"> 
            <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>
          
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>

          <Route exact path="/">       {/*This is for only link on homepage*/}   
            <Shop></Shop>
          </Route>

          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>

          <Route path="*">              {/*This is for unknown links, like apple.com/goru etc*/}
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
