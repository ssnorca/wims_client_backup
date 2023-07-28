import React, {Component} from 'react';
import { Row, Col, Container, Table, Button, Card, Form } from 'react-bootstrap';
import ReactDropdownAutoComplete from 'react-dropdown-autocomplete';
import {Link} from 'react-router-dom';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import axios from 'axios';
//import axios from '../../../../../axios';
class OperationUseforCondition extends Component{
  constructor (props){
    super(props);
    this.state = {
      stocks:[],
      request:[],
      replaced:[],
      type:[],
      items:[],
      ctype:'',
      aparticular:[],
      result:[],
      particular:'',
      particularErr:'',
      description:'',
      remarks:'',
      remarksErr:'',
      descErr:'',
      cquantity:'',
      quantity:'',
      cquanErr:'',
      cost:'',
      costErr:'',
      reference:[],
      ris_no:''
    };
  }
  validate = () => {
    let descErr = '';
    let cquanErr = '';
    let costErr = '';
    let remarksErr = '';
    let particularErr = '';
    if (!this.state.description) {
      descErr = "Description cannot be Empty";
      //return false;
    }
    if (!this.state.remarks) {
      remarksErr = "Remarks cannot be Empty";
      //return false;
    }
    if (!this.state.cquantity) {
      cquanErr = "Quantity cannot be Empty";
      //return false;
    }
    if (!this.state.cost) {
      costErr = "Cost cannot be Empty";
      //return false;
    }
    if (!this.state.particular) {
      particularErr = "Particular cannot be Empty";
      //return false;
    }
    if (descErr || cquanErr || costErr || particularErr || remarksErr) {
      this.setState({ 
        descErr:descErr,
        cquanErr:cquanErr,
        costErr:costErr,
        particularErr:particularErr,
        remarksErr:remarksErr,
       });
      return false;
    }else{
      this.setState({ 
        descErr:'',
        cquanErr:'',
        costErr:'',
        particularErr:''
       });
       return true;
    }

    
};
  componentDidMount(){
    //console.log(this.props.location.status);
    //const [{id, ris}] = this.props.location.forConditioning
    const id = Number.parseInt(this.props.match.params.id, 10)
    //console.log(this.props.match.params.id)
    /*axios.get('/api/stockpilereferencewaste')
    .then(res => this.setState({ 
        request: res.data.filter(ffp=>{
         return ffp.stockpile_ref_id===id;
        })
    }));*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereferencewaste`,{
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
            request: validation.filter(ffp=>{
              return ffp.stockpile_ref_id===id;
             })
          });
       }
    })

    /*axios.get('/api/stockpilereferencewasteShow/'+this.props.match.params.id)
    .then(res => this.setState({ 
        replaced:res.data.filter(ffp=>{
          return ffp.istatus===1;
         }),
    }));*/

    fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereferencewasteShow/`+this.props.match.params.id,{
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
            replaced:validation.filter(ffp=>{
              return ffp.istatus===1;
             }),
          });
       }
    });

    /*axios.get('/api/stockpilereferenceEdit/'+this.props.match.params.id)
    .then(res => this.setState({ 
      ris_no: res.data.ris_no, 
      quantity: res.data.quantity,
    }));*/

    fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereferenceEdit/`+this.props.match.params.id,{
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
            ris_no: validation.ris_no, 
            quantity: validation.quantity,
          });
       }
    })

    /*axios.get('/api/category')
    .then(res => this.setState({ 
        type: res.data, 
      }));*/
      fetch(`${process.env.REACT_APP_API_PROXY}/api/category`,{
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
             type: validation 
            });
         }
      });
  

  /*    axios.get('/api/item')
    .then(res => this.setState({ 
        aparticular: res.data, 
      }));*/
      fetch(`${process.env.REACT_APP_API_PROXY}/api/item`,{
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
              aparticular: validation 
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
  onChangeType = e => {
    //console.log(this.state.particular);
    this.setState({
    ctype: e.target.value,
    result:this.state.aparticular.filter(it => it.particular.includes(e.target.value))
  })
}
onReset = (e) =>{
  e.preventDefault();
  this.setState({
    result:this.state.aparticular.filter(it => it.particular.includes(e.target.value)),
    ctype: e.target.value,
  })
  //console.log('called');
}

  onAdd = e =>{
    e.preventDefault();

    const isValid = this.validate();
    if (isValid) {   
    //console.log('clicked');
    //const [{id}] = this.props.location.forConditioning;
    const { ctype, particular, description, remarks, cquantity, cost} = this.state

    const waste = {
        stockpile_ref_id: this.props.match.params.id,
        item_type: ctype,
        item_name: particular,
        item_desc: description,
        item_remarks: remarks,
        item_quantity: cquantity,
        item_cost: cost,
        istatus: 0,
      }

    //console.log(waste);

    /*axios.post('/api/stockpilereferencewaste', waste)
    .then(res => {
        this.setState({
          alert_message:"success",
          ctype: '',
          particular: '',
          description:'',
          remarks:'',
          cquantity: '',
          cost: '',
        })
    }).catch(error=>{
        this.setState({alert_message:"error"})
    });*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereferencewaste`,{
      mode:'cors',
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
      },
         body: JSON.stringify(waste)
       }).then(async response => {
         if (!response.ok) {
         const validation = await response.json();
         //console.log(validation.errors);
         this.setState({alert_message:"error"})
       }else{
        //history('/categories')
        //const validation = await response.json();
        this.setState({
          alert_message:"success",
          ctype: '',
          particular: '',
          description:'',
          remarks:'',
          cquantity: '',
          cost: '',
        })
       }
    });


    this.onReload();
    }
  }
  onReload =()=>{
    const id = Number.parseInt(this.props.match.params.id, 10)
    this.liveTime = setTimeout(()=>{
       //this.reload();
       /*axios.get('/api/stockpilereferencewaste')
       .then(res => this.setState({ 
           request: res.data.filter(ffp=>{
            return ffp.stockpile_ref_id===id;
           }),
       }));*/
       fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereferencewaste`,{
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
              request: validation.filter(ffp=>{
                return ffp.stockpile_ref_id===id;
               }),
            });
         }
      })
    }, 2000);

    /*this.liveRedirectTime = setTimeout(()=>{ 
    this.redirectToTarget();
    }, 3000);*/
  }
  onBack = e =>{
    e.preventDefault();
    //const { transactionId } = this.state; 
    this.props.history.push(`/request`);
  }
  checkStatus = (id)=>{
    const ready = 'Replaced';
    const not = 'Pending';
    if(id===1){
      return ready;
    }
    return not;
  }
  findStatus =(id)=>{
    const ready = 'badge badge-success badge-pill';
    const not = 'badge badge-warning badge-pill';
    if(id===1){
        return ready
    }return not
}
  checkReplace = (id) =>{
    const ready = '';
    const not = 'none';
    if(id===1){
      return not;
    }
    return ready;
  }

  canSave = (numRows, numReplaced) => {
    //const numRows = this.state.request.length;
    //const numReplaced = this.state.replaced.length;
    //console.log(numRows+'-'+numReplaced);
    //const { paramCode } = this.state.row;
    if(this.props.location.status===1){
      return true;
    }
    if(numRows>0 && numRows===numReplaced){
      return false
    }
    if(numRows===0){
      return true;
    }
      return true;
  };

  onRecondition = (e) =>{
    e.preventDefault();

    const myId = Number.parseInt(this.props.match.params.id, 10)
    //const { ctype, particular, description, remarks, cquantity, cost } = this.state; 
    const reference = {
      status: 1,
    }

    /*axios.put('/api/stockpilereference/update/'+myId, reference)
    .then(res => {
      this.setState({alert_message:"success"})
      this.liveRedirectTime = setTimeout(()=>{ 
        //this.setState({alert_message:''})
        this.props.history.push(`/request/`)
      }, 2000);
    }).catch(error=>{
      this.setState({alert_message:"error"})
    });*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereference/update/`+myId,{
      mode:'cors',
      method: 'PUT',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
      },
         body: JSON.stringify(reference)
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
          this.props.history.push(`/request/`)
        }, 2000);
       }
    })

  }
    render(){
      const myId = Number.parseInt(this.props.match.params.id, 10)
      const { ctype, particular, description, remarks, cquantity, quantity, cost, ris_no } = this.state; 
      const numRows = this.state.request.length;
      const numReplaced = this.state.replaced.length;
      return(
        <Container>
            <div className="text-center">
                <cite title="Source Title">RIS # {ris_no} Reconditioning</cite>
                <hr/>
            </div>
            
            <Row>
                <Col sm={9}>
                <h5>List of Items to be Replaced/Wasted</h5>
                <span style={{fontWeight:'bold'}}>{numRows}/</span>
                <span style={{fontWeight:'bold'}}>{numReplaced} Items Replaced</span><br/> 
               <Card className="text-center">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Type</th>
                            <th>Particular</th> 
                            <th>Description</th>
                            <th>Remarks</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.request.map((item)=>{
                              return(
                                <tr key={item.id}>
                                    <td>{item.item_type}</td>
                                    <td>{item.item_name}</td>
                                    <td>{item.item_desc}</td>
                                    <td>{item.item_remarks}</td>
                                    <td>{item.item_quantity}</td>
                                    <td>{item.item_cost}</td>
                                    
                                    <td>
                                      
                                      <span className={this.findStatus(item.istatus)} >
                                        {this.checkStatus(item.istatus)}
                                      </span>
                                    </td>
                                    <td>
                                      <Link style={{display:'inline'}} onClick={()=>{}} 
                                        to={{
                                            pathname:`/request/viewreplaceditems/${item.id}`,
                                            type: item.item_type,
                                            particular:item.item_name,
                                            item_id:myId
                                        }}>View</Link>&nbsp;|&nbsp;
                                      <Link style={{display:'inline'}} onClick={()=>{}} 
                                        to={{
                                            pathname:`/request/editwasteditems/${item.id}`,
                                            type: item.item_type,
                                            particular:item.item_name,
                                            item_id:myId
                                        }}>Edit</Link>&nbsp;|&nbsp;
                                        <Link style={{display:'inline', pointerEvents: this.checkReplace(item.istatus)}} onClick={()=>{}}  
                                        to={{
                                            pathname:`/request/replacewasteditems/${item.id}`,
                                            type: item.item_type,
                                            particular:item.item_name,
                                            quantity:item.item_quantity,
                                            item_id:myId
                                        }}>Replace</Link>
                                    </td>
                                </tr>
                            )
/*
                              if(item.istatus===1){
                                
                              }else{
                                return(
                                  <tr key={item.id}>
                                      <td>{item.item_type}</td>
                                      <td>{item.item_name}</td>
                                      <td>{item.item_desc}</td>
                                      <td>{item.item_remarks}</td>
                                      <td>{item.item_quantity}</td>
                                      <td>{item.item_cost}</td>
                                      <td>{item.istatus}</td>
                                      <td>
                                        <Link style={{display:'inline'}} onClick={()=>{}} 
                                          to={{
                                              pathname:`/request/viewreplaceditems/${item.id}`,
                                              type: item.item_type,
                                              particular:item.item_name,
                                              item_id:myId
                                          }}>View</Link>&nbsp;|&nbsp;
                                        <Link style={{display:'inline'}} onClick={()=>{}} 
                                          to={{
                                              pathname:`/request/editwasteditems/${item.id}`,
                                              type: item.item_type,
                                              particular:item.item_name,
                                              item_id:myId
                                          }}>Edit</Link>&nbsp;|&nbsp;
                                          <Link style={{display:'inline'}} onClick={()=>{}}  
                                          to={{
                                              pathname:`/request/replacewasteditems/${item.id}`,
                                              type: item.item_type,
                                              particular:item.item_name,
                                              quantity:item.item_quantity,
                                              item_id:myId
                                          }}>Replace</Link>
                                      </td>
                                  </tr>
                              )
                              }
*/
                            })
                          }
                                            
                        </tbody>
                    </Table>
                  </Card>
                </Col>
                <Col sm={3}>
                <Card className="text-center">
                          <Card.Header>Item for Replacement</Card.Header>
                          <hr/>
                                <Form.Group as={Col} controlId="formGridApproved">
                                            <Form.Control 
                                                    as="select" 
                                                    name="ctype" 
                                                    value={ctype}
                                                    onChange={this.onChangeType}
                                                    onClick={this.onReset}>
                                                {this.state.type.map((team) => <option key={team.id} value={team.particular}>{team.particular}</option>)}
                                            </Form.Control> 
                                            <br/>
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.particularErr}
                                                  </div> 
                                            <Form.Control 
                                                    as="select" 
                                                    name="particular" 
                                                    value={particular}
                                                    onChange={this.onChange}
                                                    onClick={this.onChange}>
                                                {this.state.result.map((team) => <option key={team.id} value={team.name}>{team.name}</option>)}
                                            </Form.Control> 
                                            <br/>     
                                                  <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.descErr}
                                                  </div>     

                                            <Form.Control 
                                                    placeholder="Description ex. Well Milled Rice/Youngs Town 150g"
                                                    name="description"
                                                    required
                                                    value={description}
                                                    onChange={this.onChange} />      

                                                    <br/>       
                                                  <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.remarksErr}
                                                  </div>                                                                                
                                            <Form.Control 
                                                    placeholder="Remarks ex. Damage Rice due to..."
                                                    name="remarks"
                                                    required
                                                    value={remarks}
                                                    onChange={this.onChange} />                                                       
                                                    <br/>                                                     
                                                     <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.cquanErr}
                                                  </div>                                                     
                                            <Form.Control 
                                                    type="number"
                                                    placeholder="Quantity ex.1000"
                                                    name="cquantity" 
                                                    value={cquantity}
                                                    onChange={this.onChange} />                                                    
                                                    <br/>
                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.costErr}
                                                  </div> 
                                            <Form.Control 
                                                    type="number"
                                                    placeholder="Cost ex. 25.25"
                                                    name="cost" 
                                                    value={cost}
                                                    onChange={this.onChange} />                                                     
                                
