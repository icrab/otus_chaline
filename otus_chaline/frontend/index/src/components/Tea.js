import React from "react";
import axios from "axios";
import { NavLink }  from 'react-router-dom'
import TeaCountOptionValue from './TeaCountOptionValue'
import TeaCost from './TeaCost'
import { generateOptionValueArray } from "../utils/generateOptionValueArray.js"

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createOrder, addProduct, updateProduct } from '../actions/order'

class Tea extends React.Component {
  constructor(props){
    super (props);
    this.state = {product_count: 0}
  }

  handleChangeTeaCount = (event) => {
    this.setState({product_count:event.target.value})
  }

  addToOrder = () => {
    const url = 'http://127.0.0.1:8000/api/order/'
    const headers = { headers : { 'Authorization': 'Token 07981f7715c5a956368f1a0c4099bb27f8dd200f' } }
    const data = { tea: this.props.tea.id, count: this.state.product_count }
    const addProduct = this.props.addProduct
    axios.post(url, data, headers)
      .then(res => {
        console.log('add', res.data)
        const exist_tea = this.props.order.products.filter(product => product.tea.id == res.data.tea.id )
        exist_tea.length == 0 ? addProduct(res.data) : console.log(false)
      })
  }

  render() {
    const href = '/tea/' + this.props.tea.id;
    const grade_url = '/grade/' + this.props.tea.grade.id;
    const gramms = generateOptionValueArray(this.props.tea.storage_type)

    if (this.props.in_order) {
      let count = 0
      let cost = 0
      this.props.order.products.map((product) => {
        if ( product.tea.id == this.props.tea.id) {
         cost = product.count * product.tea.cost
         count = product.count
        }
      })

      return (
          <div className="card col">
            <div className="img-card">
              <img className="card-img-top" src={this.props.tea.img} alt="Card image cap"/>
            </div>
            <div className="card-body">
              <NavLink to={href}><h5 className="card-title">{this.props.tea.name}</h5></NavLink>
              <NavLink to={grade_url} className="card-subtitle mb-2 text-muted">{this.props.tea.grade.type}</NavLink>
              <TeaCost cost={this.props.tea.cost} type={this.props.tea.storage_type}/>
              <h5>Товар в корзине</h5>
              <h5>Итог: {cost} руб за {count}</h5>
              <NavLink to={'/order'}><button className="btn btn-primary">Перейти в корзину</button></NavLink>
            </div>
          </div>
      )
    } else {
      const cost = this.state.product_count * this.props.tea.cost
      return (
          <div className="card col">
            <div className="img-card">
              <img className="card-img-top" src={this.props.tea.img} alt="Card image cap"/>
            </div>
            <div className="card-body">
              <NavLink to={href}><h5 className="card-title">{this.props.tea.name}</h5></NavLink>
              <NavLink to={grade_url} className="card-subtitle mb-2 text-muted">{this.props.tea.grade.type}</NavLink>
              <TeaCost cost={this.props.tea.cost} type={this.props.tea.storage_type}/>
                <div className="form-group">
                  <select className="form-control" value={this.state.product_count} onChange={this.handleChangeTeaCount}>
                  { gramms.map((gramm, val) => <TeaCountOptionValue key={val} gramm={gramm} val={val} count={this.state.product_count} type={this.props.tea.storage_type}/>) }
                  </select>
                </div>
              <button onClick={this.addToOrder} className="btn btn-primary">Добавить в корзину</button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: bindActionCreators(createOrder, dispatch),
    addProduct: bindActionCreators(addProduct, dispatch),
    updateProduct: bindActionCreators(updateProduct, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tea);
