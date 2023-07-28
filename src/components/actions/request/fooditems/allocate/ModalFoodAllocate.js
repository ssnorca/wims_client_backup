import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import { Form, Row, Col, Container, Table } from 'react-bootstrap';
import ItemListAllocate from './ItemListAllocate';
import ItemListCancellation from './ItemListCancellation';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
//import axios from '../../../../../axios';
export default class ModalFoodAllocate extends Component{
    constructor (props){
        super(props);
        this.state = {
            production_ffp: [],
            allocation_ffp:[],
            cancellation_ffp:[],
            production_id:'',
            init:0,
            ris_id:'',
            allocated:'',
            percentage:'',
            rpercentage:'',
            purpose:'',
            released:'',
            quantity_requested:'',
            activePage:1,
            itemsCountPerPage:1,
            pageRangeDisplayed:3,
            totalItemsCount:1,
            provider:'',
            cancellation:false,
            allocation:true,
            cancelledQuantity:'',
            allocation_id:'',
        }
    }
     async componentDidMount() {
        //console.log(this.props.location.provider);
        var area = localStorage.getItem('roleDesigArea');
        if(this.props.location.auth==='admin'){
            /*axios.get('/api/production')
            .then(res => this.setState({ 
                production_ffp: res.data.data.filter(ffp=>{
                  return ffp.composition==='Ok';
                 }),
                activePage:res.data.current_page,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total,
                provider:this.props.location.provider
            }));*/
           await fetch(`${process.env.REACT_APP_API_PROXY}/api/production`,{
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
                    production_ffp: validation.data.filter(ffp=>{
                      return ffp.composition==='Ok';
                     }),
                    activePage: validation.current_page,
                    itemsCountPerPage: validation.per_page,
                    totalItemsCount: validation.total,
                    provider:this.props.location.provider
                })
                 }
              });

            /*axios.get('/api/stockpileallocation')
            .then(res => this.setState({ 
                cancellation_ffp: res.data.filter(ffp=>{
                  return ffp.ris_id===this.props.match.params.id;
                 }),
            }));*/
          await  fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpileallocation`,{
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
                    cancellation_ffp: validation.filter(ffp=>{
                        return ffp.ris_id===this.props.match.params.id;
                       }),
                    })
                 }
              });

        }else{
            if(area === this.props.location.provider){

                /*axios.get('/api/stockpileallocation')
                .then(res => this.setState({ 
                    cancellation_ffp: res.data.filter(ffp=>{
                      return ffp.ris_id===this.props.match.params.id;
                     }),
                }));*/
              await  fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpileallocation`,{
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
                        cancellation_ffp: validation.filter(ffp=>{
                            return ffp.ris_id===this.props.match.params.id;
                           }),
                        })
                     }
                  });
            }

            /*axios.get('/api/production/province/'+area)
            .then(res => this.setState({ 
                production_ffp: res.data.data.filter(ffp=>{
                  return ffp.composition==='Ok';
                 }),
                activePage:res.data.current_page,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total,
                provider:this.props.location.provider
            })); */
          await  fetch(`${process.env.REACT_APP_API_PROXY}/api/production/province/`+area,{
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
                    production_ffp: validation.data.filter(ffp=>{
                        return ffp.composition==='Ok';
                       }),
                      activePage:validation.current_page,
                      itemsCountPerPage:validation.per_page,
                      totalItemsCount:validation.total,
                      provider:this.props.location.provider
                    })
                 }
              });
        }
               
        /*await axios.get('/api/requestfood')
        .then(res => this.setState({ 
            allocation_ffp: res.data.filter(ffp=>{
            return ffp.ris_id===this.props.match.params.id;
            }),
            init:1, 
        }));*/
        await  fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood`,{
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
                allocation_ffp: validation.filter(ffp=>{
                    return ffp.ris_id===this.props.match.params.id;
                    }),
                    init:1, 
                })
             }
          });
        const [{ ris_id, purpose, created_at, quantity_requested, allocated, percentage, released, rpercentage }] = this.state.allocation_ffp;
        this.setState({
            ris_id:ris_id,
            purpose:purpose,
            quantity_requested:quantity_requested,
            allocated:allocated,
            percentage:percentage,
            released:released,
            rpercentage:rpercentage,
        });

         
     }
     componentWillUnmount(){
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        /*axios.get('/api/production', {
            cancelToken: source.token
          }).catch(function (thrown) {
            if (axios.isCancel(thrown)) {
              console.log('Request canceled', thrown.message);
            } else {
              // handle error
            }
          });*/
          
     }
     componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
    
          if(this.state.quantity_allocated !== prevState.quantity_allocated && this.state.quantity_allocated !== null){
            console.log('current '+this.state.quantity_allocated);
            console.log('prev '+prevState.quantity_allocated);
          }
    
    }
    
    onAllocate =(remain_ffp, id)=>{
        
        this.setState({ 
            quantity_remain: remain_ffp
        });
        this.setState({ 
            production_id: id
        });
        //console.log(this.state.quantity_remain)
    }

    onCancelled =(ffp, id, stockpile_id)=>{
       
        confirmAlert({

            title: ffp + 'FFPs',
            message: 'Cancel Allocation',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.onCancelAllocation(ffp, id, stockpile_id)
                /*this.setState({
                    cancelledQuantity: ffp,
                    allocation_id: id,
                    production_id: stockpile_id,
                })*/
                
              }
            ]
          });

    }
    onCancelAllocation = (ffp, id, stockpile_id)=>{
          const forCancel = {
            id: id,
            stockpile_id: stockpile_id,
            status: 'cancelled',
            quantity: 0,
          }
        //console.log(forCancel);
        /*axios.put('/api/stockpileallocation/update/'+id, forCancel)
          .then(res => {
              this.setState({alert_message:"success"})
              this.liveRedirectTime = setTimeout(()=>{ 
               this.props.history.push(`/request/viewrequest/${this.props.match.params.id}`);
            }, 2000)
          }).catch(error=>{
              this.setState({alert_message:"error"})
          });*/
          fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpileallocation/update/`+id,{
            mode:'cors',
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                "accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}` 
              },
                body: JSON.stringify(forCancel)
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
                    this.props.history.push(`/request/viewrequest/${this.props.match.params.id}`);
                 }, 2000)
            }
            })
    }
    handlePageChange = (pageNumber) => {
        //console.log(pageNumber);
        //this.setState({activePage: pageNumber});
        /*axios.get('/api/production?page='+pageNumber)
            .then(res => this.setState({
                 production_ffp: res.data.data,
                 activePage:res.data.current_page,
                 itemsCountPerPage:res.data.per_page,
                 totalItemsCount:res.data.total
            }))*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/production?page=`+pageNumber,{
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
                        production_ffp: validation.data,
                        activePage: validation.current_page,
                        itemsCountPerPage: validation.per_page,
                        totalItemsCount: validation.total
                    });
                 }
              })
      }
      onSplit = (param)=>{
        if (param != null) {
          const arr = param.split('.');
          return arr[0] + "% complete";
        } else {
          return 0;
        }
        
      } 
      onSend =(ris_id, prod_id)=>{

        //if the quantity to be release > requested
        if (this.state.production_id<=0){
            this.setState({alert_message:"error"})
        //if the quantity to be release > 
        }else{
            const composition = {
                stockpile_id: prod_id,
                ris_id: ris_id
            }
            /*axios.post('/api/stockpileallocation', composition)
            .then(res => {
                this.setState({alert_message:"success"})
            }).catch(error=>{
                this.setState({alert_message:"error"})
            }); */
            fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpileallocation`,{
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
                    //console.log(validation.errors);
                    this.setState({alert_message:"error"})
                }else{
                    //history('/categories')
                    //const validation = await response.json();
                    this.setState({alert_message:"success"})
                    //console.log(validation)
                }
                })

            this.onReload();
            this.props.onReload(); 
        }
  
     }
     onReload =()=>{
        const {ris_id, quantity_requested} = this.props.onAllocate_;
        var area = localStorage.getItem('roleDesigArea');
        if(this.props.location.auth==='admin'){
            /*axios.get('/api/production')
            .then(res => this.setState({ 
                production_ffp: res.data.data.filter(ffp=>{
                  return ffp.composition==='Ok';
                 }),
                activePage:res.data.current_page,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total
            }));*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/production`,{
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
                        production_ffp: validation.data.filter(ffp=>{
                            return ffp.composition==='Ok';
                           }),
                          activePage: validation.current_page,
                          itemsCountPerPage: validation.per_page,
                          totalItemsCount: validation.total
                    });
                 }
              })
        }else{
            /*axios.get('/api/production/province/'+area)
            .then(res => this.setState({ 
                production_ffp: res.data.data.filter(ffp=>{
                  return ffp.composition==='Ok';
                 }),
                activePage:res.data.current_page,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total
            })); */
            fetch(`${process.env.REACT_APP_API_PROXY}/api/production/province/`+area,{
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
                        production_ffp: validation.data.filter(ffp=>{
                            return ffp.composition==='Ok';
                           }),
                          activePage: validation.current_page,
                          itemsCountPerPage: validation.per_page,
                          totalItemsCount: validation.total
                    });
                 }
              })
        }
        this.liveTime = setTimeout(()=>{
           //this.reload();
           /*axios.get('/api/stockpileallocation')
           .then(res => this.setState({ 
            allocation_ffp: res.data.filter(ffp=>{
            return ffp.ris_id===this.props.match.params.id;
                }),
                init:1,
                activePage:res.data.current_page,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total
            }));*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpileallocation`,{
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
                        allocation_ffp: validation.filter(ffp=>{
                            return ffp.ris_id===this.props.match.params.id;
                                }),
                                init:1,
                                activePage: validation.current_page,
                                itemsCountPerPage: validation.per_page,
                                totalItemsCount: validation.total
                    });
                 }
              })
        }, 2000);
        this.liveRedirectTime = setTimeout(()=>{ 
            this.redirectToTarget();
            }, 3000);
       }
       redirectToTarget = () => {
        const {ris_id, quantity_requested} = this.props.onAllocate_
        //this.props.history.push(`/request/viewrequest/${this.props.match.params.id}`)
        this.props.history.push(`/request/`)
        //this.props.history.goBack
      }
      onBack = e =>{
        e.preventDefault();
        //const { transactionId } = this.state; 
        this.props.history.push(`/request/viewrequest/${this.props.match.params.id}`);
      }  
      canSave = (myStatus) => {

        //const { paramCode } = this.state.row;
        if(myStatus>0){
          return true
        }
        return false;
      };
      canSend = (myStatus) => {

        //const { paramCode } = this.state.row;
        if(myStatus==='100.0000'||myStatus===100.0000){
          return true
        }
        return false;
      };
      checkCancellation = () =>{
        const yes = 'none';
        const no = '';  
          if(this.state.cancellation){
            return yes;
          }
          return no;
      }
      checkAllocation = () =>{
        const yes = 'none';
        const no = '';  
          if(this.state.allocation){
            return yes;
          }
          return no;
      }
    render(){
        //const {ris_id, purpose, quantity_requested} = this.state.allocation_ffp
        //const {quantity_allocated,percentage} = this.state
        const { ris_id, purpose, allocated, percentage, released, rpercentage, quantity_requested, provider } = this.state;
        return this.state.init ? <div>
    <Container>
                        <div className="text-center">
                            <h5 variant="primary">RIS # {ris_id}</h5>
                            <cite title="Source Title">{purpose}</cite>
                            <hr/>
                        </div>
                       
                        <Row>
                        <Col sm={12}>
                            <Card className="text-center">
                                <Card.Header>Total Allocated Food Packs</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{percentage} %</Card.Title>
                                    </Card.Body>
                            </Card>
                        </Col>
                        </Row>
                        <hr/>
                        <Row >
                            <Col sm={9}>
                                <Table style={{display:this.checkCancellation()}} responsive>
                                    <caption style={{captionSide:'top'}}>Allocation</caption>
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>Location</th>
                                        <th>Productions</th>
                                        <th>Date of Production</th> 
                                        <th>Quantity Available</th>
                                        <th>Quantity Allocated</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <ItemListAllocate 
                                            ris={ris_id} 
                                            provider={provider}
                                            production_ffp={this.state.production_ffp}                                           
                                            onTotalAllocated={this.onTotalAllocated}
                                            production_percentage={this.state.allocation_ffp}
                                            onAllocate={this.onAllocate}  />
                                    </tbody>
                                </Table>
                                <Table style={{display:this.checkAllocation()}} responsive>
                                    <caption style={{captionSide:'top'}}>Cancellation</caption>
                                    <thead>
                                        <tr>
                                        <th>RIS ID</th>
                                        <th>Stockpile ID</th>
                                        <th>Status</th> 
                                        <th>Quantity</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <ItemListCancellation 
                                            ris={ris_id} 
                                            cancellation_ffp={this.state.cancellation_ffp}
                                            provider={provider} 
                                            onCancelled = {this.onCancelled}                                          
                                        />
                                    </tbody>
                                </Table>
                           {
                            <div style={{display:'none'}} className='d-flex justify-content-center'>
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
                           } 
  
                                                        </Col>
                            <Col sm={3}>
                            <Card className="text-center">
                                <Card.Header>Requests</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{quantity_requested}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">Total Quantity</Card.Footer>
                            </Card><br/>
                            {this.state.alert_message=="success"?<SuccessAlert/>:null}
                            {this.state.alert_message=="error"?<ErrorAlert/>:null}
                            <Card className="text-center">
                                <Card.Header>Select</Card.Header>
                                    <Card.Body>
                                        <Card.Title>ID #{this.state.production_id}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                    <Button 
                                    block 
                                    onClick={this.onSend.bind(this,ris_id,this.state.production_id)} 
                                    variant="primary"
                                    disabled={this.canSend(percentage)}>
                                        Submit
                                    </Button>
                                    <Button block onClick={this.onBack} variant='secondary'>
                                        Back
                                    </Button>

                                    </Card.Footer>
                            </Card><br/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                            <Card className="text-center">
                                <Card.Header>Allocated Food Packs</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{allocated}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                    <Button 
                                    disabled={this.canSave(released)}
                                    onClick={()=>{
                                        //window.confirm('Allocated Food-Packs is about to be Returned/Canceled, Proceed?');
                                        this.setState({
                                            cancellation:true,
                                            allocation:false
                                        })
                                   }} variant='danger'>
                                        Cancel
                                    </Button>
                                    </Card.Footer>
                            </Card><br/>
                           
                            </Col>
                        </Row>
                        
                    </Container> 
        </div> : <div>loading...</div>;
    }
    
}

