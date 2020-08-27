import React from "react";
import API from '../../utils/API'

class History extends React.Component {
  constructor(props) {
    super (props);
    this.state = {appReady: false};
  }

  componentDidMount(){
    const url = 'api/order/history/';
    const headers = { headers : { 'Authorization': `Token ${this.props.auth.token}` } }

    API.get(url, headers)
      .then(result =>{
        this.setState({appReady: true, history: result.data})
      })
      .catch(err => {
        alert('failed')
      })

  }
  render() {
    if (this.state.appReady){
      return (<div/>)
      } else {
      return (<div/>)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};


export default connect(mapStateToProps)(History);
