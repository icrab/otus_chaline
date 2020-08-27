import React from "react";
import axios from "axios";
import HistoryTea from "./HistoryTea"

class History extends React.Component {
  constructor(props) {
    super (props);
  }

  render() {
    console.log(this.props.order)
    const date = new Date(this.props.order.date).toLocaleDateString();
    return (
        <div className="history order card col">
          <div className="card-body">
            {this.props.order.products.map(product=> {
              return <HistoryTea key={product.tea.id} tea={product.tea} count={product.count}/>
            })}
            <span>Дата: {date}</span><br/>
            <span>Итог: {this.props.order.total_cost}</span>
          </div>
        </div>
    )
  }
}

export default History;
