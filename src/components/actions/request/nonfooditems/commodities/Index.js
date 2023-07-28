import React, {Component} from 'react';
import AddRequest from './AddRequest';
import NonFoodItemListNav from './NonFoodItemListNav';
import ViewNonFoodRequest from './ViewNonFoodRequest';
import NonFoodAllocate from './NonFoodAllocate';
import NonFoodComposition from './NonFoodComposition';
import NonFoodRelease from './NonFoodRelease';
import EditNonFood from './EditNonFood';
import EditRIS from '../EditRIS';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';
//import axios from '../../../../../axios';
export default class Index extends Component{

    constructor(props) {
        super(props);
        this.state = {
          commodities:[],
          ris_id:'',
        };
    }

    
    componentDidMount() {
      var role = localStorage.getItem('roleDesig');
      var username = localStorage.getItem('react-username');
      //console.log(role);
      if(role==='staff'){
        /*axios.get('/api/nonfood').then(res => this.setState({ 
                commodities: res.data.filter(ffp=>{
                return ffp.emp_id===username;
            })  
            }))*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/nonfood`,{
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
                    commodities: validation.filter(ffp=>{
                      return ffp.emp_id===username;
                  })  
                  });
               }
            })
      }else{
        // this.liveTime = setInterval(()=>{
          //axios.get('/api/nonfood')
           // .then(res => this.setState({ commodities: res.data }))
           fetch(`${process.env.REACT_APP_API_PROXY}/api/nonfood`,{
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
                  commodities: validation 
                });
             }
          })
        // }, 2000)
      } 
    } 

    //TrigGer from the AddRequest.js Component
    onAdd = ()=>{
       this.onReload();
       
    }
    
     //Reloads the DaTA froM the DAtabaASe
     onReload =()=>{
        var role = localStorage.getItem('roleDesig');
        var username = localStorage.getItem('react-username');
        //console.log(role+'-'+username);
      this.liveTime = setTimeout(()=>{
         //this.reload();
               if(role==='staff'){
                /*axios.get('/api/nonfood')
                        .then(res => this.setState({ 
                        commodities: res.data.filter(ffp=>{
                            return ffp.emp_id===username;
                        })  
                        }))*/
                        fetch(`${process.env.REACT_APP_API_PROXY}/api/nonfood`,{
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
                                commodities: validation.filter(ffp=>{
                                  return ffp.emp_id===username;
                              })  
                              });
                           }
                        })                
                }else{
                    // this.liveTime = setInterval(()=>{
                      //axios.get('/api/nonfood')
                      //  .then(res => this.setState({ commodities: res.data }))
                      fetch(`${process.env.REACT_APP_API_PROXY}/api/nonfood`,{
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
                              commodities: validation 
                            });
                         }
                      })
                    // }, 2000)
                } 
        }, 2000)
     }

     handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string);
        /*axios.get('/api/nonfood').then(res => 
        this.setState({ 
          commodities: res.data.filter(ffp=>{
            return ffp.ris_id.includes(string);
          })  
        }))*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/nonfood`,{
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
                commodities: validation.filter(ffp=>{
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
              /*axios.get('/api/nonfood').then(res => 
              this.setState({ 
                commodities: res.data.filter(ffp=>{
                  return ffp.ris_id===this.state.ris_id;
                })  
              }))*/
              fetch(`${process.env.REACT_APP_API_PROXY}/api/nonfood`,{
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
                      commodities: validation.filter(ffp=>{
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
                    <Route exact path="/request" render={()=><NonFoodItemListNav handleOnSelect={this.handleOnSelect} handleOnSearch={this.handleOnSearch} onAdd={this.onAdd} commodities  = {this.state.commodities} />}/>
                    <Route exact path="/request/viewnonfood/:id" render={props => <ViewNonFoodRequest onReload={this.onReload} {...props}  />}/>   
                    <Route exact path="/request/nonfoodalloc/:id" render={props => <NonFoodAllocate {...props}  />}/>  
                    <Route exact path="/request/nonfoodcomposition/:id" render={props => <NonFoodComposition {...props}  />}/>  
                    <Route exact path="/request/nonfoodrelease/:id" render={props => <NonFoodRelease {...props}  />}/>   
                    <Route exact path="/request/editRISnf/:id" render={props => <EditRIS {...props}  />}/> 
                    <Route exact path="/request/editnonfood/:id" render={props => <EditNonFood {...props}  />}/>                    
                </Switch>               
            </Router>
        </div>
        
        );
    }
    
}

