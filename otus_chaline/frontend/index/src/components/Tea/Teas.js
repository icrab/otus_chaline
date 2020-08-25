import React from "react";
import axios from "axios";
import Tea from "./Tea";
import { connect } from "react-redux";


class Teas extends React.Component {
  constructor(props) {
    super (props);
  }

  render() {
    if (this.props.auth.isAuthenticated){
      return (
        <div className="main">
          { this.props.teas.map(tea => {
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
      return (
        <div className="main">
          { this.props.teas.map(tea => {
              return <Tea key={tea.id} tea={tea} in_order={false}/>
            })
          }
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Teas);
