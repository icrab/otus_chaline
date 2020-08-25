import React from "react";
import axios from 'axios';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logIn, logOut } from '../../actions/auth'
import { createOrder } from '../../actions/order'


class LoginWidget extends React.Component {
  constructor(props) {
    super(props);
    const { isAuthenticated, token } = props;
    this.state = {
                  login: '',
                  password: '',
                  appLoaded: false,
                  isAuthenticated: isAuthenticated,
                  token: token,
                }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event){
    this.setState({login: event.target.value});
  }
  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  getCurrentOrder = (token) => {
    const url = 'http://127.0.0.1:8000/api/order/'
    const headers = { headers : { 'Authorization': `Token ${token}` } }
    const createOrder = this.props.createOrder;
    axios.get(url, headers)
      .then(res => {
        const order = res.data
        const product_count = order.product.length;
        const products = order.product;
        createOrder(order.id, product_count, products)
      })
      .catch(error => console.log(error.message))
  }

  logIn = () => {
    event.preventDefault();
    const url = 'http://127.0.0.1:8000/api/auth/login/';
    const data = {
      username: this.state.login,
      password: this.state.password
    }
    const logIn = this.props.logIn;

    axios.post(url, data)
      .then(result =>{
        this.getCurrentOrder(result.data.token)
        logIn(result.data.token)
      })
      .catch(err => {
        console.log(err)
        alert('auth failed')
      })
  }

  render() {
    const loginForm = (
        <form className="card">
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" value={this.state.login} onChange={this.handleUsernameChange}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
          <button className="btn btn-primary" onClick={this.logIn}>Login</button>
        </form>
      )

    return (
          <div className="login-popup mx-auto text-center p-1">
            {loginForm}
          </div>
        );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: bindActionCreators(logIn, dispatch),
    logOut: bindActionCreators(logOut, dispatch),
    createOrder: bindActionCreators(createOrder, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget);
