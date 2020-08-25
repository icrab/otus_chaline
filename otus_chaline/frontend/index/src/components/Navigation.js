import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import { NavLink, withRouter } from "react-router-dom";

class Navigation extends React.Component {
  constructor(props){
    super (props);
    this.state = {grades: null, visible:false}
  }

  componentDidMount(){
    document.addEventListener('click', this.handleClickOutside, true);

    const url = 'http://127.0.0.1:8000/api/grade/'
    axios.get(url)
      .then(res => {
        this.setState({grades: res.data})
      })
  }

componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
}

handleClickOutside = event => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
        this.setState({
            visible: false
        });
    }
}

dropRightVisibleToogle = () => {
  this.state.visible ? this.setState({visible: false}) : this.setState({visible: true})
}

render(){
   const Grade = (props) => {
     const link = '/grade/' + props.id;
     return (
       <NavLink className="dropdown-item" to={link}>{props.name}</NavLink>
     )
   }

   let DropRightMenu = () => {
       return (
            <div className="dropdown-menu">
             {
               this.state.grades.map(grade => {
                   return <Grade key={grade.id} id={grade.id} name={grade.string_type} />
               })
             }
           </div>
         )
     }

     if (this.state.visible) {
       DropRightMenu = () => {
         return (
              <div className="dropdown-menu show">
               {
                 this.state.grades.map(grade => {
                     return <Grade key={grade.id} id={grade.id} name={grade.string_type} />
                 })
               }
             </div>
           )
       }
   }
   const DropRightMain = () => {
     return (
       <div className="btn-group dropright">
         <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split"
           onClick={this.dropRightVisibleToogle}>
            Сорта
         </button>
          <DropRightMenu/>
       </div>
     )
   }

    if (this.state.grades) {
      return (
        <DropRightMain grades={this.state.grades}/>
      )
    } else {
      return (<div/>)
    }
  }
}

export default withRouter(Navigation)
