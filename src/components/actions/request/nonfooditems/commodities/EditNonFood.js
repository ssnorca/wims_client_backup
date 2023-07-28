import React, {Component} from 'react';
import { Button, Col, Form} from 'react-bootstrap';
import axios from 'axios';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
//import axios from '../../../../axios';
class EditNonFood extends Component{
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      item:[],
      item_id:'',
      allocation_id:'',
      unit:'',
      ris_id:'',
      particular:'',
      type:[],
      quantity:'',
      alert_message:'',
    };

    /*this.changeName = this.changeName.bind(this);
    this.changeUnit = this.changeUnit.bind(this);*/
    this.onSubmit = this.onSubmit.bind(this);
  }
  /*changeName(type) {
    this.setState({
      name: type
    });
  }
  changeUnit(e){
    this.setState({
      unit: e.target.value
    });
  }*/
  onChange = e => {this.setState({
    [e.target.name]: e.target.value 
  })
 
}

  async componentDidMount() {
    //const {name, unit} = this.props.location.particular;
    console.log(this.props.match.params.id);
    const arr = this.props.location.state.stype;
    const res = arr.split("_");
    this.setState({
      ris_id:res[0],
      particular:res[1],
      allocation_id:this.props.match.params.id,
      quantity:this.props.location.state.squantity
    });

    /*await axios.get('/api/item')
    .then(res => this.setState({ 
        item: res.data.filter(ffp=>{
          return ffp.name===this.props.location.state.sname;
        }),
        //init:1, 
    }));*/
   await fetch(`${process.env.REACT_APP_API_PROXY}/api/item`,{
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
            item: validation.filter(ffp=>{
              return ffp.name===this.props.location.state.sname;
            }),
          });
       }
    })
  }

  onSubmit(e){
    e.preventDefault();
           //console.log(item);
    const {name, unit, particular,allocation_id,quantity} = this.state
    const item = {
      quantity:quantity,
      item_id: name
    }
    if(name===''){
      this.setState({alert_message:"error"});
      this.liveRedirectTime = setTimeout(()=>{ 
        this.setState({alert_message:''});
      }, 2000);
    }else{
      //console.log(item);
      axios.put('/api/itemallocation/update/'+this.state.allocation_id, item)
      .then(res => {
        this.setState({alert_message:"success"})
        this.liveRedirectTime = setTimeout(()=>{ 
          //this.setState({alert_message:''})
          this.props.history.push(`/request/nonfoodalloc/`+this.props.location.state.stype)
        }, 2000);
      }).catch(error=>{
        this.setState({alert_message:"error"})
      });
      /*fetch(`${process.env.REACT_APP_API_PROXY}/api/itemallocation/update/`+this.state.allocation_id,{
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
          console.log(validation.errors);
          this.setState({alert_message:"error"})
        }else{
          //history('/categories')
          //const validation = await response.json();
          this.setState({alert_message:"success"});
          this.liveRedirectTime = setTimeout(()=>{ 
            //this.setState({alert_message:''})
            this.props.history.push(`/request/nonfoodalloc/`+this.props.location.state.stype)
          }, 2000);
          //console.log(validation)
        }
      })*/

    }


  }
  onReset = (e) =>{
    e.preventDefault();
    /*axios.get('/api/item')
        .then(res => this.setState({ 
            item: res.data.filter(ffp=>{
              return ffp.particular===this.state.particular;
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
            item: validation.filter(ffp=>{
              return ffp.particular===this.state.particular;
            }), 
          });
       }
    })
    //console.log('called');
  }
  onBack =(e)=>{
    e.preventDefault();
    this.props.history.push(`/request/nonfoodalloc/`+this.props.location.state.stype);
  }
    render(){
      const { name, quantity, unit} = this.state;
      return(
        <div>        
          <p style={{textAlign:'center', marginLeft:'10px', fontWeight:'bold', color: '#6c757d'}}>UPDATE INFORMATION</p>
            <Form style={{marginRight:'15px',paddingLeft:'.75em'}}>                                                                  
                    <Form.Row>
                    <Form.Group as={Col} md="6" controlId="formGridApproved">
                            <Form.Label>Item</Form.Label><br/>
                            <select class="form-control" name="name" value={name}
                                    onChange={this.onChange}
                                    onClick={this.onReset}>
                                {this.state.item.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
                            </select>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="formGridDivision">
                            <Form.Label>ID</Form.Label>
                            <Form.Control disabled type="text" name="name" value={name} placeholder="Enter Item Name" onChange={this.onChange}/>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="formGridOffice">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="text" name="quantity" value={quantity} placeholder="Enter Item Unit" onChange={this.onChange}/>
                        </Form.Group>

                    </Form.Row>

              
            </Form>
            {this.state.alert_message=="success"?<SuccessAlert/>:null}
            {this.state.alert_message=="error"?<ErrorAlert/>:null}
            <Button variant='primary' onClick={this.onSubmit} id='update'>Update</Button> 
            <Button variant='secondary' onClick={this.onBack} id='back'>Back</Button> 
        </div>
       
      );
    }
  }

export default EditNonFood;