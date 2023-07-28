import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardSubtitle,
  CardBody,
  CardFooter,
  Button
} from "shards-react";
import Logout from '../../../../views/Logout';

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      username:'',
      area:'',
      role:'',
      init:0,
      keycloak: null,
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }
  componentDidMount() {
    var username = localStorage.getItem('react-username');
    var designation = localStorage.getItem('roleDesigArea');
    var role = localStorage.getItem('roleDesig');
    //const keycloak = Keycloak(initOptions);
    const logout = localStorage.getItem('react-logout');
    //console.log('u-a ' +logout);
      this.setState({ 
        username: username,
        init:1,
        area: designation,
        role: role,
        keycloak: logout,
      });
      
  }

  render() {
    const { username, area, role } = this.state;
    return this.state.init ? <div>
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-4">
          {/**
           <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/0.jpg")}
            alt="User Avatar"
          /> 
           */}<i className="material-icons">face</i>{" "}
          <span className="d-none d-md-inline-block">{username}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible} style={{ width: "200%", marginRight:"-70px" }}>
        <DropdownItem>
            {/*<i className="material-icons">&#xE896;</i> {area}*/}
            <Card >
              {/*<CardHeader>Account Details</CardHeader>
              <hr/>
              <CardImg src="https://place-hold.it/300x200" />*/}
              <CardBody style={{ textAlign:"center" }}>
                <CardTitle>
                {username}
                </CardTitle><br/>
                <CardSubtitle>{area} <span style={{ marginLeft:"3px", fontStyle:"italic" }}>({role})</span></CardSubtitle>
                <span>Area Designation</span>
                
              </CardBody>
              
              <CardFooter style={{ backgroundColor: "#fbfbfb"}}> <i className="material-icons">&#xE7FD;</i> <Logout keycloak={this.state.keycloak}/></CardFooter>
            </Card>
          </DropdownItem>
       {/**    <DropdownItem tag={Link} to="/">
            <i className="material-icons">&#xE7FD;</i> 
            <Logout keycloak={this.state.keycloak}/>
          </DropdownItem>
         
          <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/" className="text-danger">
            <Logout keycloak={this.state.keycloak}/>
          </DropdownItem>*/}
        </Collapse>
      </NavItem>
      </div> : <div>loading...</div>;
  }
}
