import React from "react";
import { NavLink }  from 'react-router-dom'
import TeaOrder from './TeaOrder'
import { connect } from "react-redux";

class Tea extends React.Component {
  constructor(props){
    super (props);
  }

  render() {
    const href = '/tea/' + this.props.tea.id;
    const grade_url = '/grade/' + this.props.tea.grade.id;
    return (
        <div className="card col">
          <div className="img-card">
            <img className="card-img-top" src={this.props.tea.img} alt="Card image cap"/>
          </div>
          <div className="card-body">
            <NavLink to={href}><h5 className="card-title">{this.props.tea.name}</h5></NavLink>
            <NavLink to={grade_url} className="card-subtitle mb-2 text-muted">{this.props.tea.grade.type}</NavLink>
            {this.props.auth.isAuthenticated && <TeaOrder tea={this.props.tea} in_order={this.props.in_order}/>}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Tea);
