import React, {Component} from 'react';
import axios from 'axios';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import {Link} from 'react-router-dom';
//import axios from '../../../../../axios';
class ViewResult extends Component{
    constructor(props) {
        super(props);
        this.state = {
            emp_id:'16-11592',
            alert_message:'',
          };    
      }
      componentDidMount() {
          
        //const { ris_id, prod_id } = this.props.allocate;
        //console.log(this.props.viewresult);     
        /*axios.post('/api/stockpileallocation', this.props.allocate)
        .then(res => {
            this.setState({alert_message:"success"})
        }).catch(error=>{
            this.setState({alert_message:"error"})
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpileallocation`,{
        mode:'cors',
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "accept" : "application/json",
          "Authorization" : `Bearer ${localStorage.getItem('token')}` 
        },
          body: JSON.stringify(this.props.allocate)
        }).then(async response => {
          if (!response.ok) {
          const validation = await response.json();
          console.log(validation.errors);
          this.setState({alert_message:"error"})
        }else{
          //history('/categories')
          //const validation = await response.json();
          this.setState({alert_message:"success"})
          //console.log(validation)
        }
      })

      }
      componentWillUnmount(){
        /*const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        axios.post('/api/stockpileallocation', {
            cancelToken: source.token
          }).catch(function (thrown) {
            if (axios.isCancel(thrown)) {
              console.log('Request canceled', thrown.message);
            } else {
              // handle error
            }
          });*/
     }
    render(){
      return(
        <div>
            {this.state.alert_message=="success"?<SuccessAlert/>:null}
            {this.state.alert_message=="error"?<ErrorAlert/>:null}
            <Link to={'/request'}>
              Back
            </Link>
        </div>
      );
    }
  }

export default ViewResult;