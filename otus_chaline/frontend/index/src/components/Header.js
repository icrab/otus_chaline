import React from 'react';
import { NavLink }  from 'react-router-dom'
import { connect } from "react-redux";
import axios from "axios";
import { bindActionCreators } from "redux";
import { logOut } from '../actions/auth'
import OrderWidget from './OrderWidget'

class Header extends React.Component {
    constructor(props) {
      super(props)
    }

    logout = async () => {
      event.preventDefault();
      const url = 'http://127.0.0.1:8000/api-token/logout/';
      const data = {}
      let headers = {
        headers: {
          Authorization: `Token ${this.props.token}`
        }
      }
      const logOut = this.props.logOut;
      let res = await axios.post(url, data, headers)
      logOut(null)
    }
  render(){
    if (this.props.isAuthenticated){
      return (
        <header>
          <nav>
            <ul className="nav-ul">
              <li><NavLink activeClassName="selected" to='/'>Home</NavLink></li>
              <li><NavLink activeClassName="selected" to='/token'>Token</NavLink></li>
              <li><NavLink activeClassName="selected" to='/my_courses'>My courses</NavLink></li>
            </ul>
          </nav>
          <button className="btn btn-primary" onClick={this.logout}>Log out</button>
        </header>
      )
    } else {
      return (
        <header>
          <nav>
            <ul className="nav-ul">
              <li><NavLink activeClassName="selected" to='/'>Главная</NavLink></li>
              <li><NavLink activeClassName="selected" to='/login'>Войти</NavLink></li>
              <li><NavLink activeClassName="selected" to='/register'>Регистрация</NavLink></li>
              <li><NavLink activeClassName="selected" to='/order'>Заказ</NavLink></li>
            </ul>
            <OrderWidget/>
          </nav>
        </header>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order
  };
};

export default connect(mapStateToProps)(Header);
