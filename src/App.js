import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getUsersFromApiAsync } from './api';
import myRoute from "./routes";
import withTracker from "./withTracker";
import history from './components/actions/history';
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import axios from 'axios';
//import axios from './axios';
//export default () => (
  class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        employee:[],
        designate:'',
        validity:'',
        init:0,
      }
    }

    async  componentDidMount(){
      /*const response = await fetch('http://localhost:8000/api/employee', {mode:'cors'});
      const data = await response.json();
      this.setState({ 
          employee: data
        })*/


        axios.defaults.withCredentials = true;
        axios.get('sanctum/csrf-cookie').then(response => {
          // Login...
          //console.log(userAccount);
              //1 Login using the email fetch from the keycloak
        const userAccount = {
          email: localStorage.getItem('react-email'),
          password: 'password'
        }
        //console.log(userAccount);
          axios.post('api/login',userAccount).then( res =>{
              //console.log(res);
              //IF user already exist in the database
              if (res.data.status_code===200||res.data.status_code==='200') {
                
               // console.log(res.data);
               const validation = res.data;
               //setErrors(validation.errors);
               //console.log(validation);
               //console.log('GOod');
               const accessToken = res.data.access_token;
               fetch(`${process.env.REACT_APP_API_PROXY}/api/employee`,{
                 mode:'cors',
                 method: 'GET',
                 headers: {
                   "Content-Type" : "application/json",
                   "accept" : "application/json",
                   "Authorization" : `Bearer ${accessToken}`
                 }
                  }).then(async response => {
                    if (!response.ok) {
                    const validation = await response.json();
                    //setErrors(validation.errors);
                    console.log(validation.errors);
                    //this.setState({alert_message:"error"})
                  }else{
                   //history('/categories')
                   const validation = await response.json();
                   var username = localStorage.getItem('react-preferred_name');
                   let res = validation.filter(it => it.username.includes(username));
                   const [{designation, area, valid}] = res;
                   //console.log(validation);
                   
                   const roles = [designation];
                   localStorage.setItem('roleAuth', true);
                   localStorage.setItem('roleDesig', designation);
                   localStorage.setItem('roleDesigArea', area);
                   localStorage.setItem('roleValid', valid);
                   localStorage.setItem("token", accessToken);

                   this.setState({ 
                    employee: validation,
                    designate:designation,
                    validity:valid,
                    init:1,
                  });
                     

                  }
               })
              }

            }).catch((data) => {
              //this.setState({ isLoading: false, downlines: data.response });
              //console.log(data);
              console.log('user doesnot exist');
              this.setState({
                designate:'',
                validity:0,
                init:1,
              });
              localStorage.setItem('roleAuth', false);
              localStorage.setItem('roleValid', 0);
              localStorage.setItem('roleDesig', 0);
            })
        })
      
      
    //2 If the response from the login is true, open the app
    
      }
      validate = () => {
        var username = localStorage.getItem('react-preferred_name');
        if (!this.state.employee.some(item => item.username === username)) {
          return 0;
        }
        return 1;
    };
    render() {
     // console.info(localStorage.getItem('roleDesig'));
      return this.state.init ? <div>
          <Router history={history} basename={"/whims"}>
            <div>
              {myRoute(this.state.designate,this.state.validity,this.state.employee.filter(it => it.username.includes(localStorage.getItem('react-preferred_name')))).map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={`${process.env.PUBLIC_URL}${route.path}`}
                    exact={route.exact}
                    component={withTracker(props => {
                      return (
                        <route.layout {...props}>
                          <route.component {...props} />
                        </route.layout>
                      );
                    })}
                  />
                );
              })}
            </div>
          </Router>
      </div> : <div>loading...</div>;
  }
}
export default App;
