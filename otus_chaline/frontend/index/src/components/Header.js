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
          <nav class="navbar navbar-dark bg-primary">
            <ul className="navbar-nav mr-auto">
              <li><NavLink className="nav-link" activeClassName="selected" to='/'>Home</NavLink></li>
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
          <nav className="navbar navbar-light bg-light">
              <ul className="navbar-nav">
                <li className="nav-item mr-2"><NavLink className="nav-link" to='/'>Главная</NavLink></li>
                <li className="nav-item mr-2"><NavLink className="nav-link" to='/order'>Заказ</NavLink></li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item mr-2"><button className="btn btn-outline-primary my-2 my-sm-0">Войти</button></li>
                <li className="nav-item mr-2"><button className="btn btn-outline-primary my-2 my-sm-0">Регистрация</button></li>
              </ul>
          </nav>
          <OrderWidget/>
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
