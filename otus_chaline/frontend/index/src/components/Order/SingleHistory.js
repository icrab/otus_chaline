import React from "react";
import axios from "axios";

class History extends React.Component {
  constructor(props) {
    super (props);
    this.state = {appReady: false};
  }

  componentDidMount(){
    const url = 'http://127.0.0.1:8000/api/order/history/';
    const headers = { headers : { 'Authorization': `Token ${this.props.auth.token}` } }

    axios.get(url, headers)
      .then(result =>{
        console.log(result.data)
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
