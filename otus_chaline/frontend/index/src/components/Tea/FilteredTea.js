import React from "react";
import API from '../../utils/API'
import Teas from "./Teas";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class FilteredTea extends React.Component {
  constructor(props){
    super (props);
    this.state = {appReady: false}
  }

  componentDidMount(){
    const url = 'api/grade/' + this.props.match.params.id
    API.get(url)
      .then(res => {
        this.setState({teas : res.data.tea, appReady: true})
      })

  }

  render() {
    if (this.state.appReady){
      return (<Teas teas={this.state.teas}/>)
      } else {
      return (<div/>)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(FilteredTea);
