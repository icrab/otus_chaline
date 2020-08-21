import React from 'react';
import { connect } from "react-redux";
import { NavLink }  from 'react-router-dom'

class OrderWidget extends React.Component {
    constructor(props) {
      super(props)
    }

    render(){
      if (this.props.order.product_count == 0){
        return (<div className="order-widget">В корзине {this.props.order.product_count}</div>)
      } else {
        let total_cost = 0
        this.props.order.products.map((product) => total_cost = total_cost + product.count * product.tea.cost)
        return (
          <div>
          <div className="order-widget">В корзине {this.props.order.product_count} товара</div>
          <div className="order-widget">На сумму {total_cost}</div>
          <NavLink to={'/order'}><button className="btn btn-primary">Перейти в корзину</button></NavLink>
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

export default connect(mapStateToProps)(OrderWidget);
