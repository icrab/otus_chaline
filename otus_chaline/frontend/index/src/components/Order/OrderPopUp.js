import React from 'react';
import { connect } from "react-redux";
import { NavLink }  from 'react-router-dom'

class OrderPopUp extends React.Component {
    constructor(props) {
      super(props)
    }

    render(){
      if (this.props.order.product_count == 0){
        return (
              <div className="order-popup card p-1">
                <div className="card-body">
                  <span className="card-text">В заказе <b>{this.props.order.product_count}</b> товаров</span>
                </div>
              </div>
            )
      } else {
        let total_cost = 0
        this.props.order.products.map((product) => total_cost = total_cost + product.count * product.tea.cost)
        return (
            <div className="order-popup card p-1">
              <div className="card-body">
                <span className="card-text">В заказе <b>{this.props.order.product_count}</b> товара</span>
                <span className="card-text">на сумму <b>{total_cost}</b> руб.</span>
                <NavLink to={'/order'}><button className="btn btn-primary">Перейти к заказу</button></NavLink>
              </div>
            </div>
        )

      }
    }

  }

const mapStateToProps = (state) => {
  return {
    order: state.order
  };
};

export default connect(mapStateToProps)(OrderPopUp);
