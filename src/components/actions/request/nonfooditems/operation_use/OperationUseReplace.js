import React, {Component} from 'react';
import { Row, Col, Container, Table, Button, Card, Form } from 'react-bootstrap';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import Pagination from "react-js-pagination";
import axios from 'axios';
//import axios from '../../../../../axios';
class OperationUseReplace extends Component{
    constructor (props){
        super(props);
        this.state = {
          transactionId:'',
          wasteId:'',
          purchaseId:'',
          item:[],
          ctype:'',
          particular:'',
          description:'',
          cquantity:'',
          activePage:1,
          itemsCountPerPage:1,
          pageRangeDisplayed:3,
          totalItemsCount:1
        };
      }
    componentDidMount() {
        const itemId = this.props.location.item_id; 
        const itemName = this.props.location.type;
        const itemParticular = this.props.location.particular;
        const itemQuantity = this.props.location.quantity;
        const myId = this.props.match.params.id;
        //console.log(itemName+':'+ myId)
        
        /*axios.get('/api/itempurchase/showparticular/'+itemName)
        .then(res => this.setState({ 
          item: res.data.data,
          transactionId:itemId,
          wasteId:myId,
          ctype:itemName,
          particular:itemParticular,
          cquantity:itemQuantity,
          activePage:res.data.current_page,
          itemsCountPerPage:res.data.per_page,
          totalItemsCount:res.data.total
        }))*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/itempurchase/showparticular/`+itemName,{
          mode:'cors',
          method: 'GET',
          headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem('token')}` 
          }
           }).then(async response => {
             if (!response.ok) {
             const validation = await response.json();
             //setErrors(validation.errors);
             console.log(validation.errors);
             this.setState({alert_message:"error"})
           }else{
            //history('/categories')
            const validation = await response.json();
            //console.log(validation)
               this.setState({ 
                item: validation.data,
                transactionId:itemId,
                wasteId:myId,
                ctype:itemName,
                particular:itemParticular,
                cquantity:itemQuantity,
                activePage:validation.current_page,
                itemsCountPerPage:validation.per_page,
                totalItemsCount:validation.total
              });
           }
        })

      }
    onChange = e => {
        this.setState({
        [e.target.name]: e.target.value,
        //result:this.state.aparticular.filter(it => it.particular.includes(e.target.value))
      })
    }
    handleAllocate = (id, desc) =>{
    console.log(id+ desc)
      this.setState({
        purchaseId: id,
        description: desc
      })
  
    }
    onBack = e =>{
      e.preventDefault();
      const { transactionId } = this.state; 
      this.props.history.push(`/request/forcondition/`+transactionId)
    }
    onAdd = e => {
      const { purchaseId, wasteId, transactionId } = this.state; 
      console.log( purchaseId, wasteId, transactionId);
      const replacement = {
        stockpile_reference_waste_id: Number.parseInt(wasteId, 10),
        purchase_id: Number.parseInt(purchaseId, 10),
      }

      /*axios.post('/api/stockpilereferencewasteReplace/', replacement)
      .then(res => {
        this.setState({alert_message:"success"})
        this.liveRedirectTime = setTimeout(()=>{ 
          //this.setState({alert_message:''})
          this.props.history.push(`/request/forcondition/`+transactionId)
        }, 2000);
      }).catch(error=>{
        this.setState({alert_message:"error"})
      });*/
      fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereferencewasteReplace/`,{
      mode:'cors',
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
      },
         body: JSON.stringify(replacement)
       }).then(async response => {
         if (!response.ok) {
         const validation = await response.json();
         console.log(validation.errors);
         this.setState({alert_message:"error"})
       }else{
        //history('/categories')
        //const validation = await response.json();
        this.setState({alert_message:"success"})
        this.liveRedirectTime = setTimeout(()=>{ 
          //this.setState({alert_message:''})
          this.props.history.push(`/request/forcondition/`+transactionId)
        }, 2000);
       }
    })

    }
    render(){
      const { ctype, particular, description, cquantity, purchaseId } = this.state; 
      return(
        <div>
            <Row>
            <Col sm={9}>
            <Card>
              <Card.Header>Purchased Items</Card.Header>
                  <Card.Body>
              <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Particular</th>
                        <th>Cost</th>
                        <th>Date Expire</th>
                        <th>Quantity Available</th>
                        <th>Description</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.item.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                      <td>{item.id}</td>
                                      <td>{item.particular}</td>
                                      <td>{item.cost}</td>
                                      <td>{item.date_expire}</td>
                                      <td>{item.quantity_available}</td>
                                      <td>{item._description}</td>
                                      <td>
                                        <Button key={item.id} value={item.id} onClick={this.handleAllocate.bind(this, item.id, item._description)}>Select</Button>
                                      </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <div className='d-flex justify-content-center'>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
                  </Card.Body>
                    <Card.Footer className="text-muted">
                        <Button onClick={this.onBack} variant="primary">
                                        Back
                        </Button>
                    </Card.Footer>
                      </Card><br/>
                </Col>
                <Col sm={3}>
                  <Card >
                            <Card.Header className="text-center">Item for Replacement</Card.Header>
                                  <Form.Group as={Col} controlId="formGridApproved">
                                          <Form.Label>Particular</Form.Label>
                                              <Form.Control 
                                                      disabled
                                                      name="ctype" 
                                                      value={ctype}
                                                      onChange={this.onChangeType}>
                                              </Form.Control> 
                                              <Form.Label>Description</Form.Label>
                                              <Form.Control 
                                                      disabled
                                                      name="particular" 
                                                      value={particular}
                                                      onChange={this.onChange}>
                                              </Form.Control>                                                                                
                                              <Form.Label>Quantity Damaged/Wasted</Form.Label>      
                                              <Form.Control 
                                                      disabled
                                                      type="number"
                                                      placeholder="Quantity ex.1000"
                                                      name="cquantity" 
                                                      value={cquantity}
                                                      onChange={this.onChange} />                                                                                  
                                              <Form.Label>To be replaced by</Form.Label>      
                                              <Form.Control 
                                                      required                      
                                                      placeholder="Description ex. Nescafe 3in1 Coffee"
                                                      name="description" 
                                                      value={description}
                                                      onChange={this.onChange} />                                                                                                 
                                  </Form.Group>
                              <Card.Footer className="text-muted">
                                  <Button block onClick={this.onAdd} variant="primary">
                                          Replace Item
                                  </Button>
                              </Card.Footer>
                        </Card><br/>
                      {this.state.alert_message=="success"?<SuccessAlert/>:null}
                      {this.state.alert_message=="error"?<ErrorAlert/>:null}
                </Col>
              </Row>
        </div>
        
      );
    }
  }

export default OperationUseReplace;
