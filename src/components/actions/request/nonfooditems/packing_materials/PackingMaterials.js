import React, {Component} from 'react';
import AddRequest from './AddRequest';
import { ListGroup } from 'react-bootstrap';
export default class PackingMaterials extends Component{
    render(){
    return(
        <React.Fragment>
                <ListGroup>
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
        </React.Fragment>
        );
    }
    
}

