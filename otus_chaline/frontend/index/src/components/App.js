import React from 'react';
import Header from "./Header"
import Main from "./Main"
import SingleTea from "./SingleTea"
import Navigation from "./Navigation"
import FilteredTea from './FilteredTea'
import Order from "./Order"

import axios from "axios";
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logIn } from '../actions/auth'
import { createOrder } from '../actions/order'

class App extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const url = 'http://127.0.0.1:8000/api/order/'
    const headers = { headers : { 'Authorization': 'Token 07981f7715c5a956368f1a0c4099bb27f8dd200f' } }
    const createOrder = this.props.createOrder;
    axios.get(url, headers)
      .then(res => {
        const order = res.data
        const product_count = order.product.length;
        const products = order.product;
        createOrder(order.id, product_count, products)
      })

  }

  render(){
      return (
            <div>
              <Header/>
              <Navigation />
              <Switch>
                <Route path ="/order" component={() => <Order/>}/>
                <Route path ="/tea/:id" component={(props) => <SingleTea {...props}/>}/>
                <Route path ="/grade/:id" component={(props) => <FilteredTea {...props}/>}/>
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
    logIn: bindActionCreators(logIn, dispatch),
    createOrder: bindActionCreators(createOrder, dispatch),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
