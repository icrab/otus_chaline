import React from "react";
import axios from "axios";

class SinglePageTea extends React.Component {
  constructor(props){
    super (props);
    this.state = {appReady: false}
  }

  componentDidMount(){
    const url = 'http://127.0.0.1:8000/api/tea/' + this.props.match.params.id
    axios.get(url)
      .then(res => {
        this.setState({tea : res.data, appReady: true})
      })

  }

  render() {
      if (this.state.appReady) {
        const detail = (
        <div className="card col">
          <img className="card-img-top" src={this.state.tea.img} alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">{this.state.tea.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{this.state.tea.grade.name}</h6>
            <p className="card-text"></p>
          </div>
        </div>
    )
        return detail;
      } else {
        return (<div/>)
      }
  }
}

export default SinglePageTea
