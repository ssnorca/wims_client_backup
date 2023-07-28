import React, {Component} from 'react';
import { Button, Col, Form} from 'react-bootstrap';
import axios from 'axios';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
//import axios from '../../../../../axios';
class OperationUseEdit extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            result:[],
            items:[],
            type:[],
            ctype:'',
            aparticular:[],
            particular:'',
            particularErr:'',
            description:'',
            remarks:'',
            remarksErr:'',
            descErr:'',
            cquantity:'',
            cquanErr:'',
            cost:'',
            costErr:'',
            alert_message:'',
        };
    
      }

      componentDidMount() {
        //const {name, unit} = this.props.location.particular;
        //console.log(this.props.location.particular);
        /*axios.get('/api/stockpilereferencewasteEdit/'+this.props.match.params.id)
            .then(res => this.setState({ 
              ctype: res.data.item_type,
              particular: res.data.item_name,
              description: res.data.item_desc,
              remarks: res.data.item_remarks,
              cquantity: res.data.item_quantity,
              cost: res.data.item_cost
          }))*/
          fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereferencewasteEdit/`+this.props.match.params.id,{
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
                  ctype: validation.item_type,
                  particular: validation.item_name,
                  description: validation.item_desc,
                  remarks: validation.item_remarks,
                  cquantity: validation.item_quantity,
                  cost: validation.item_cost
                });
             }
          });
          /*axios.get('/api/category')
          .then(res => this.setState({ 
              type: res.data.filter(ffp=>{
                return ffp.particular===this.props.location.type;
              }),  
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
                    type: validation.filter(ffp=>{
                      return ffp.particular===this.props.location.type;
                    }), 
                  });
               }
            });
        
      
           /* axios.get('/api/item')
          .then(res => this.setState({ 
              aparticular: res.data.filter(ffp=>{
                return ffp.particular===this.props.location.type;
              }), 
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
                    aparticular: validation.filter(ffp=>{
                      return ffp.particular===this.props.location.type;
                    }), 
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
    onBack =(e)=>{
      e.preventDefault();
      this.props.history.push(`/request/forcondition/`+this.props.location.item_id);
    }
    onSubmit=(e)=>{
      e.preventDefault();
      const myId = this.props.location.item_id;   
      const { ctype, particular, description, remarks, cquantity, cost } = this.state; 
      const item = {
        item_type: ctype,
        item_name: particular,
        item_desc: description,
        item_remarks: remarks,
        item_quantity: cquantity,
        item_cost: cost,
      }
  
      //console.log(item);
  
      /*axios.put('/api/stockpilereferencewaste/update/'+this.props.match.params.id, item)
      .then(res => {
        this.setState({alert_message:"success"})
        this.liveRedirectTime = setTimeout(()=>{ 
          //this.setState({alert_message:''})
          this.props.history.push(`/request/forcondition/`+myId)
        }, 2000);
      }).catch(error=>{
        this.setState({alert_message:"error"})
      });*/
      fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereferencewaste/update/`+this.props.match.params.id,{
      mode:'cors',
      method: 'PUT',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
      },
         body: JSON.stringify(item)
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
          this.props.history.push(`/request/forcondition/`+myId)
        }, 2000);
       }
    })

    }
    render(){
        const { ctype, particular, description, remarks, cquantity, cost } = this.state; 
      return(
    <div>        
          <p style={{textAlign:'center', marginLeft:'10px', fontWeight:'bold', color: '#6c757d'}}>UPDATE ITEM INFORMATION</p>
            <Form style={{marginRight:'15px',paddingLeft:'.75em'}}>                                                                  
            <Form.Group as={Col} controlId="formGridApproved">
                                            <Form.Control 
                                                    as="select" 
                                                    disabled
                                                    name="ctype" 
                                                    value={ctype}
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
                                                    onChange={this.onChange}>
                                                {this.state.aparticular.map((team) => <option key={team.id} value={team.name}>{team.name}</option>)}
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

              
            </Form>
            {this.state.alert_message=="success"?<SuccessAlert/>:null}
            {this.state.alert_message=="error"?<ErrorAlert/>:null}
            <Button variant='primary' onClick={this.onSubmit} id='update'>Update</Button> &nbsp;
            <Button variant='danger' id='update'>Delete</Button> &nbsp;
            <Button variant='secondary' id='back' onClick={this.onBack}>Back</Button> 
        </div>
        
      );
    }
  }

export default OperationUseEdit;