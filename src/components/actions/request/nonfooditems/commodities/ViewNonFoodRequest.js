import React, {Component} from 'react';
import {Button, Container, Row , Form, Col, Card} from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import Printfile from '../PrintFile';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import ErrorAlert from '../../../ErrorAlert';
import DeleteAlert from '../../../DeleteAlert';
//import axios from '../../../../../axios';
class ViewNonFoodRequest extends Component{
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
        quantity_requested:'',
        quantity_released:'',
        designation1:'',
        designation2:'',
        designation3:'',
        designation4:'',
        personnel:'', 
        alert_message:'',
        composition:[],
        particular_c:'',
        particular_ou:'',
        particular_pm:'',
        /* Initialize all text fields with empty strings. */
      }
}

computeComposition =(e)=>{
  var arrpm=[];
  var arrou=[];
  var arrc=[];
  var pm = 0;
  var ou = 0;
  var c = 0;
  var i=0;
  this.state.composition.map((item)=>{
    var particular = item.particular;
    //console.log(particular);
    if (particular==='Packing Materials'){		
      arrpm.push({particular})	
    }else if(particular==='Operations Use'){
      arrou.push({particular})
    }else{
      arrc.push({particular})
    }

})

do {
  i = i + 1;
  switch(i) {
      case 1:
         this.setState({particular_c:arrc.length});
      case 2:
         //console.log(parseInt(e,10) *4);
         this.setState({particular_ou:arrou.length});
      case 3:
         //console.log(parseInt(e,10) *4);
         this.setState({particular_pm:arrpm.length});
      default:
        return 'foo';
    }
  } while (i <= 3) ;


  
  
}  

async componentDidMount() {

  var role = localStorage.getItem('roleDesig');

  //console.log(role);
  if(role==='admin'){
    this.setState({ isAdmin: true });
  }

 /* await axios.get('/api/nonfood')
  .then(res => this.setState({ 
      request: res.data.filter(ffp=>{
      return ffp.ris_id===this.props.match.params.id;
      }),
      init:1, 
  }));*/
 await fetch(`${process.env.REACT_APP_API_PROXY}/api/nonfood`,{
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
        });
     }
  });

  /*await axios.get('/api/itemallocation')
  .then(res => this.setState({ 
    composition: res.data.filter(ffp=>{
        return ffp.ris_id===this.props.match.params.id;
      }),
      init:1,  
  }));*/
 await fetch(`${process.env.REACT_APP_API_PROXY}/api/itemallocation`,{
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
          composition: validation.filter(ffp=>{
            return ffp.ris_id===this.props.match.params.id;
          }),
          init:1,  
        });
     }
  })
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
      prepared_by, 
      designation4,
      allocated, 
      percentage, 
      released, 
      rpercentage,
      requested_by 
  }] = this.state.request;
  this.setState({
      ris_id:ris_id,
      emp_id:emp_id,
      purpose:purpose,
      quantity_requested:quantity_requested,
      allocated:allocated,
      percentage:percentage,
      released:released,
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
      prepared_by: prepared_by,
      designation4: designation4
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

  this.computeComposition();
  //console.log(this.state);
  }
  
}

