import React, {Component} from 'react';
import { FormGroup } from "shards-react";
import { Button, Col, Form, Table, Row, Card} from 'react-bootstrap';
//import { FormRadio, Button } from "shards-react";
import Autocomplete from 'react-autocomplete';
import ReactDropdownAutoComplete from 'react-dropdown-autocomplete';
import axios from 'axios';
import ErrorAlert from '../../ErrorAlert';
import SuccessAlert from '../../SuccessAlert';
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Pagination from "react-js-pagination";
//import { confirmAlert } from 'react-confirm-alert'; // Import
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import ConfirmAlert from '../../ConfirmAlert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//import axios from '../../../../axios';
class AddItemPurchase extends Component{
  constructor(props) {
    super(props);

    this.state = {
      cost: '',
      quantity_available:'',
      description:'',
      source:'',
      remarks:'',
      date_received:new Date(),
      date_expire:new Date(),
      item_id:'',
      warehouse_id:'Agusan del Norte',
      items:[],
      product:['Local Purchased','Donation','NROC'],
      editFields:'',
      activePage:1,
      itemsCountPerPage:1,
      pageRangeDisplayed:3,
      totalItemsCount:1,
      value:'',
      alert_message:'',
      purposeErr:'',
      destinationErr: '',
      deliveryErr:'',
      costErr:'',
      mySource:[
        { name: 'Local Purchased' },
        { name: 'NRLMB ' },
        { name: 'Donation: ' }
      ],
      result:[],
      approved_by:'',
      purchase_order:'',
      delivery_receipt:'',
      disabled:false,
    };

    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(date) {
    this.setState({
      startDate: date
    })
  }
  componentDidMount() {          

    /*axios.get('/api/item_page')
    .then(res => this.setState({ 
       items: res.data,
    }));*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/item_page`,{
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
            items: validation 
          });
       }
    })

  }
  onSend = (e) =>{
    e.preventDefault();

    const isValid = this.validate();
    if (isValid) {    
        const {cost, quantity_available, description, source, remarks, date_received, date_expire, item_id, warehouse_id, purchase_order, delivery_receipt} = this.state

        const purchase = {
          cost: cost,
          quantity_available: quantity_available,
          _description:description,
          _source:source,
          remarks:remarks,
          date_received:moment(date_received).format('YYYY-MM-DD'),
          date_expire:moment(date_expire).format('YYYY-MM-DD'),
          item_id:item_id,
          warehouse_id:warehouse_id,
          purchase_order:purchase_order,
          delivery_receipt:delivery_receipt,
        }
        //console.log(purchase);
        this.setState({ 
          disable: true,
       })
        /*axios.post('/api/itempurchase', purchase)
        .then(res => {
          this.setState({alert_message:"success"})
          this.liveRedirectTime = setTimeout(()=>{ 
            //this.setState({alert_message:''})
            this.props.history.push(`/rawmaterials/`)
          }, 2000);
        }).catch(error=>{
          this.setState({alert_message:"error"})
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/itempurchase`,{
          mode:'cors',
          method: 'POST',
          headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem('token')}` 
          },
            body: JSON.stringify(purchase)
          }).then(async response => {
            if (!response.ok) {
            const validation = await response.json();
            console.log(validation.errors);
            this.setState({alert_message:"error"})
          }else{
            //history('/categories')
            //const validation = await response.json();
            this.setState({
              alert_message:"success",
              disable: false,
          })
            this.liveRedirectTime = setTimeout(()=>{ 
              //this.setState({alert_message:''})
              this.props.history.push(`/rawmaterials/`)
            }, 2000);
          }
        })


    }

  }
  
  onChange = e => {this.setState({
      [e.target.name]: e.target.value 
    })
    //console.log(this.state);
  }
  handleOnSelect = (id, name) =>{
    //window.confirm('Selected ' + name);
    confirmAlert({

      title: name,
      message: 'Confirm Selection',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.setState({
            item_id: id,
            description: name
          })
        }
      ]
    });

  }

  handleOnSource = (e) =>{
    this.setState({
      source: e 
    })
  
  }

  handleExpire = date => {
    //var today = new Date(),
           // date = dateFormat(date, "yyyy-mm-dd");
           
    this.setState({
      date_expire: date
    });
    //console.log(this.state);
  };

  handleAcquire = date => {
    this.setState({
      date_received: date
    });
    //console.log(this.state);
  };
  handlePageChange = (pageNumber) => {
    //console.log(pageNumber);
    //this.setState({activePage: pageNumber});
    /*axios.get('/api/item_page?page='+pageNumber)
        .then(res => this.setState({
            items: res.data.data,
            result: res.data.data,
            activePage:res.data.current_page,
            itemsCountPerPage:res.data.per_page,
            totalItemsCount:res.data.total
        }))*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/item_page?page=`+pageNumber,{
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
                items: validation.data,
                result: validation.data,
                activePage: validation.current_page,
                itemsCountPerPage: validation.per_page,
                totalItemsCount: validation.total
              });
           }
        })
        
  }

  handleOnApproved = (e) =>{
        
    //const res = this.state.signatories.filter(it => it.name.includes(e));
    //const [{name, id}] = this.state.signatories.filter(it => it.name.includes(e));
    //console.log(this.state.signatories.filter(it => it.name.includes(e)));
    //console.log(e);
    this.setState({
        approved_by: e,
        result:this.state.items.filter(it => it.name.includes(e))
        //approved_id: this.state.signatories.filter(it => it.name.includes(e))
    })
  
  }

  validate = () => {
        let purposeErr = '';
        let destinationErr = '';
        let costErr = '';
        let deliveryErr = '';
        if (!this.state.source) {
          purposeErr = "Source cannot be Empty";
          //return false;
        }
        if (!this.state.quantity_available) {
          destinationErr = "Quantity cannot be Empty";
          //return false;
        }
        if(!this.state.cost){
          costErr = "Cost cannot be Empty";
        }
        if(!this.state.delivery_receipt){
          deliveryErr = "Delivery Receipt cannot be Empty";
        }
        if (purposeErr || destinationErr || costErr || deliveryErr) {
          this.setState({ 
            purposeErr:purposeErr,
            destinationErr:destinationErr,
            costErr:costErr,
            deliveryErr:deliveryErr,
           });
          return false;
        }

        return true;
    };
    render(){
      const { editFields } = this.state; // you can get your input value by other ways
      const { product } = this.state.product; // get data where you have, or combine from redux
      const {cost, purchase_order, approved_by, quantity_available, description, source, remarks, date_received, date_expire, item_id, warehouse_id, delivery_receipt} = this.state
      return(
        <div>        
          <p style={{textAlign:'center', marginLeft:'10px', fontWeight:'bold', color: '#6c757d'}}>PURCHASED ITEM INFORMATION</p>
          <Form style={{marginRight:'15px',paddingLeft:'.75em'}}>  
                                <Row>
                                    <Col sm={12}>
                                    <Card>
                                        <Card.Header>List of Items</Card.Header>
                                            <Card.Body>
                                              <ReactDropdownAutoComplete
                                                  getItemValue={item => item.name}
                                                  className="form-control"
                                                  id="approved_by"
                                                  name="approved_by"
                                                  placeholder="Select Name"
                                                  data={this.state.items}
                                                  renderItem={item => (
                                                    <div
                                                      role="button"
                                                      tabIndex="-1"
                                                      onClick={(val) => { editFields.name = val; }}
                                                    >{item.name}</div>
                                                  )}
                                                  //icon="search"
                                                  iconColor="#ff000"
                                                  iconClick={() => { /*TODO  */}}
                                                  value={approved_by}
                                                  onChange={this.handleOnApproved}
                                                  onEnter={() => { /*TODO  */}}
                                                />
                                              <Table responsive>
                                                  <thead>
                                                      <tr>
                                                      <th>#</th>
                                                      <th>Category</th> 
                                                      <th>Name</th>                                               
                                                      <th>Particular</th>
                                                      <th>Unit</th>
                                                      <th>Action</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                  {
                                                      this.state.result.map((item)=>{
                                                          return(
                                                              <tr key={item.id}>
                                                                  <td>{item.id}</td>
                                                                  <td>{item.type}</td> 
                                                                  <td>{item.name}</td>
                                                                  <td>{item.particular}</td>
                                                                  <td>{item.unit}</td>
                                                                  <td>
                                                                    <Button size="sm" id={item.id} value={item.name} onClick={this.handleOnSelect.bind(this, item.id, item.name)}>Select</Button>
                                                                  </td>
                                                              </tr>
                                                          )
                                                      })
                                                  }
                                                  </tbody>
                                              </Table>
                                          {/**
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
                                           */}    
                                            </Card.Body>
                                            <Card.Footer className="text-muted">Choose an Item from the List</Card.Footer>
                                    </Card><br/>
                                     
