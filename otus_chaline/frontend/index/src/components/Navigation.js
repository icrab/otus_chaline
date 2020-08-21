import TreeMenu from 'react-simple-tree-menu';
import React from "react";
import axios from "axios";


class Navigation extends React.Component {
  constructor(props){
    super (props);
    this.state = {data: null}
  }

  mapResponseToMenu(result_data) {
    let nav_data = {
      'grade': {
        label: 'Чай',
        index: 0,
        nodes : {}
      }
    }
    result_data.map((data) => {
      nav_data.grade.nodes[data.type] = {
        label:  data.string_type
      }
    })
    this.setState({data: nav_data})

  }

  componentDidMount(){
    const url = 'http://127.0.0.1:8000/api/grade/'
    axios.get(url)
      .then(res => {
        this.mapResponseToMenu(res.data)
      })
  }

  render(){
    return (
      <TreeMenu
      data={this.state.data}
      cacheSearch
      debounceTime={125}
      disableKeyboard={false}
      hasSearch={false}
      onClickItem={function noRefCheck(){}}
      resetOpenNodesOnDataUpdate={false}
      />)
  }
}

export default Navigation
