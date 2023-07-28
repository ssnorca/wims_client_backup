import React, {Component} from 'react';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import ListRequest from '../components/actions/request/ListRequest'

export default class Index extends Component{
    render(){
    return(
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="List of Requests" subtitle="Requisition Issue Slip" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>
            <Row>
                <Col lg="12">
                    <ListRequest/>
                </Col>          
            </Row>
        </Container>
        
        );
    }
    
}

