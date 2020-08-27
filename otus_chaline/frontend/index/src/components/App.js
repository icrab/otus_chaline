import React from 'react';
import Header from "./Header"
import Main from "./Main"
import SinglePageTea from "./Tea/SinglePageTea"
import Navigation from "./Navigation"
import FilteredTea from './Tea/FilteredTea'
import Order from "./Order/Order"
import HistoryList from "./Order/HistoryList"
import PopUp from './PopUp'

import API from '../utils/API'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logIn } from '../actions/auth'
import { createOrder } from '../actions/order'
import { withRouter } from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    if (this.props.auth.isAuthenticated){
      const url = 'api/order/'
      const headers = { headers : { 'Authorization': `Token ${this.props.auth.token}` } }
      const createOrder = this.props.createOrder;
      API.get(url, headers)
        .then(res => {
          const order = res.data
          const product_count = order.products.length;
          const products = order.products;
          createOrder(order.id, product_count, products)
        })
        .catch(err => console.log(err.message))
      }
  }

  render(){
      return (
            <div>
              <Header/>
              <Navigation/>
              <PopUp/>
              <Switch>
                <Route path ="/order" component={() => <Order/>}/>
                <Route path ="/tea/:id" component={(props) => <SinglePageTea {...props}/>}/>
                <Route path ="/grade/:id" component={(props) => <FilteredTea {...props}/>}/>
                {this.props.auth.isAuthenticated && <Route path ="/history" component={() => <HistoryList/>}/>}
                <Route path ="/" component={() => <Main/>}/>
              </Switch>
            </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: bindActionCreators(createOrder, dispatch),
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
