import React, {Component} from 'react';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import ListKits from '../components/actions/kits/ListKits';

class Kits extends Component{
    render(){
      return(
        <Container fluid className="main-content-container px-4">
           <Row noGutters className="page-header py-4">
                <PageTitle title="List of Kits" subtitle="Welfare Good Assembled Kits" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>
            <Row>
                <Col lg="12">
                  <ListKits/>
                </Col>          
            </Row>
          
        </Container>
      );
    }
  }

export default Kits;