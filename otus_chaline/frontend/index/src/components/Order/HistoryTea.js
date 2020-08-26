import React from "react";
import axios from "axios";
import TeaCountStringValue from "../Tea/TeaCountStringValue"

class HistoryTea extends React.Component {
  constructor(props) {
    super (props);
  }

  render() {
    const cost = this.props.tea.cost * this.props.count;
    return (
        <div className="history-tea">
            <span>{this.props.tea.name} {<TeaCountStringValue type={this.props.tea.storage_type} count={this.props.count}/>} цена {cost}</span>
        </div>
    )
  }
}

export default HistoryTea;
