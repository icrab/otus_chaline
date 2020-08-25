import React from "react";
import axios from "axios";
import Teas from "./Tea/Teas";

class Main extends React.Component {
  constructor(props) {
    super (props);
    this.state = {appReady: false};
  }

  componentDidMount(){
    const url = 'http://127.0.0.1:8000/api/tea/';

    axios.get(url)
      .then(result =>{
        this.setState({appReady: true, teas: result.data})
      })
      .catch(err => {
        alert('failed')
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

export default Main;
