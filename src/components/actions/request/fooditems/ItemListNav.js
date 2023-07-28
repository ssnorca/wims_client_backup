import React, {Component} from 'react';
import { Card, Nav, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleCarry,
  faWarehouse
} from "@fortawesome/free-solid-svg-icons";
export default class ItemListNav extends Component{
    getstyle =() =>{
        return{
            marginLeft:'1px',
            borderBottom: '1px solid #dbedff',
            padding:'.75em',
            background:this.props.requests.pending ?
            '#fafafa':'ffffff'
        }
    }
    text_truncate = (str, length, ending) =>{
        if (length == null) {
          length = 100;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
      }
    onSplit = (param)=>{
      if (param != null) {
        const arr = param.split('.');
        return arr[0] + "% complete";
      } else {
        return 0;
      }
      
    } 
    render(){
        const { ris_id, purpose, percentage, date_request, quantity_requested, quantity_released, pending } = this.props.requests;
    return(
        <React.Fragment>
                <Row style={this.getstyle()}>
                    <Col xs={2}><p style={{fontSize:'15px', fontWeight:'bold'}}>{ris_id}</p></Col>
                    <Col xs={5}><p style={{fontSize:'15px', fontWeight:'bold', color:'#17a2b8'}}>
                      <a href='#' id='view' onClick={this.props.onListView.bind(this, this.props.requests)} >
                        {this.text_truncate(purpose,50,'...')}
                      </a></p>
                    </Col>
                    <Col xs={2}><p>{date_request}</p></Col>               
                    <Col>
                      <Nav className="ml-auto">
                        <Nav.Item >
                          <Nav.Link>
                            <FontAwesomeIcon icon={faWarehouse} />
                            <span id='allocate' onClick={this.props.onOpenModal.bind(this)} href='#'> Allocate</span>
                            <p style={{fontSize:'15px', fontWeight:'bold'}}>{this.onSplit(percentage)}</p>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                          <Nav.Link>   
                            <FontAwesomeIcon icon={faPeopleCarry} />                         
                            <span id='release' onClick={this.props.onOpenModal.bind(this)} href='#'> Release</span>
                            <p style={{fontSize:'15px', fontWeight:'bold'}}>{this.onSplit(percentage)}</p>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                       
                    </Col>
                </Row>
        </React.Fragment>
        );
    }
    
}

