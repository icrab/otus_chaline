import React from "react";
import axios from "axios";
import { NavLink }  from 'react-router-dom'
import TeaCountOptionValue from "./TeaCountOptionValue"
import TeaCost from "./TeaCost"
import { generateOptionValueArray } from "../utils/generateOptionValueArray.js"

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createOrder, updateProduct, deleteProduct, deleteOrder } from '../actions/order'

class Product extends React.Component {
  constructor(props){
    super (props);
    this.state = {
      count_values: 5
     }
  }

  handleChangeTeaCount = (event) => {
    const updateProduct = this.props.updateProduct;
    const new_props = {
      ...this.props,
      count: parseInt(event.target.value, 10)
    }
    updateProduct(new_props)
  }

  removeFromOrder = () => {
    const url = 'http://127.0.0.1:8000/api/order/'
    const headers = { headers : { 'Authorization': 'Token 07981f7715c5a956368f1a0c4099bb27f8dd200f' } }
    const data = { tea: this.props.tea.id, count: 0 }
    const deleteProduct = this.props.deleteProduct
    axios.post(url, data, headers)
      .then(res => {
        console.log('delete', res.data)
        const removed_product = res.data
        deleteProduct(removed_product)
      })
  }

  render() {
    const href = '/tea/' + this.props.tea.id;
    const grade_url = '/grade/' + this.props.tea.grade.id;
    const cost = this.props.tea.cost * this.props.count
    const gramms = generateOptionValueArray(this.props.tea.storage_type)
    return (
        <div className="card col">
          <div className="card-body">
            <NavLink to={href}><h5 className="card-title">{this.props.tea.name}</h5></NavLink>
            <NavLink to={grade_url} className="card-subtitle mb-2 text-muted">{this.props.tea.grade.type}</NavLink>
            <TeaCost cost={this.props.tea.cost} type={this.props.tea.storage_type}/>
              <div className="form-group">
                <select className="form-control" value={this.props.count} onChange={this.handleChangeTeaCount}>
                {gramms.map((gramm, val) => <TeaCountOptionValue key={val} gramm={gramm} val={val} count={this.props.count} type={this.props.tea.storage_type}/>)}
                </select>
              </div>
            <h5>Итог: {cost} руб</h5>
            <button onClick={this.removeFromOrder} className="btn btn-primary">Удалить из корзины</button>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: bindActionCreators(createOrder, dispatch),
    updateProduct: bindActionCreators(updateProduct, dispatch),
    deleteProduct: bindActionCreators(deleteProduct, dispatch),
    deleteOrder: bindActionCreators(deleteOrder, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
