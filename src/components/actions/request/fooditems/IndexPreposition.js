import React, {Component} from 'react';
import Food from './Food';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import IndexContainerView from './IndexContainerView';
import ModalFoodRelease from './releases/ModalFoodRelease';
import ModalFoodAllocate from './allocate/ModalFoodAllocate';
import ViewResult from './allocate/ViewResult';
import EditRIS from './EditRIS';
import axios from 'axios';
import ModalFoodPackStatus from './releases/ModalFoodPackStatus';
//import axios from '../../../../axios';
class IndexPreposition extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isShow: true,
          requests:[],
          foods:[],
          allocate:[],
          ris_id:'',
        };
    }  
    addRequest = (ffprequest)=>{
        //console.log(ffprequest);
        /*axios.post('/api/requestfood', ffprequest)
        .then(res => { 
            this.setState({ foods: [...this.state.foods, res.data] }) 
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood`,{
          mode:'cors',
          method: 'POST',
          headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem('token')}` 
          },
            body: JSON.stringify(ffprequest)
          }).then(async response => {
            if (!response.ok) {
            const validation = await response.json();
            console.log(validation.errors);
            this.setState({alert_message:"error"})
          }else{
            //history('/categories')
            const validation = await response.json();
            this.setState({ foods: [...this.state.foods, validation] }) 
            //console.log(validation)
          }
        })

    }
    
    //TrigGer from the AddRequest.js Component
    onAdd = ()=>{
       this.onReload();
    }
  
    //Reloads the DaTA froM the DAtabaASe
    onReload =()=>{
     var role = localStorage.getItem('roleDesig');
     var username = localStorage.getItem('react-username');
     //console.log(role);
     //console.log(username);
     this.liveTime = setTimeout(()=>{
        //this.reload();
        if(role==='staff'){
          // this.liveTime = setInterval(()=>{
            /*axios.get('/api/requestfood')
            .then(res => this.setState({ 
              foods: res.data.filter(ffp=>{
                return ffp.emp_id===username;
              })  
            }))*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood`,{
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
                    foods: validation.filter(ffp=>{
                      return ffp.emp_id===username;
                    })  
                  });
               }
            })
          // }, 2000)
        }else{
          // this.liveTime = setInterval(()=>{
            /*axios.get('/api/requestfood')
            .then(res => this.setState({ 
              foods: res.data 
            }))*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood`,{
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
                    foods: validation 
                  });
               }
            })
          // }, 2000)
        }
      }, 2000)
    }
    componentDidMount() {
      
      
      var role = localStorage.getItem('roleDesig');
      var username = localStorage.getItem('react-username');
      //console.log(role);
      if(role==='staff'){
        // this.liveTime = setInterval(()=>{
          /*axios.get('/api/requestfood')
          .then(res => this.setState({ 
            foods: res.data.filter(ffp=>{
              return ffp.emp_id===username;
            })  
          }))*/
          fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood`,{
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
                  foods: validation.filter(ffp=>{
                    return ffp.emp_id===username;
                  })  
                });
             }
          })
        // }, 2000)
      }else{
        // this.liveTime = setInterval(()=>{
          /*axios.get('/api/requestfood')
          .then(res => this.setState({ 
            foods: res.data 
          }))*/
          fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood`,{
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
                  foods: validation 
                });
             }
          })
        // }, 2000)
      }
       
        
    }
    handleOnSearch = (string, results) => {
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.
      console.log(string);
      /*axios.get('/api/requestfood').then(res => 
      this.setState({ 
        foods: res.data.filter(ffp=>{
          return ffp.ris_id.includes(string);
        })  
      }))*/
      fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood`,{
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
              foods: validation.filter(ffp=>{
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
          /*axios.get('/api/requestfood').then(res => 
          this.setState({ 
            foods: res.data.filter(ffp=>{
              return ffp.ris_id===this.state.ris_id;
            })  
          }))*/
          fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood`,{
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
                  foods: validation.filter(ffp=>{
                    return ffp.ris_id===this.state.ris_id;
                  }) 
                });
             }
          })
        }   
    }
      componentWillUnmount(){
        //console.log('index unmounted');
        /*const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        axios.get('/api/requestfood', {
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
            <Router basename={'/whims'}>                                                   
                <Switch>
                    <Route exact path="/request" render={()=><Food handleOnSelect={this.handleOnSelect} handleOnSearch={this.handleOnSearch} onAdd={this.onAdd} onAllocate = {this.props.onAllocate} requests  = {this.state.foods} />}/>
                    <Route exact path="/request/allocate/:id" render={props => <ModalFoodAllocate {...props} onAllocate_  = {this.state.requests} onReload={this.onReload} /*request_ffp  = {this.state.requests}*/ />}/>
                    <Route exact path="/request/viewresult/" render={props => <ViewResult {...props} viewresult={this.state.viewresults} allocate  = {this.state.allocate} />}/>
                    <Route exact path="/request/viewrequest/:id" render={props => <IndexContainerView {...props} onAllocate={this.props.onAllocate} print  = {this.state.requests} onAdd={this.onAdd}/>}/>
                    <Route exact path="/request/release/" render={props => <ModalFoodRelease {...props} onRelease  = {this.state.requests} onReload={this.onReload} />}/>
                    <Route exact path="/request/status/" render={props => <ModalFoodPackStatus {...props} onReload={this.onReload}/>}/>
                    <Route exact path="/request/editRIS/:id" render={props => <EditRIS {...props} onAdd={this.onAdd} />}/>
                </Switch>
            </Router> 
        </div>
      );
    }
  }

export default IndexPreposition;