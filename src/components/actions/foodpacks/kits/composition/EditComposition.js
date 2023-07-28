import React, {Component} from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import ReactDropdownAutoComplete from 'react-dropdown-autocomplete';
//import axios from '../../../../../axios';
class EditComposition extends Component{
  constructor(props) {
    super(props);

    this.state = {
      kitname: '',
      kitnameCount: '',
      kitdescription:'',
      quantity_requested: '',
      unit: '',
      pending:'t',
      request_status:'incomplete',
      alert_message:'',
      type:[],
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    //axios.get('/api/kitlist/edit/'+this.props.match.params.id)
    //    .then(res => this.setState({ 
    //      kitname:res.data._type,
    //      kitdescription:res.data._name,
    //      quantity_requested:res.data.quantity,
    //      unit:res.data.unit,
    //    }))
    fetch(`${process.env.REACT_APP_API_PROXY}/api/kitlist/edit/`+this.props.match.params.id,{
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
         //console.log(validation.errors);
         this.setState({alert_message:"error"})
       }else{
        //history('/categories')
        const validation = await response.json();
        //console.log(validation)
           this.setState({ 
              kitname:validation._type,
              kitdescription:validation._name,
              quantity_requested:validation.quantity,
              unit:validation.unit,
          });
       }
    })

  }
   onChange = e => {this.setState({
    [e.target.name]: e.target.value 
  })};
  onSubmit= (e) =>{
    e.preventDefault();
    const {kitname, kitdescription, quantity_requested, unit} = this.state
    const ffpproduction = {
      kitname: kitname,
      kitdescription: kitdescription,
      quantity: quantity_requested,     
      unit:unit,
    }
    //console.log(this.props.match.params.id);
    /*axios.put('/api/kit/updatecomponent/'+this.props.match.params.id, ffpproduction)
    .then(res => {
      this.setState({alert_message:"success"})
      this.liveRedirectTime = setTimeout(()=>{ 
        //this.setState({alert_message:''})
        this.props.history.push(`/foodpacks/`)
      }, 2000);
    }).catch(error=>{
      this.setState({alert_message:"error"})
    });*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/kit/updatecomponent/`+this.props.match.params.id,{
      mode:'cors',
      method: 'PUT',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
      },
         body: JSON.stringify(ffpproduction)
       }).then(async response => {
         if (!response.ok) {
         const validation = await response.json();
         //setErrors(validation.errors);
         //console.log(validation.errors);
         this.setState({alert_message:"error"})
       }else{
        //history('/categories')
        const validation = await response.json();
        this.setState({alert_message:"success"})
        //console.log(validation)
       }
    })
  }

  handleOnPrepared = (e) =>{
    //console.log(this.state.type.filter(it => it.name.includes(e)).length);
    this.setState({ 
      kitname: e, 
      kitnameCount:this.state.type.filter(it => it.name.includes(e)).length
    })
       
  }

  canSave = (id) => {
    
        //console.log(id);
        if(id===0){
            return 'plus-circle';
        }       

    return '';
  };
    render(){
      const { kitname, kitnameCount, editFields, kitdescription, quantity_requested, unit, pending } = this.state;
      return(
        <div>        
          {this.state.alert_message=="success"?<SuccessAlert/>:null}
          {this.state.alert_message=="error"?<ErrorAlert/>:null}
          <hr/>
          <Form onSubmit={this.onSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Kit Names</Form.Label>
                    <ReactDropdownAutoComplete
                                                getItemValue={item => item.name}
                                                className="form-control"
                                                id="kitname"
                                                name="kitname"
                                                placeholder="Select Name"
                                                data={this.state.type}
                                                renderItem={item => (
                                                  <div
                                                    role="button"
                                                    tabIndex="-1"
                                                    onClick={(val) => { editFields.name = val; }}
                                                  >{item.name}</div>
                                                )}
                                                icon= {this.canSave(kitnameCount)}
                                                iconColor="#ff000"
                                                iconClick={this.onAddprepared}
                                                value={kitname}
                                                onChange={this.handleOnPrepared}
                                                onEnter={(e) => {/*TODO  */}}
                                              />
                    {/**
                      * <Form.Control
                          required
                          type="text"
                          name="kitname" 
                          value={kitname}
                          onChange={this.onChange}
                          placeholder="ex. Sleeping Kit..."
                      />
                    */} 
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="kitdescription" 
                        value={kitdescription}
                        onChange={this.onChange}
                        placeholder="ex. Mosquito Net..."
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="quantity_requested" 
                        value={quantity_requested}
                        onChange={this.onChange}
                        placeholder="Quantity of Mosquito Net in the Kit"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col}  md="4"controlId="formGridReceived">
                        <Form.Label>Unit</Form.Label><br/>
                        <Form.Control
                            required
                            type="text"
                            name="unit" 
                            value={unit}
                            onChange={this.onChange}
                            placeholder="ex. pc..."
                        />
                    </Form.Group>
                </Form.Row>
                <Button type="submit" onClick={this.onClick}>Submit</Button>
            </Form>
        </div>
       
      );
    }
  }

export default EditComposition;