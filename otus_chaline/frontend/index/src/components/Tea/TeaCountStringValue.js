import React from "react";

class TeaCountStringValue extends React.Component {
  constructor(props){
    super (props);
  }

  render() {
    let type_string = ''
    let type_value = this.props.count
    if (this.props.type == 0) {
      type_string = 'гр.'
      type_value = this.props.count * 50;
    } else {
      type_string = 'шт.'
    }
    return (<span>{type_value} {type_string}</span>)
  }
}

export default TeaCountStringValue;
