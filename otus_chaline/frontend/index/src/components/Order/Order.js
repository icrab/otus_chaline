import React from "react";
import axios from "axios";
import Product from "./Product"
import { withRouter } from 'react-router';
import { NavLink }  from 'react-router-dom'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { replaceOrder } from '../../actions/order'

class Order extends React.Component {
  constructor(props){
    super (props);
  }

  redirectOnMain = () => {
    this.props.history.push('/')
  }

  buyOrder = () => {
    const url = 'http://127.0.0.1:8000/api/order/buy/'
    const headers = { headers : { 'Authorization': `Token ${this.props.auth.token}` } }
    const data = {}
    const replaceOrder = this.props.replaceOrder;
    axios.post(url, data, headers)
      .then(res => {
        console.log('buy order', res.data.order_id)
        replaceOrder(res.data.order_id)
    })
  }

  render() {
    if (this.props.order.hasOrder) {
      return (
          <div className="main">
            {this.props.order.products.map(product => <Product key={product.tea.id} tea={product.tea} count={product.count}/>)}
            <button className="btn btn-primary" onClick={this.buyOrder}>Оформить заказ</button>
          </div>
      )
    } else {
      return (
        <div className="main">
          <h5>В заказе пусто</h5>
          <button className="btn btn-primary" onClick={this.redirectOnMain}>На главную</button>
        </div>
      )
    }
    }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    order: state.order
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    replaceOrder: bindActionCreators(replaceOrder, dispatch),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
