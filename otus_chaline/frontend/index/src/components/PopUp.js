import React from "react";
import ReactDOM from 'react-dom';
import OrderPopUp from './Order/OrderPopUp'
import LoginPopUp from './User/LoginPopUp'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideAll } from '../actions/popup'

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
     const hideAll = this.props.hideAll;

     if ( !domNode.contains(event.target) && event.target.id != 'order' && event.target.id != 'login') {
       hideAll()
     }
  }


  render(){
    return (
      <div className="popup">
        {this.props.popup.orderVisible && <OrderPopUp/>}
        {this.props.popup.loginVisible && <LoginPopUp/>}
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
    hideAll: bindActionCreators(hideAll, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