                                    </Col>
                                </Row> 
                                <br/>                                                               
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEntity">
                                        <div style={{color:'red',display:'inline'}}>* </div>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" value={description} placeholder="ex. Young's Town 100 X 150g" onChange={this.onChange}/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridFundCluster">
                                        <div style={{color:'red',display:'inline'}}>* </div>
                                        <Form.Label>Source</Form.Label>
                                              <ReactDropdownAutoComplete
                                                getItemValue={item => item.name}
                                                className="form-control"
                                                id="source"
                                                name="source"
                                                placeholder="Select Source"
                                                data={this.state.mySource}
                                                renderItem={item => (
                                                  <div
                                                    role="button"
                                                    tabIndex="-1"
                                                    onClick={(val) => { editFields.name = val; }}
                                                  >{item.name}</div>
                                                )}
                                                //icon="search"
                                                iconColor="#ff000"
                                                iconClick={() => { /* TODO */ }}
                                                value={source}
                                                onChange={this.handleOnSource}
                                                onEnter={() => { /* TODO */ }}
                                              />
                                        <div style={{ fontSize: 12, color: "red" }}>
                                          {this.state.purposeErr}
                                        </div>                                           
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridResponsibilityCode">
                                        <Form.Label>Remarks</Form.Label>
                                        <Form.Control type="text" name="remarks" value={remarks} placeholder="ex. In Bidding Process" onChange={this.onChange}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridDivision">
                                        <div style={{color:'red',display:'inline'}}>* </div>
                                        <Form.Label>Cost/Item</Form.Label>
                                        <Form.Control type="number" name="cost" value={cost} placeholder="ex. 20.25" onChange={this.onChange}/>
                                        <div style={{ fontSize: 12, color: "red" }}>
                                          {this.state.costErr}
                                        </div> 
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridOffice">
                                        <div style={{color:'red',display:'inline'}}>* </div>
                                        <Form.Label>Quantity Received</Form.Label>
                                        <Form.Control type="number" name="quantity_available" value={quantity_available} placeholder="ex. 50" onChange={this.onChange}/>
                                        <div style={{ fontSize: 12, color: "red" }}>
                                          {this.state.destinationErr}
                                        </div>                                    
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formDeliveryReceipt">
                                        <div style={{color:'red',display:'inline'}}>* </div>
                                        <Form.Label>Delivery Receipt #</Form.Label>
                                        &nbsp;
                                        <span style={{fontSize:'10px',fontStyle:'italic',}}>(Donated/Purchased Items)</span>
                                        <Form.Control 
                                        required
                                        type="text" 
                                        name="delivery_receipt" 
                                        value={delivery_receipt} 
                                        placeholder="ex. 21-04-0002" 
                                        onChange={this.onChange}/>
                                        <div style={{ fontSize: 12, color: "red" }}>
                                          {this.state.deliveryErr}
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formPurchaseOrder">
                                        <Form.Label>Purchase Order #</Form.Label>&nbsp;
                                        <span style={{fontSize:'13px',fontStyle:'italic',}}>(Purchased Items)</span>
                                        <Form.Control 
                                        required
                                        type="text" 
                                        name="purchase_order" 
                                        value={purchase_order} 
                                        placeholder="ex. 21-04-0002" 
                                        onChange={this.onChange}/>
                                   
