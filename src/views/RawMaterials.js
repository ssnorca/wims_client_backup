import React, {Component} from 'react';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import ListRawMaterials from '../components/actions/rawmaterials/ListRawMaterials';
class RawMaterials extends Component{
    render(){
      return(
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="List of Raw Materials" subtitle="Non-Food Items for Distribution" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>
            <Row>
                <Col lg="12">
                  <ListRawMaterials/>
                </Col>          
            </Row>         
        </Container>
          
      );
    }
  }

export default RawMaterials;