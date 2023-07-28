import React, {Component} from 'react';
import { Button, FormInput, FormGroup } from "shards-react";
import ReactDropdownAutoComplete from 'react-dropdown-autocomplete';
import { Form, Col} from 'react-bootstrap';
import axios from 'axios';
import DatePicker from "react-datepicker";
import ErrorAlert from '../../ErrorAlert';
import SuccessAlert from '../../SuccessAlert';
//import axios from '../../../../axios';
class EditItemPurchase extends Component{
  constructor(props) {
    super(props);

    this.state = {
      cost: '',
      quantity_available:'',
      description:'',
      source:'',
      remarks:'',
      date_received:'',
      date_expire:'',
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
      delivery_receipt:'',
      purchase_order:'',
      mySource:[
        { name: 'Local Purchased' },
        { name: 'NROC: ' },
        { name: 'Donation: ' }
      ],
      result:[],
      approved_by:'',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  componentDidMount() {
    //console.log(this.state.date_received);
    /*axios.get('/api/itempurchase/edit/'+this.props.match.params.id)
        .then(res => this.setState({ 
          cost: res.data.cost,
          quantity_available: res.data.quantity_available,
          description: res.data._description,
          source: res.data._source,
          remarks: res.data.remarks,
          item_id:res.data.item_id,
          warehouse_id:res.data.warehouse_id,
          date_received:res.data.date_received,
          date_expire:res.data.date_expire,
          delivery_receipt:res.data.delivery_receipt,
          purchase_order:res.data.purchase_order,
        }))*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/itempurchase/edit/`+this.props.match.params.id,{
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
                cost: validation.cost,
                quantity_available: validation.quantity_available,
                description: validation._description,
                source: validation._source,
                remarks: validation.remarks,
                item_id: validation.item_id,
                warehouse_id: validation.warehouse_id,
                date_received: validation.date_received,
                date_expire: validation.date_expire,
                delivery_receipt: validation.delivery_receipt,
                purchase_order: validation.purchase_order,
              });
           }
        })
  }

  onSubmit(e){
    e.preventDefault();
    const {cost, quantity_available, description, source, remarks, date_received, date_expire, item_id, warehouse_id, delivery_receipt, purchase_order} = this.state

    const purchase = {
      cost: cost,
      quantity_available: quantity_available,
      _description:description,
      _source:source,
      remarks:remarks,
      date_received:date_received,
      date_expire:date_expire,
      item_id:item_id,
      warehouse_id:warehouse_id,
      delivery_receipt:delivery_receipt,
      purchase_order:purchase_order

    }
    //console.log(purchase);
    
    /*axios.put('/api/itempurchase/update/'+this.props.match.params.id, purchase)
    .then(res => {
      this.setState({alert_message:"success"})
      this.liveRedirectTime = setTimeout(()=>{ 
        //this.setState({alert_message:''})
        this.props.history.push(`/rawmaterials/`)
      }, 2000);
    }).catch(error=>{
      this.setState({alert_message:"error"})
    });*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/itempurchase/update/`+this.props.match.params.id,{
      mode:'cors',
      method: 'PUT',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
      },
         body: JSON.stringify(purchase)
       }).then(async response => {
         if (!response.ok) {
         const validation = await response.json();
         //console.log(validation.errors);
         this.setState({alert_message:"error"})
       }else{
        //history('/categories')
        //const validation = await response.json();
        this.setState({alert_message:"success"})
        this.liveRedirectTime = setTimeout(()=>{ 
          //this.setState({alert_message:''})
          this.props.history.push(`/rawmaterials/`)
        }, 2000);
       }
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
  onChange = e => {this.setState({
    [e.target.name]: e.target.value 
  })
 
}
  handleOnSource = (e) =>{
    this.setState({
      source: e 
    })
  
  }
    render(){

      const { editFields } = this.state; // you can get your input value by other ways
      const { product } = this.state.product; // get data where you have, or combine from redux
      const {cost, value, approved_by, quantity_available, description, source, remarks, date_received, date_expire, item_id, warehouse_id, delivery_receipt, purchase_order} = this.state

      return(
        <div>  
            <p style={{textAlign:'center', marginLeft:'10px', fontWeight:'bold', color: '#6c757d'}}>PURCHASED ITEM INFORMATION</p>
                <Form style={{marginRight:'15px',paddingLeft:'.75em'}}>       
                    <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEntity">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" value={description} placeholder="ex. Young's Town 100 X 150g" onChange={this.onChange}/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridFundCluster">
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
                                            
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridResponsibilityCode">
                                        <Form.Label>Remarks</Form.Label>
                                        <Form.Control type="text" name="remarks" value={remarks} placeholder="ex. In Bidding Process" onChange={this.onChange}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                <Form.Group as={Col} controlId="formDeliveryReceipt">
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
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridDivision">
                                        <Form.Label>Cost/Item</Form.Label>
                                        <Form.Control type="number" name="cost" value={cost} placeholder="ex. 20.25" onChange={this.onChange}/>
                                        <div style={{ fontSize: 12, color: "red" }}>
                                          {this.state.purposeErr}
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridOffice">
                                        <Form.Label>Quantity Received</Form.Label>
                                        <Form.Control type="number" name="quantity_available" value={quantity_available} placeholder="ex. 50" onChange={this.onChange}/>
                                        <div style={{ fontSize: 12, color: "red" }}>
                                          {this.state.destinationErr}
                                        </div>                                    
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                <Form.Group as={Col} controlId="formGridOffice">
                                  <Form.Label>Date Acquired&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                                  <Form.Control 
                                    type="text" 
                                    name="date_received" 
                                    value={date_received} 
                                    placeholder="yyyy-MM-dd" 
                                    onChange={this.onChange}/>
                                   {/*
                                    <DatePicker
                                      selected={this.state.date_received}
                                      onChange={this.handleAcquire}
                                      dateFormat="yyyy-MM-dd"
                                    />
                                    */} 
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridOffice">
                                   <Form.Label>Date of Expiration&nbsp;</Form.Label>
                                   <Form.Control 
                                    type="text" 
                                    name="date_expire" 
                                    value={date_expire} 
                                    placeholder="yyyy-MM-dd" 
                                    onChange={this.onChange}/>
                                    {/* <DatePicker
                                        selected={this.state.date_expire}
                                        onChange={this.handleExpire}
                                        dateFormat="yyyy-MM-dd"
                                    />*/} 
                                </Form.Group>
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
                <Button variant='success' onClick={this.onSubmit} id='update'>Update</Button>
                <br/>
        </div>
       
      );
    }
  }

export default EditItemPurchase;