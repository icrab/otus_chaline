import React from 'react';
import { withRouter } from 'react-router';
import { NavLink }  from 'react-router-dom'
import { connect } from "react-redux";
import API from '../utils/API'
import { bindActionCreators } from "redux";
import { logOut } from '../actions/auth'
import { toggleLogin, toggleOrder } from '../actions/popup'
import { deleteOrder } from '../actions/order'

class Header extends React.Component {
    constructor(props) {
      super(props)
    }
  toggleOrder = () => {
    const toggleOrder = this.props.toggleOrder;
    toggleOrder();
  }

  toggleLogin = () => {
    const toggleLogin = this.props.toggleLogin;
    toggleLogin();
  }

  logOut = () => {
    event.preventDefault();
    const logOut = this.props.logOut;
    const deleteOrder = this.props.deleteOrder;
    const url = 'api/auth/logout/';
    const data = {}
    let headers = {
      headers: {
        'Authorization': `Token ${this.props.auth.token}`
      }
    }
    let res = API.post(url, data, headers)
    deleteOrder()
    logOut()
    this.props.history.push('/')
  }

  render(){
    if (this.props.auth.isAuthenticated){
      return (
        <header>
          <nav className="navbar navbar-light bg-light">
              <ul className="navbar-nav">
                <li className="nav-item mr-2"><NavLink exact className="nav-link" to='/'>Главная</NavLink></li>
                <li className="nav-item mr-2"><NavLink exact className="nav-link" to='/contacts'>Контакты</NavLink></li>
                <li className="nav-item mr-2"><NavLink exact className="nav-link" to='/about'>О нас</NavLink></li>
                <li className="nav-item mr-2"><NavLink exact className="nav-link" to='/history'>История заказов</NavLink></li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item mr-2"><button id="order" className="btn btn-outline-primary my-2 my-sm-0" onClick={this.toggleOrder}>Заказ</button></li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item mr-2"><button className="btn btn-outline-primary my-2 my-sm-0" onClick={this.logOut}>Выход</button></li>
              </ul>
          </nav>
        </header>
      )
    } else {
      return (
        <header>
          <nav className="navbar navbar-light bg-light">
              <ul className="navbar-nav">
                <li className="nav-item mr-2"><NavLink exact className="nav-link" to='/'>Главная</NavLink></li>
                <li className="nav-item mr-2"><NavLink exact className="nav-link" to='/contacts'>Контакты</NavLink></li>
                <li className="nav-item mr-2"><NavLink exact className="nav-link" to='/about'>О нас</NavLink></li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item mr-2"><button id="login" className="btn btn-outline-primary my-2 my-sm-0" onClick={this.toggleLogin}>Войти</button></li>
                <li className="nav-item mr-2"><button className="btn btn-outline-primary my-2 my-sm-0">Регистрация</button></li>
              </ul>
          </nav>
        </header>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order,
    auth: state.auth,
    popup: state.popup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: bindActionCreators(logOut, dispatch),
    toggleLogin: bindActionCreators(toggleLogin, dispatch),
    toggleOrder: bindActionCreators(toggleOrder, dispatch),
    deleteOrder: bindActionCreators(deleteOrder, dispatch),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
