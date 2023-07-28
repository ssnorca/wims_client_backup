import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
class Logout extends Component {

  logout() {
    this.props.history.push('/');
    localStorage.clear();
    //var logout = localStorage.getItem('react-logout');
    //var logout = 'https://caraga-auth.dswd.gov.ph:8443/auth/realms/entdswd.local/protocol/openid-connect/logout?redirect_uri=http%3A%2F%2Fcaraga-whims-staging.test%2Fwhims%2F'
    //window.location.replace('http://auth.caraga.dswd.gov.ph:8080/auth/realms/entdswd.local/protocol/openid-connect/logout?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F')
    window.location.replace('https://caraga-auth.dswd.gov.ph:8443/auth/realms/entdswd.local/protocol/openid-connect/logout?redirect_uri=https%3A%2F%2Fcaraga-whims-staging.dswd.gov.ph%2F')
    //console.log(this.props.keycloak);
    /*axios.post('/api/logout')
    .then(res => { 
        console.log(res);
    });*/
  }

  render() {
    return (
      <a href="#" onClick={ () => this.logout() }>
        Logout
      </a>
    );
  }
}
export default withRouter(Logout);
