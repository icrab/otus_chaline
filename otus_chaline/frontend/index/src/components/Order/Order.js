import React from "react";
import API from '../../utils/API'
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
    const url = 'api/order/buy/'
    const headers = { headers : { 'Authorization': `Token ${this.props.auth.token}` } }
    const data = {}
    const replaceOrder = this.props.replaceOrder;
    API.post(url, data, headers)
      .then(res => {
        console.log('buy order', res.data.order_id)
        replaceOrder(res.data.order_id)
    })
  }

  render() {
    if (this.props.order.product_count != 0) {
      let total_cost = 0
      this.props.order.products.map((product) => total_cost = total_cost + product.count * product.tea.cost)
      return (
          <div className="main">
            {this.props.order.products.map(product => <Product key={product.tea.id} tea={product.tea} count={product.count}/>)}
            <h5 className="order-price"> Итог: {total_cost} </h5>
            <button className="btn btn-primary" onClick={this.buyOrder}>Оформить заказ</button>
          </div>
      )
    } else {
      return (
        <div className="main">
          <h5 className="order-price">В заказе пусто</h5>
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
