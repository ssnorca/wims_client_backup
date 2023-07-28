import React from "react";
import {
  Container,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import { Tabs, Tab } from 'react-bootstrap';
import PageTitle from "../components/common/PageTitle";
import UserList from "../components/user-profile-lite/UserList";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import ErrorAlert from '../components/actions/ErrorAlert';
import SuccessAlert from '../components/actions/SuccessAlert';
import axios from 'axios';
import UserProfileInfo from "./UserProfileInfo";
import UserSignatories from "./UserProfileSignatories";

class UserProfileLite extends React.Component {
  constructor(props) {
    super(props);


  }



  render() {
    return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
      </Row>
      <Row>
        <Col lg="12">
      <Tabs variant="tabs" defaultActiveKey="sysusers" id="controlled-tab-example" style={{fontWeight:'bold', color: '#e6ebef'}}>
              <Tab eventKey="sysusers" title="System Users">
                <UserProfileInfo/>
              </Tab>
              <Tab eventKey="signatories" title="System Signatories">
                <UserSignatories/>
              </Tab>
          </Tabs>
          </Col>
      </Row>
    </Container>
  );
  }
}

export default UserProfileLite;
