import React from "react";
import { NavLink }  from 'react-router-dom'
import API from '../../utils/API'
import TeaCost from './TeaCost'
import { generateOptionValueArray } from "../../utils/generateOptionValueArray.js"
import TeaCountOptionValue from './TeaCountOptionValue'
import TeaCountStringValue from './TeaCountStringValue'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createOrder, addProduct, updateProduct } from '../../actions/order'

class TeaOrder extends React.Component {
  constructor(props){
    super (props);
    this.state = {product_count: 1}
  }
  handleChangeTeaCount = (event) => {
    this.setState({product_count:event.target.value})
  }

  addToOrder = () => {
    const url = 'api/order/'
    const headers = { headers : { 'Authorization': `Token ${this.props.auth.token}` } }
    const data = { tea: this.props.tea.id, count: this.state.product_count }
    const addProduct = this.props.addProduct
    API.post(url, data, headers)
      .then(res => {
        console.log('add', res.data)
        const exist_tea = this.props.order.products.filter(product => product.tea.id == res.data.tea.id )
        exist_tea.length == 0 ? addProduct(res.data) : console.log(false)
      })
  }

  render() {
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
        <div>
          <h5>Товар в корзине</h5>
          <h5>
            Итог: {cost} руб за {<TeaCountStringValue type={this.props.tea.storage_type} count={count}/>}
          </h5>
          <NavLink to={'/order'}><button className="btn btn-primary">Перейти в корзину</button></NavLink>
        </div>
      )
    } else {
        const cost = this.state.product_count * this.props.tea.cost
        return (
          <div>
               <div className="form-group">
                 <select className="form-control" value={this.state.product_count} onChange={this.handleChangeTeaCount}>
                 { gramms.map((gramm, val) => <TeaCountOptionValue key={val} gramm={gramm} val={val} count={this.state.product_count} type={this.props.tea.storage_type}/>) }
                 </select>
               </div>
             <button onClick={this.addToOrder} className="btn btn-primary">Добавить в корзину</button>
          </div>
        )
      }
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order,
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: bindActionCreators(createOrder, dispatch),
    addProduct: bindActionCreators(addProduct, dispatch),
    updateProduct: bindActionCreators(updateProduct, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeaOrder);
