import React, {Component} from 'react';
import {Button, Container, Row , Form, Col, Card} from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import ForPrint from './EditRIS';
import Printfile from './PrintFile';
import PrintPreposition from './PrintPreposition';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import ErrorAlert from '../../../actions/ErrorAlert';
import DeleteAlert from '../../../actions/DeleteAlert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import axios from '../../../../axios';
export default class IndexContainerView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            entity_name: '',
            fund_cluster: '',
            division:'',
            center_code:'',
            office:'',
            requested_by:'',
            approved_by:'',
            issued_by:'',
            received_by:'', 
            prepared_by:'',
            open: false,
            isAdmin:false,
            request:[],
            init:0,
            ris_id:'',
            emp_id:'',
            allocated:'',
            percentage:'',
            rpercentage:'',
            purpose:'',
            purpose_type:'',
            quantity_requested:'',
            quantity_released:'',
            designation1:'',
            designation2:'',
            designation3:'',
            designation4:'',
            personnel:'', 
            alert_message:'',
            composition:[],
            authority:'',
            ratio_id:'',
            provider:'',
            distributed:'',
            destination:'',
            date_request:'',
            status:'',
            carouselData:[],
            /* Initialize all text fields with empty strings. */
          }
    }
    computeComposition =(qty, value, id)=>{
        //console.log(value, id);
        /*axios.get('/api/requestfoodratio/'+ id +'/'+value+'/'+qty)
            .then(res => this.setState({ 
                composition: res.data, 
            }));*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfoodratio/`+ id +'/'+value+'/'+qty,{
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
                        composition: validation 
                    });
                 }
              })
        
        
    }  
      onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      }; 
      componentWillUnmount(){
        //console.log('index container unmounted');
      }
    async componentDidMount() {
        var role = localStorage.getItem('roleDesig');

        //console.log(role);
        if(role==='admin'||role==='manager'){
          this.setState({ isAdmin: true });
        }

        /*await axios.get('/api/requestfood')
        .then(res => this.setState({ 
            request: res.data.filter(ffp=>{
            return ffp.ris_id===this.props.match.params.id;
            }),
            init:1, 
            authority:role,
        }));*/
       await fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood`,{
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
                        return ffp.ris_id===this.props.match.params.id;
                        }),
                        init:1, 
                        authority:role,
                });
             }
          })

       // console.log(this.state.request);
        if (typeof this.state.request !== 'undefined' && this.state.request.length > 0) {
            const [{ 
                ris_id, 
                emp_id,
                purpose, 
                entity_name, 
                fund_cluster, 
                division, 
                center_code, 
                office, 
                created_at, 
                quantity_requested, 
                quantity_released, 
                issued_by, 
                designation1, 
                approved_by, 
                designation2, 
                received_by, 
                designation3, 
                allocated, 
                percentage, 
                released, 
                returned,
                rpercentage,
                requested_by,
                ratio_id, 
                prepared_by,
                designation4,
                provider,
                distributed,
                purpose_type,
                destination,
                date_request,
                status,
                delivery_site,
                delivery_date,
                contact_person,
                contact_number
            }] = this.state.request;
            this.setState({
                ris_id:ris_id,
                emp_id:emp_id,
                purpose:purpose,
                quantity_requested:quantity_requested,
                allocated:allocated,
                percentage:percentage,
                released:released,
                returned:returned,
                rpercentage:rpercentage,
                entity_name:entity_name, 
                fund_cluster:fund_cluster, 
                division:division, 
                center_code:center_code, 
                office:office, 
                created_at:created_at,
                quantity_released:quantity_released, 
                issued_by:issued_by, 
                designation1:designation1, 
                approved_by:approved_by, 
                designation2:designation2,
                received_by:received_by, 
                designation3:designation3,
                requested_by:requested_by,
                ratio_id:ratio_id,
                prepared_by:prepared_by,
                designation4:designation4,
                provider:provider,
                distributed:distributed,
                purpose_type:purpose_type,
                destination:destination,
                date_request:date_request,
                status:status,
                delivery_site:delivery_site,
                delivery_date:delivery_date,
                contact_person:contact_person,
                contact_number:contact_number               
            });

            /*await axios.get('/api/signatories')
            .then(res => this.setState({ 
                signatories: res.data, 
            }));*/
           await fetch(`${process.env.REACT_APP_API_PROXY}/api/signatories`,{
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
                        signatories: validation 
                    });
                 }
              })
            
            // cpnverts NaN into 0
            var value = released ? released : 0;
            this.computeComposition(quantity_requested,quantity_released, ratio_id);           
        }       

        fetch( `${process.env.REACT_APP_API_PROXY}/api/overviewbal`,{
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
                  carouselData: validation.filter(ffp=>{
                    return ffp.particular==='Food-Packs';
                   }) 
                });
             }
          })
      
    }
    onChange = e => {this.setState({
                [e.target.name]: e.target.value 
            })
            //console.log(this.state);
        }
    onSplit = (param)=>{
        if (param != null&&param!='undefined') {
            const arr = param.split('.');
            return arr[0] + "% complete";
        } else {
            return 0;
        }       
    } 
    onUpdate =()=>{
        //console.log('clicked');
        const { 
            entity_name, 
            fund_cluster,
            division,
            office,
            approved_by,
            issued_by,
            received_by,
            center_code,
            /* Destructure other fields... */ 
          } = this.state;
        const ris_info = {
            entity_name:entity_name, 
            fund_cluster:fund_cluster,
            division:division,
            office:office,
            approved_by:approved_by,
            issued_by:issued_by,
            received_by:received_by,
            center_code:center_code,
          }
          //console.log(ris_info);
          /*axios.put('/api/requestfood/updates/'+this.props.match.params.id, ris_info)
        .then(res => {
            this.setState({alert_message:"success"})
        }).catch(error=>{
            this.setState({alert_message:"error"})
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood/updates/`+this.props.match.params.id,{
            mode:'cors',
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                "accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}` 
            },
                body: JSON.stringify(ris_info)
            }).then(async response => {
                if (!response.ok) {
                const validation = await response.json();
                console.log(validation.errors);
                this.setState({alert_message:"error"})
            }else{
                //history('/categories')
                //const validation = await response.json();
                this.setState({alert_message:"success"})
                //console.log(validation)
            }
            })

        //this.onReload(); 
    }
    redirectToTarget = () => {
        this.props.history.push(`/request/editRIS/${this.props.match.params.id}`)
        //this.props.history.goBack
    }
    onBack = e =>{
        e.preventDefault();
        //const { transactionId } = this.state; 
        this.props.history.push(`/request`);
        this.props.onAdd();
    }
    onDisplay =(user)=>{
        var role = localStorage.getItem('roleDesig');
        var username = localStorage.getItem('react-username');
        const yes = 'none';
        const no = 'block';
        if(role==='manager'&& user === username){
            return yes;
        }
        return no;
    }
    onPreposition =(type)=>{
        //console.log(type);
        const yes = 'none';
        const no = 'inline';
        if(type==='Preposition'||type==='Replenishment'){
            return yes;
        }
        return no;
    }
    onAugmentation =(type)=>{
       // console.log(type);
        const yes = 'none';
        const no = 'inline';
        if(type==='Augmentation'){
            return yes;
        }
        return no;
    }
    onDisplayStatus =(destination)=>{

        var role = localStorage.getItem('roleDesig');
       // var username = localStorage.getItem('react-username');
        var desigArea   = localStorage.getItem('roleDesigArea');
       // console.log(user+'-u');
       // console.log(username+'-un');
        const yes = 'none';
        const no = 'block';
        if(role==='manager'&& destination != desigArea){
            return yes;
        }
        return no;
    }
    onRelease = (percent) =>{
        if(percent != '100.0000'|| percent != 100.0000){
            return 'none';
        }
        return '';
    }
    onCancelled = (stats,num) =>{
        if(stats === 'cancelled'||num===null){
            return 'none';
        }
        return '';
    }
    handleOnDelete = (ris_id) =>{
        //window.confirm('Selected ' + name);
        const ffprequest = {
            pending:2, 
          }
        confirmAlert({
    
          title: ris_id,
          message: 'Confirm Delete',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {   

                /*axios.put('/api/requestfood/deleteFoodRequest/'+ris_id, ffprequest)
                .then(res => {
                    this.setState({alert_message:"success"})
                    this.liveRedirectTime = setTimeout(()=>{ 
                    window.location.replace('/whims/request');
                    }, 2000);
                }).catch(error=>{
                    this.setState({alert_message:"error"})
                }); */
                fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood/deleteFoodRequest/`+ris_id,{
                    mode:'cors',
                    method: 'PUT',
                    headers: {
                        "Content-Type" : "application/json",
                        "accept" : "application/json",
                        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
                    },
                        body: JSON.stringify(ffprequest)
                    }).then(async response => {
                        if (!response.ok) {
                        const validation = await response.json();
                        console.log(validation.errors);
                        this.setState({alert_message:"error"})
                    }else{
                        //history('/categories')
                        //const validation = await response.json();
                        this.setState({alert_message:"success"})
                        //console.log(validation)
                    }
                    })
   

              }

            }
          ]
        });
    
      }
    render(){
        const { 
            ris_id, 
            quantity_requested,
            allocated,
            percentage,
            released, 
            rpercentage,
            returned,
            requested_by,
            purpose,
            emp_id,
            authority,
            provider,
            distributed,
            purpose_type,
            destination,
            status,
          } = this.state;
          //console.log(emp_id+'render');

        const { open } = this.state;
        return this.state.init ? <div>
        <React.Fragment>
                <Row>                   
                    <Col sm={8}>
                        <div id='forPrint' style={{padding:'1.25em'}}>
                        <div style={{display:this.onPreposition(purpose_type)}}>
                        <Printfile ref={el => (this.componentRefs = el)} print={this.state.composition} info={this.state} onBack={this.props.onBack} carouselData={this.state.carouselData}/>
                        <ReactToPrint
                                    trigger={() => 
                                        <Button variant='info' id='print'>Print</Button>
                                    }
                                    content={() => this.componentRefs}
                                    />
                                   
                        </div>
                        <div style={{display:this.onAugmentation(purpose_type)}}>
                        <PrintPreposition ref={el => (this.componentRef = el)} print={this.state.composition} info={this.state} onBack={this.props.onBack}/>
                        <ReactToPrint
                                    trigger={() => 
                                        <Button variant='info' id='print'>Print</Button>
                                    }
                                    content={() => this.componentRef}
                                    />
                                    
                        </div>
                            {this.state.alert_message=="success"?<DeleteAlert/>:null}
                            {this.state.alert_message=="error"?<ErrorAlert/>:null}
                            <div style={{marginBottom:'1.5em',display:'inline'}}>
                                <Button onClick={this.onBack} variant="secondary">
                                        Back
                                </Button>  

                                    <Button onClick={this.redirectToTarget}>Edit RIS</Button>
                                    <Button style={{float:"right"}} variant='danger' onClick={this.handleOnDelete.bind(this,ris_id)}>Delete</Button>
                            </div>                
                        </div>
                    </Col>
                    <Col sm={4}>
                        <br/>
                            <Card className="text-center">
                                <Card.Header>Requested Family Food Packs </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{quantity_requested}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">Quantity</Card.Footer>
                            </Card>
                        <br/>


                        {
                            this.state.isAdmin ? 
                            <div>
                                 <Card style={{display:this.onDisplay(emp_id)}} className="text-center">
                                    <Card.Header>Stockpile Composition</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{allocated} FFP's</Card.Title>
                                            <hr/>
                                            <Card.Title>{this.onSplit(percentage)}</Card.Title>
                                        </Card.Body>
                                        <Card.Footer className="text-muted">
                                            <Link 
                                            /*onClick={this.props.onAllocate.bind(this, ris_id, purpose, percentage, quantity_requested, allocated)}
                                            to={`/request/allocate/${ris_id}`}*/
                                            to={{
                                                pathname:`/request/allocate/${ris_id}`,
                                                auth: authority,
                                                provider:provider,
                                            }}
                                            >
                                                
                                                View
                                            </Link>
                                        </Card.Footer>
                                </Card><br/>
                                <Card style={{display:this.onDisplay(emp_id)}} className="text-center">
                                <Card.Header>Releases</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{released} FFP's</Card.Title>
                                        <hr/>
                                        <Card.Title>{this.onSplit(rpercentage)}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">

                                        <Link 
                                            style={{ pointerEvents: this.onCancelled(status,allocated) }}
                                            to={{
                                            pathname: '/request/release/',
                                            state: {
                                                ris_id: ris_id,
                                                purpose: purpose,
                                                percentage: percentage,
                                                quantity_requested: quantity_requested,
                                                allocated: allocated
                                            }
                                            }}>View</Link>
                                    </Card.Footer>
                            </Card><br/> 
                            <Card style={{display:this.onDisplayStatus(destination)}} className="text-center">
                                <Card.Header>Status</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{parseInt(returned)+parseInt(distributed)} FFP's</Card.Title>
                                        <hr/>
                                        <Card.Title>Returned/Pulled Out/Distributed FFPs</Card.Title>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                    <Link 
                                            /*style={{ pointerEvents: this.onRelease(rpercentage) }}*/
                                            to={{
                                            pathname: '/request/status/',
                                            state: {
                                                ris_id: ris_id,
                                                purpose: purpose,
                                                percentage: percentage,
                                                quantity_requested: quantity_requested,
                                                allocated: allocated,
                                                destination: destination,
                                                purpose_type: purpose_type,
                                                released: released
                                            }
                                            }}>View</Link>
                                    </Card.Footer>
                            </Card><br/>
                            </div>: <div></div>
                        }
                            


                            
                            
                    </Col>
                </Row>    
        </React.Fragment>
        </div> : <div>loading...</div>;
    }
    
}

