import React, {Component} from 'react';
import { Container, Button, Link } from 'react-floating-action-button';
import Modal from 'react-responsive-modal';
import { Form, Col, InputGroup } from 'react-bootstrap';

export default class AddRequest extends Component{ state = {
    open: false,
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  
render(){
    const { open } = this.state;
    
return(
    <React.Fragment>
    <Container>
        <Button
            tooltip="New Request"
            icon="fas fa-plus"
            rotate={true}
            onClick={this.onOpenModal} ></Button>
    </Container>
    
    <Modal open={open} onClose={this.onCloseModal} center>
        <h2>Requisition of Family Food Packs</h2>
        <Form>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Purpose</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="ex. For the replenishment of prepositioned goods in ..."
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                    required
                    type="number"
                    placeholder="Quantity of Family Food Packs"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="ex. Cantilan, Surigao del Sur"
                />
                </Form.Group>
            </Form.Row>
            <Button type="submit">Submit</Button>
        </Form>
    </Modal>
    </React.Fragment>
    );
}  
}

