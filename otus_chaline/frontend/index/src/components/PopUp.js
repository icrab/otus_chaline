import React from "react";
import ReactDOM from 'react-dom';
import OrderWidget from './Order/OrderWidget'
import LoginWidget from './User/LoginWidget'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleLogin, toggleOrder } from '../actions/popup'

class PopUp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }


 handleClickOutside = event => {
     const domNode = ReactDOM.findDOMNode(this);
     const toggleOrder = this.props.toggleOrder;
     const toggleLogin = this.props.toggleLogin;

     if (!domNode || !domNode.contains(event.target)) {
        //toggleOrder();
        //toggleLogin();
     }
  }


  render(){
    return (
      <div className="popup">
        {this.props.popup.orderVisible && <OrderWidget/>}
        {this.props.popup.loginVisible && <LoginWidget/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    popup: state.popup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLogin: bindActionCreators(toggleLogin, dispatch),
    toggleOrder: bindActionCreators(toggleOrder, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
