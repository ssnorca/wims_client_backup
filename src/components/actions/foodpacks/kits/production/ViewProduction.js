import React, {Component} from 'react';
import {Button, InputGroup, Row , FormControl, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import Pagination from "react-js-pagination";
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
//import axios from '../../../../../axios';
class ViewProduction extends Component{

  constructor(props) {
    super(props);

    this.state = {
      production:[],
      item:[],
      alert_message:'',
      particular:'',
      category_id:'',
      purchase_id:'',
      emp_id:'16-11592',
      purposeErr:'',
      destinationErr: '',
      isShow: true,
      activePage:1,
      itemsCountPerPage:1,
      pageRangeDisplayed:3,
      totalItemsCount:1,
      myId:'',
    };

  }
  componentDidMount() {

        /*axios.get('/api/kit/view/'+this.props.match.params.id)
        .then(res => this.setState({ 
          production: res.data,
          myId: this.props.match.params.id,
        }));  */
        fetch(`${process.env.REACT_APP_API_PROXY}/api/kit/view/`+this.props.match.params.id,{
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
             //this.setState({alert_message:"error"})
           }else{
            //history('/categories')
            const validation = await response.json();
            //console.log(validation)
               this.setState({ 
                production: validation,
                myId: this.props.match.params.id,
              });
           }
        })
          
  }
  componentWillUpdate(nextProps, nextState) {
    //const { kit, id } = this.props.location.state
    if (this.state.particular !== nextState.particular) {

      /*axios.get('/api/kit/viewitem/'+nextState.particular)
        .then(res => this.setState({ 
          item: res.data
        }))
        .catch(error=>{
          //this.setState({alert_message:"error"})
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/kit/viewitem/`+nextState.particular,{
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
             //this.setState({alert_message:"error"})
           }else{
            //history('/categories')
            const validation = await response.json();
            //console.log(validation)
               this.setState({ 
                item: validation,
              });
           }
        })
     

    }else if(this.state.purchase_id!==nextState.purchase_id){

      /*axios.get('/api/kit/view/'+this.props.match.params.id)
      .then(res => this.setState({ production: res.data }))
      .catch(error=>{
        //this.setState({alert_message:"error"})
      });*/
      fetch(`${process.env.REACT_APP_API_PROXY}/api/kit/view/`+this.props.match.params.id,{
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
           //this.setState({alert_message:"error"})
         }else{
          //history('/categories')
          const validation = await response.json();
          //console.log(validation)
             this.setState({ 
              production: validation,
            });
         }
      })
    }
    else{
     // console.log("didupdate");
      
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    //const { kit, id } = this.props.location.state
      if(this.state.isShow !== prevState.isShow){
        //console.log("didupdate");
       const { kit, id } = this.props.location.state;
       
       /*axios.get('/api/kit/view/'+kit)
       .then(res => this.setState({ production: res.data }))
       .catch(error=>{
         //this.setState({alert_message:"error"})
       });*/
      
        fetch(`${process.env.REACT_APP_API_PROXY}/api/kit/view/`+kit,{
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
           //this.setState({alert_message:"error"})
         }else{
          //history('/categories')
          const validation = await response.json();
          //console.log(validation)
             this.setState({ 
              production: validation,
            });
         }
      })
      }
      //console.log("prev"+prevState.isShow);

  }
  handlePageChange = (pageNumber) => {
    /*axios.get('/api/itempurchase/showparticular/'+this.state.particular+'?page='+pageNumber)
        .then(res => this.setState({
            item: res.data.data,
            activePage:res.data.current_page,
            itemsCountPerPage:res.data.per_page,
            totalItemsCount:res.data.total
        }))*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/itempurchase/showparticular/`+this.state.particular+'?page='+pageNumber,{
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
             //this.setState({alert_message:"error"})
           }else{
            //history('/categories')
            const validation = await response.json();
            //console.log(validation)
               this.setState({ 
                item: validation.data,
                activePage:validation.current_page,
                itemsCountPerPage:validation.per_page,
                totalItemsCount:validation.total
              });
           }
        })
  }
  handleAllocate = e =>{
    
    this.setState({
      purchase_id: e.target.value 
    })

  }
  handleOnView = e =>{
    //this.handleChanges();
    //console.log(e.target.value);
    this.setState({
      particular: e.target.value 
    })
    this.setState({
      category_id: e.target.id 
    })
  
  }

  onSplit = (param)=>{
    if (param != null) {
      const arr = param.split('.');
      return arr[0] + "%";
    } else {
      return 0;
    }
    
  }

  validate = () => {
    let purposeErr = '';
    let destinationErr = '';
    if (!this.state.purchase_id) {
      purposeErr = "Purchase Item cannot be Empty";
      //return false;
    }
    if (!this.state.category_id) {
      destinationErr = "Item Category cannot be Empty";
      //return false;
    }
    if (purposeErr || destinationErr) {
      this.setState({ 
        purposeErr:purposeErr,
        destinationErr:destinationErr
       });
      return false;
    }

    return true;
  };

  onChange = e => {this.setState({
    [e.target.name]: e.target.value 
    })
    //console.log(this.state);
  };
  canSubmit = (pid, cid) => {

    console.log(pid)
    if(pid===''||cid===''){
      return true
    }
    return false;
  };
  onSend = e =>{
    var user = localStorage.getItem('react-username');
    //console.log("clicked");
    //const myId = this.props.match.params.id;
    //const arr = this.props.match.params.id.split('-'); this.state.category_id, this.state.purchase_id
    //console.log(arr[0]+" and "+arr[1]);

      const composition = {
      production_id: this.state.category_id,
      purchase_id: this.state.purchase_id
      }

     /* axios.post('/api/kitcomposition', composition)
      .then(res => {
        this.setState({alert_message:"success"})
        this.liveRedirectTime = setTimeout(()=>{ 
          this.onReload();  
        }, 2000);
        }).catch(error=>{
        this.setState({alert_message:"error"})
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/kitcomposition`,{
          mode:'cors',
          method: 'POST',
          headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem('token')}` 
          },
             body: JSON.stringify(composition)
           }).then(async response => {
             if (!response.ok) {
             const validation = await response.json();
             //setErrors(validation.errors);
             console.log(validation.errors);
             this.setState({alert_message:"error"})
           }else{
            //history('/categories')
            const validation = await response.json();
            this.setState({alert_message:"success"})
            this.liveRedirectTime = setTimeout(()=>{ 
              this.onReload();  
            }, 2000);
           }
        })
  }
  onReload =()=>{
    /*axios.get('/api/kit/view/'+this.props.match.params.id)
       .then(res => this.setState({ 
         production: res.data,
         alert_message:'',
         category_id:'',
         purchase_id:''
        }))
       .catch(error=>{
         //this.setState({alert_message:"error"})
       });*/
       fetch(`${process.env.REACT_APP_API_PROXY}/api/kit/view/`+this.props.match.params.id,{
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
              production: validation,
              alert_message:'',
              category_id:'',
              purchase_id:''
            });
         }
      })
  
  }
  onBack = e =>{
    e.preventDefault();
    this.props.history.push(`/foodpacks/`);
  }
    render(){
      return(
         
          <div>  
            <Row>
            <Col sm={7}>      
              <Table striped bordered hover>
                  <thead>
                      <tr>
                      <th>#</th>
                      <th>Particular</th>
                      <th>Request</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          this.state.production.map((production)=>{
                              return(
                                  <tr key={production.id}>
                                    <td>{production.id}</td>
                                    <td>{production._type}</td>
                                    <td>{production._name}</td>
                                    <td>{production.quantity_requested}</td>
                                    <td>{production.request_status}</td>
                                    <td>
                                      <Button size="sm" id={production.id} value={production._name} onClick={this.handleOnView}>View</Button>
                                    </td>
                                  </tr>
                              )
                          })
                      }
                  </tbody>
              </Table>
            </Col>
            <Col sm={5}>
            
              <Row>
              <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Kit ID</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    type="number"
                    name="category_id" 
                    disabled='true'
                    value={this.state.category_id}
                    onChange={this.onChange}
                    placeholder="Category ID"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.destinationErr}
                    </div>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Purchase ID</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    type="number"
                    name="item_id" 
                    disabled='true'
                    value={this.state.purchase_id}
                    onChange={this.onChange}
                    placeholder="Purchase ID"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.purposeErr}
                    </div>
                </InputGroup>
                {this.state.alert_message=="success"?<SuccessAlert/>:null}
                {this.state.alert_message=="error"?<ErrorAlert/>:null}
              </Row>
              <Row>
                <Button variant='primary' disabled={this.canSubmit(this.state.category_id, this.state.purchase_id)} onClick={this.onSend}>Submit</Button>&nbsp;
                <Button variant='secondary' onClick={this.onBack}>Back</Button>                
              {/**
               * 
               <Link 
                  onClick={this.onSend}
                  to={{ 
                    pathname: `/foodpacks/viewkitresult/${this.state.category_id}`+`-`+this.state.purchase_id,
                    state: { from: this.props.location }, // or '/A' or '/B'
                    myId: this.state.myId
                  }}>Submit</Link>| <Link 
                  to={{ 
                    pathname: `/foodpacks/`,
                  }}>Back</Link>
              */}
              </Row>
            </Col>
            </Row>
            <Row>
            <Col sm={12}>
            <Card>
              <Card.Header>Purchased Items</Card.Header>
                  <Card.Body>
              <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Particular</th>
                        <th>Cost</th>
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
                                      <td>{item.name}</td>
                                      <td>{item.cost}</td>
                                      <td>{item.quantity_available}</td>
                                      <td>{item._description}</td>
                                      <td>
                                        <Button key={item.id} value={item.id} onClick={this.handleAllocate}>Select</Button>
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
                    <Card.Footer className="text-muted">Lists of Available Items</Card.Footer>
                      </Card><br/>
                </Col>
              </Row>
        </div>
      );
    }
  }

export default ViewProduction;