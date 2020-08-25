import React from "react";
import axios from "axios";
import Product from "./Product"
import { NavLink }  from 'react-router-dom'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Order extends React.Component {
  constructor(props){
    super (props);
  }

  render() {
      return (
          <div className="main">
            {this.props.order.products.map(product => <Product key={product.tea.id} tea={product.tea} count={product.count}/>)}
          </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    order: state.order
  };
};

export default connect(mapStateToProps)(Order);