                                    </Form.Group>
                                </Form.Row>

                              <br/>
                                

                                <Form.Row>
                                  <Form.Label>Date Acquired&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                                    <DatePicker
                                      selected={this.state.date_received}
                                      onChange={this.handleAcquire}
                                      dateFormat="yyyy-MM-dd"
                                    />
                                   </Form.Row>
                                   <Form.Row>
                                    <Form.Label>Date of Expiration&nbsp;</Form.Label>
                                    <DatePicker
                                      selected={this.state.date_expire}
                                      onChange={this.handleExpire}
                                      dateFormat="yyyy-MM-dd"
                                    />
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridOffice">
                                        <Form.Label>Item ID</Form.Label>
                                        <Form.Control disabled type="number" name="item_id" value={item_id} onChange={this.onChange}/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridOffice">
                                        <Form.Label>Warehouse</Form.Label>
                                        <Form.Control type="text" name="warehouse_id" value={warehouse_id} onChange={this.onChange}/>
                                    </Form.Group>
                                </Form.Row>
                         
                        </Form>
                        {this.state.alert_message=="success"?<SuccessAlert/>:null}
                        {this.state.alert_message=="error"?<ErrorAlert/>:null}
                        <Button disabled={this.state.disable} variant='success' onClick={this.onSend} id='update'>Submit</Button>
                        <br/>
        </div>
       
      );
    }
  }

export default AddItemPurchase;