onChange = e => {this.setState({
  [e.target.name]: e.target.value 
})
//console.log(this.state);
}
componentWillUnmount(){
  //console.log('index unmounted');
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  /*axios.get('/api/nonfood', {
      cancelToken: source.token
    }).catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // handle error
      }
    });

    axios.get('/api/itemallocation', {
      cancelToken: source.token
    }).catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // handle error
      }
    });*/
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
      prepared_by,
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
      prepared_by:prepared_by
    }
    //console.log(ris_info);
    /*axios.put('/api/nonfood/updates/'+this.props.match.params.id, ris_info)
  .then(res => {
      this.setState({alert_message:"success"})
  }).catch(error=>{
      this.setState({alert_message:"error"})
  });*/
  fetch(`${process.env.REACT_APP_API_PROXY}/api/nonfood/updates/`+this.props.match.params.id,{
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
         //console.log(validation.errors);
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
  this.props.history.push(`/request/editRISnf/${this.props.match.params.id}`)
  //this.props.history.goBack
}
onBack = e =>{
  e.preventDefault();
  this.props.history.push(`/request/`);
  this.props.onReload();
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
          /*axios.put('/api/nonfood/deleteNonFoodRequest/'+ris_id, ffprequest)
          .then(res => {
              this.setState({alert_message:"success"})
              this.liveRedirectTime = setTimeout(()=>{ 
                window.location.replace('/whims/request');
              }, 2000);
          }).catch(error=>{
              this.setState({alert_message:"error"})
          });  */
          fetch(`${process.env.REACT_APP_API_PROXY}/api/nonfood/deleteNonFoodRequest/`+ris_id,{
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
              //console.log(validation.errors);
              this.setState({alert_message:"error"})
            }else{
              //history('/categories')
              //const validation = await response.json();
              this.setState({alert_message:"success"})
              this.liveRedirectTime = setTimeout(()=>{ 
                window.location.replace('/whims/request');
              }, 2000);
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
      particular_c,
      particular_ou,
      particular_pm,
      purpose
    }  = this.state;
    
    return this.state.init ? <div>
    <React.Fragment>
            <Row>                   
                <Col sm={8}>
                    <div id='forPrint' style={{padding:'1.25em'}}>
                    <Printfile ref={el => (this.componentRef = el)} print={this.state.composition} info={this.state} onBack={this.props.onBack}/>
                        <div style={{marginBottom:'1.5em'}}>
                            {this.state.alert_message=="success"?<DeleteAlert/>:null}
                            {this.state.alert_message=="error"?<ErrorAlert/>:null}
                            <Button onClick={this.onBack} variant="secondary">
                                    Back
                            </Button>  
                            <ReactToPrint
                                trigger={() => 
                                    <Button variant='info' id='print'>Print</Button>
                                }
                                content={() => this.componentRef}
                                />
                                <Button onClick={this.redirectToTarget}>Edit RIS</Button>
                                <Button style={{float:"right"}} variant='danger' onClick={this.handleOnDelete.bind(this,ris_id)}>Delete</Button>
                        </div>                
                    </div>
                </Col>
                <Col sm={4}>
                    <br/>
                        <Card className="text-center">
                            <Card.Header>Commodities</Card.Header>
                            <hr/>
                                <Card.Body>
                                  {/** <Card.Title>Number of Items</Card.Title>*/}
                                    
                                  <Card.Title>{particular_c}</Card.Title>
                                </Card.Body>
                                <Card.Footer className="text-muted">
                            {
                            this.state.isAdmin ? 
                            <div>
                              <Link 
                                  to={`/request/nonfoodalloc/${ris_id}`+`_`+`Commodities`}>
                                      View |
                              </Link> 
                              <Link 
                                to={`/request/nonfoodcomposition/${ris_id}`+`_`+`Commodities`}>
                                    Composition
                              </Link> | <Link 
                                to={`/request/nonfoodrelease/${ris_id}`+`_`+`Commodities`}>
                                    Releases
                              </Link>
                            </div>:
                            <div>
                                  <Link 
                                  to={`/request/nonfoodalloc/${ris_id}`+`_`+`Commodities`}>
                                      View
                                  </Link> 
                            </div>
                            }
                                  

                                  
                                </Card.Footer>
                        </Card>
                    <br/>
                        <Card className="text-center">
                            <Card.Header>Operation Use</Card.Header>
                            <hr/>
                                <Card.Body>
                                    {/** <Card.Title>Number of Items</Card.Title>*/}
                                   
                                    <Card.Title>{particular_ou}</Card.Title>
                                </Card.Body>
                                <Card.Footer className="text-muted">

                                {
                                  this.state.isAdmin ? 
                                  <div>
                                    <Link 
                                        to={`/request/nonfoodalloc/${ris_id}`+`_`+`Operations Use`}>
                                            View |
                                    </Link> 
                                    <Link 
                                      to={`/request/nonfoodcomposition/${ris_id}`+`_`+`Operations Use`}>
                                          Composition
                                    </Link> | <Link 
                                      to={`/request/nonfoodrelease/${ris_id}`+`_`+`Operations Use`}>
                                          Releases
                                    </Link>
                                  </div>:
                                  <div>
                                        <Link 
                                        to={`/request/nonfoodalloc/${ris_id}`+`_`+`Operations Use`}>
                                            View
                                        </Link> 
                                  </div>
                                  }


                                </Card.Footer>
                        </Card><br/>
                        <Card className="text-center">
                            <Card.Header>Packing Materials</Card.Header>
                            <hr/>
                                <Card.Body>
                                    {/** <Card.Title>Number of Items</Card.Title>*/}
                                    
                                    <Card.Title>{particular_pm}</Card.Title>
                                </Card.Body>
                                <Card.Footer className="text-muted">

                                {
                                  this.state.isAdmin ? 
                                  <div>
                                    <Link 
                                        to={`/request/nonfoodalloc/${ris_id}`+`_`+`Packing Materials`}>
                                            View |
                                    </Link> 
                                    <Link 
                                      to={`/request/nonfoodcomposition/${ris_id}`+`_`+`Packing Materials`}>
                                          Composition
                                    </Link> | <Link 
                                      to={`/request/nonfoodrelease/${ris_id}`+`_`+`Packing Materials`}>
                                          Releases
                                    </Link>
                                  </div>:
                                  <div>
                                        <Link 
                                        to={`/request/nonfoodalloc/${ris_id}`+`_`+`Packing Materials`}>
                                            View
                                        </Link> 
                                  </div>
                                  }

                                </Card.Footer>
                        </Card><br/>
                        
                </Col>
            </Row>    
    </React.Fragment>
    </div> : <div>loading...</div>;
    }
  }

export default ViewNonFoodRequest;