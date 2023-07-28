import React, {Component} from 'react';
import AddRequest from './AddRequest';
import OperationUse from './OperationUse';
import OperationUseView from './OperationUseView';
import OperationUseforCondition from './OperationUseforCondition';
import OperationUseEdit from './OperationUseEdit';
import OperationUseReplace from './OperationUseReplace';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';
//import axios from '../../../../../axios';
export default class Index extends Component{

    constructor(props) {
        super(props);
        this.state = {
            listData:[],
        }
    }
    componentDidMount(){
      /*axios.get('/api/stockpilereferencelist')
        .then(res =>this.setState({ 
            listData: res.data,
        }));*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereferencelist`,{
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
                listData: validation 
              });
           }
        }) 
    }
    handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        //console.log(string);
        /*axios.get('/api/stockpilereferencelist').then(res => 
        this.setState({ 
            listData: res.data.filter(ffp=>{
            return ffp.ris_id.includes(string);
          })  
        }))*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereferencelist`,{
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
                listData: validation.filter(ffp=>{
                  return ffp.ris_id.includes(string);
                })
              });
           }
        })
      }
      handleOnSelect = (item) => {
        // the item selected
        //console.log(item.ris_id);
        this.setState({ 
          ris_id: item.ris_id
        })
      }
    
      componentDidUpdate(prevProps, prevState) {
          // Typical usage (don't forget to compare props):    
            if(this.state.ris_id !== prevState.ris_id){
              //console.log(this.state.ris_id);
              /*axios.get('/api/stockpilereferencelist')
              .then(res => 
              this.setState({ 
                listData: res.data.filter(ffp=>{
                  return ffp.ris_id===this.state.ris_id;
                })  
              }))*/
              fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereferencelist`,{
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
                      listData: validation.filter(ffp=>{
                        return ffp.ris_id===this.state.ris_id;
                      }) 
                    });
                 }
              })
            }   
        }
    render(){
    return(
        <div>
            <Router basename={'/whims'}>
                <Switch>              
                    <Route exact path="/request" render={()=><OperationUse handleOnSelect={this.handleOnSelect} handleOnSearch={this.handleOnSearch} listData={this.state.listData}/>}/>
                    <Route exact path="/request/forcondition/:id" render={props => <OperationUseforCondition {...props}  />}/>
                    <Route exact path="/request/editwasteditems/:id" render={props => <OperationUseEdit {...props}  />}/>
                    <Route exact path="/request/replacewasteditems/:id" render={props => <OperationUseReplace {...props}  />}/>
                    <Route exact path="/request/viewreplaceditems/:id" render={props => <OperationUseView {...props}  />}/>
                </Switch>
           
                {/**  <AddRequest/>**/}
            </Router>

        </div>
   
        );
    }
    
}

