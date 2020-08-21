import React from "react";
import axios from "axios";
import Tea from "./Tea";
import { connect } from "react-redux";

class FilteredTea extends React.Component {
  constructor(props){
    super (props);
    this.state = {appReady: false}
  }

  componentDidMount(){
    const url = 'http://127.0.0.1:8000/api/grade/' + this.props.match.params.id
    console.log(url)
    axios.get(url)
      .then(res => {
        this.setState({teas : res.data.tea, appReady: true})
      })

  }

  render() {
    if (this.state.appReady){
      console.log(this.state.teas)
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
    } else {
      return(<div/>)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order
  };
};

export default connect(mapStateToProps)(FilteredTea);
