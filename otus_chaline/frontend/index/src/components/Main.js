import React from "react";
import axios from "axios";
import Tea from "./Tea/Tea";
import { connect } from "react-redux";

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
    if (this.state.appReady && this.props.auth.isAuthenticated){
      return (
        <div className="main">
          { this.state.teas.map(tea => {
              const product_in_order = this.props.order.products.filter((product) => product.tea.id === tea.id)
              if (product_in_order.length != 0){
                return <Tea key={tea.id} tea={tea} in_order={true}/>
              } else {
                return <Tea key={tea.id} tea={tea} in_order={false}/>
              }
            })
          }
        </div>
      )
    } else if (this.state.appReady && !this.props.auth.isAuthenticated){
      return (
        <div className="main">
          { this.state.teas.map(tea => {
              return <Tea key={tea.id} tea={tea} in_order={false}/>
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
    order: state.order,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Main);
