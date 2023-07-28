import React, {Component} from 'react';
import axios from 'axios';
import ErrorAlert from '../../ErrorAlert';
import SuccessAlert from '../../SuccessAlert';
import {Link} from 'react-router-dom';
class ViewResult extends Component{
    constructor(props) {
        super(props);
        this.state = {
            emp_id:'16-11592',
            alert_message:'',
          };    
      }
      componentDidMount() {
          console.log(this.props.location.state.mname)
         // const arr = this.props.match.params.id.split('-');
        //  console.log(arr[0]+" and "+arr[1]);
/*
            const {emp_id} = this.state
            const composition = {
            prod_cat_id: arr[0],
            purchase_id: arr[1],
            emp_id:emp_id
            }
            console.log(composition);
            axios.post('/api/stockpilecomposition', composition)
            .then(res => {
            this.setState({alert_message:"success"})
            }).catch(error=>{
            this.setState({alert_message:"error"})
            });*/
      }
    render(){
      return(
        <div>
            {this.state.alert_message=="success"?<SuccessAlert/>:null}
            {this.state.alert_message=="error"?<ErrorAlert/>:null}
            <Link to={this.props.location.state.from}>
              Back
            </Link>
        </div>
      );
    }
  }

export default ViewResult;