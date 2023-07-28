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
          
          const myId = this.props.location.myId;
          const arr = this.props.match.params.id.split('-');
          //console.log(arr[0]+" and "+arr[1]);

            const composition = {
              production_id: arr[0],
              purchase_id: arr[1]
            }
            //console.log(composition);
           /* axios.post('/api/kitcomposition', composition)
            .then(res => {
              this.setState({alert_message:"success"})
              this.liveRedirectTime = setTimeout(()=>{ 
                //this.setState({alert_message:''})
                this.props.history.push(`/foodpacks/viewkitproduction/`+ myId)
              }, 2000);
            }).catch(error=>{
            this.setState({alert_message:"error"})
            });*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/kitcomposition`,{
              mode:'cors',
              method: 'POST',
              headers: {
                "Content-Type" : "application/json",
                "accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}` 
              },
                 body: JSON.stringify(composition)
               }).then(async response => {
                 if (!response.ok) {
                 const validation = await response.json();
                 //console.log(validation.errors);
                 this.setState({alert_message:"error"})
               }else{
                //history('/categories')
                //const validation = await response.json();
                this.setState({alert_message:"success"})
                this.liveRedirectTime = setTimeout(()=>{ 
                  //this.setState({alert_message:''})
                  this.props.history.push(`/foodpacks/viewkitproduction/`+ myId)
                }, 2000);
               }
            })
      }
    render(){
      return(
        <div>
            {this.state.alert_message=="success"?<SuccessAlert/>:null}
            {this.state.alert_message=="error"?<ErrorAlert/>:null}
            
            {/**
             <Link to={this.props.location.state.from}>
              Back
            </Link>
             */}
        </div>
      );
    }
  }

export default ViewResult;