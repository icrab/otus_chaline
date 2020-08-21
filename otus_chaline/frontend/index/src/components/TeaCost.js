import React from "react";

class TeaCost extends React.Component {
  constructor(props){
    super (props);
  }

  render() {
      if (this.props.type === 0) {
        return (<h5>{this.props.cost} руб / 50 грамм</h5>)
      } else {
        return (<h5>{this.props.cost} руб / 1 шт. </h5>)
      }
  }
}

export default TeaCost;
