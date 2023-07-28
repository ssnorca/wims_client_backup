import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import ListProductionItems from './ListProductionItems';
class ListProductionItem extends Component{
  constructor(props) {
    super(props);
  }
 
    render(){
      return(
        <ListProductionItems />
      );
    }
  }

export default ListProductionItem;