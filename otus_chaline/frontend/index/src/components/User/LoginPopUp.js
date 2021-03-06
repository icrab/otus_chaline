import React from "react";
import API from '../../utils/API'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logIn, logOut } from '../../actions/auth'
import { hideAll } from '../../actions/popup'
import { createOrder } from '../../actions/order'


class LoginPopUp extends React.Component {
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

  getOrderAndPushDataOnRedux = (token) => {
    const url = 'api/order/'
    const headers = { headers : { 'Authorization': `Token ${token}` } }
    const createOrder = this.props.createOrder;
    const logIn = this.props.logIn;
    API.get(url, headers)
      .then(res => {
        const order = res.data
        const product_count = order.products.length;
        const products = order.products;
        createOrder(order.id, product_count, products)
        logIn(token)
      })
      .catch(error => console.log(error))
  }

  logIn = () => {
    event.preventDefault();
    const hideAll = this.props.hideAll;
    hideAll()
    const url = 'api/auth/login/';
    const data = {
      username: this.state.login,
      password: this.state.password
    }

    API.post(url, data)
      .then(result =>{
        this.getOrderAndPushDataOnRedux(result.data.token)
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
    hideAll: bindActionCreators(hideAll, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopUp);