</Form.Group>
                                <hr/>
                              <Card.Footer className="text-muted">
                                <Button block onClick={this.onAdd} variant="primary">
                                        Add Item
                                </Button>
                                <Button block onClick={this.onBack} variant="secondary">
                                        Back
                                </Button>
                              </Card.Footer>
                      </Card><br/>

                      {this.state.alert_message=="success"?<SuccessAlert/>:null}
                      {this.state.alert_message=="error"?<ErrorAlert/>:null}
                </Col>
            </Row>
            <Row>

                <Col sm={12}>
                <Card className="text-center">
                                    <Card.Header>Reconditioned FFPs</Card.Header>
                                    <span style={{fontStyle:'italic', fontSize:'10px', marginRight:'5px', marginLeft:'5px'}}>Once Damaged/Wasted items are replaced with new items, these quantity will be added for production</span>
                                    <hr/>
                                        <Card.Body>
                                            <Card.Title>{quantity} FFP's</Card.Title>
                                        </Card.Body>
                                    <hr/>
                                        <Card.Footer className="text-muted">
                                            <Button 
                                                disabled={this.canSave(numRows, numReplaced)}
                                                onClick={this.onRecondition}
                                                variant='info'>Add to Production</Button>
                                        </Card.Footer>
                    </Card>

                </Col>  
            </Row>
        </Container>
        
      );
    }
  }

export default OperationUseforCondition;