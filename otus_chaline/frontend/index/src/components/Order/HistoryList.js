import React from "react";
import axios from "axios";
import History from "./History"
import { connect } from "react-redux";

class HistoryList extends React.Component {
  constructor(props) {
    super (props);
    this.state = {appReady: false};
  }

  componentDidMount(){
    const url = 'http://127.0.0.1:8000/api/order/history/';
    const headers = { headers : { 'Authorization': `Token ${this.props.auth.token}` } }

    axios.get(url, headers)
      .then(result =>{
        this.setState({appReady: true, history: result.data})
      })
      .catch(err => {
        alert('failed')
      })

  }
  render() {
    if (this.state.appReady){
      return (
          <div className="main">
            {
              this.state.history.map((order, num)  => {
                return <History key={num} id={num} order={order}/>
              })
            }
          </div>
        )
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


export default connect(mapStateToProps)(HistoryList);
