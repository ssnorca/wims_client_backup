import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Keycloak from 'keycloak-js';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
//axios.defaults.baseURL = 'https://caraga-wims.dswd.gov.ph:8000/';
//keycloak init options
/*
let initOptions = { 
    //url: 'http://auth.caraga.dswd.gov.ph:8080/auth',
    url: 'https://caraga-auth.dswd.gov.ph:8443/auth', 
    realm: 'entdswd.local', 
    clientId: 'crg-drrmd-svr-apps', 
    onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad, 'checkLoginIframe' : false }).success((auth) => {

    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }

    //React Render
    ReactDOM.render(<App />, document.getElementById('root'));

    localStorage.setItem('roleAuth', true);
    localStorage.setItem("react-logout", keycloak.createLogoutUrl());
    localStorage.setItem("react-token", keycloak.token);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken);
    localStorage.setItem("react-username", keycloak.idTokenParsed.name);
    localStorage.setItem("react-givenname", keycloak.idTokenParsed.given_name);
    localStorage.setItem("react-familyname", keycloak.idTokenParsed.family_name);
    localStorage.setItem("react-email", keycloak.idTokenParsed.email);
    localStorage.setItem("react-preferred_name", keycloak.idTokenParsed.preferred_username);
    //console.log(keycloak.idTokenParsed);
    //console.log('url' + keycloak.createLogoutUrl());
    setTimeout(() => {
        keycloak.updateToken(70).success((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).error(() => {
            console.error('Failed to refresh token');
        });


    }, 60000)

}).error(() => {
    console.error("Authenticated Failed");
});
*/
 //React Render
 
 localStorage.setItem('roleAuth', true);
 localStorage.setItem("react-logout", 'https://caraga-auth.dswd.gov.ph:8443/auth/realms/entdswd.local/protocol/openid-connect/logout?redirect_uri=https%3A%2F%2Fcaraga-whims-staging.dswd.gov.ph%2Fwhims%2F');
 //localStorage.setItem("react-token", keycloak.token);
 //localStorage.setItem("react-refresh-token", keycloak.refreshToken);
 localStorage.setItem("react-username", 'Sonny Norca');
 localStorage.setItem("react-givenname", 'Sonny');
 localStorage.setItem("react-familyname", 'Norca');
 localStorage.setItem("react-email", 'sonnynorca@gmail.com');
 localStorage.setItem("react-preferred_name", 'ssnorca');

 //React Render
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
