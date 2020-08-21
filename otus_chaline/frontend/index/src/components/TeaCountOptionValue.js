import React from "react";

class TeaCountOptionValue extends React.Component {
  constructor(props){
    super (props);
  }

  render() {
    let type_string = ''
    this.props.type == 0 ? type_string = 'гр.' : type_string = 'шт.'
      if (this.props.val === this.props.count) {
        return (<option value={this.props.val}>{this.props.gramm} {type_string}</option>)
      } else {
      return (<option value={this.props.val}>{this.props.gramm} {type_string}</option>)
      }
  }
}

export default TeaCountOptionValue;
