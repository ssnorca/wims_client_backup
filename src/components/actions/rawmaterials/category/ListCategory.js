import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import ListCategoryItems from './ListCategoryItems';
//import axios from '../../../../axios';

class ListCategory extends Component{
  constructor(props) {
    super(props);
    this.state = {
      category:[],
    };
  }
  
  componentDidMount() {
    //axios.get('/api/category')
    //    .then(res => this.setState({ category: res.data }))
    fetch(`${process.env.REACT_APP_API_PROXY}/api/category`,{
      mode:'cors',
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
      }
       }).then(async response => {
         if (!response.ok) {
         const validation = await response.json();
         //setErrors(validation.errors);
         console.log(validation.errors);
         this.setState({alert_message:"error"})
       }else{
        //history('/categories')
        const validation = await response.json();
        //console.log(validation)
           this.setState({ 
            category: validation 
          });
       }
    })
  }
    render(){
      return(
        <ListCategoryItems  category = {this.state.category}/>
      );
    }
  }

export default ListCategory;