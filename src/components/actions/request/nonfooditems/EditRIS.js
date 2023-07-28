import React, {Component} from 'react';
import { Button, Col, Form} from 'react-bootstrap';
import ErrorAlert from '../../ErrorAlert';
import SuccessAlert from '../../SuccessAlert';
import axios from 'axios';
import ReactDropdownAutoComplete from 'react-dropdown-autocomplete';
//import axios from '../../../../axios';
export default class EditRIS extends Component{
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
            alert_message:'',
            init:0,
            request:[],
            signatories:[],
            editFields:'',
            approved_id:'',
            issued_id:'',
            received_id:'',
            issuedbyDesignation:'',
            approvedbyDesignation:'',
            receivedbyDesignation:'',
            approveErr:'',
            issueErr:'',
            receiveErr:'',
            prepared_id:'',
            prepared_by:'',
            preparedbyDesignation:'',
            prepareErr:''
            /* Initialize all text fields with empty strings. */
          }
    }
    onUpdate =()=>{
        //console.log('clicked');
        const { 
            entity_name, 
            fund_cluster,
            division,
            office,
            approved_id,
            issued_id,
            received_id,
            center_code,
            prepared_id
 
          } = this.state;
          //const [{id:approveid}] = this.state.approved_id;
          //const [{id:issueid}] = this.state.issued_id;
          //const [{id:receivedid}] = this.state.received_id;
          const ris_info = {
            entity_name:entity_name, 
            fund_cluster:fund_cluster,
            division:division,
            office:office,
            approved_by:approved_id,
            issued_by:issued_id,
            received_by:received_id,
            prepared_by:prepared_id,
            center_code:center_code,
          }
          if(approved_id === '' ||issued_id === ''||prepared_id === ''){
            window.alert("Kindly Re-enter the Signatory Values by clicking the names"); 
           }
          else if(approved_id === 0 ||issued_id === 0||received_id === 0){
            if(issued_id === 0){
                window.alert("Entry not yet saved: Issued By"); 
            }if(received_id === 0){
                window.alert("Entry not yet saved: Received By"); 
            }if(approved_id === 0){
                window.alert("Entry not yet saved: Approved By"); 
            }
            
          }else{
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
            this.liveRedirectTime = setTimeout(()=>{ 
                    this.props.history.push(`/request/viewnonfood/${this.props.match.params.id}`)
                }, 3000);
         }
          
    }
    
    async componentDidMount() {          
        //const { ris_id } = this.props.print;
        /*await axios.get('/api/nonfood')
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
                        init:1, 
                });
             }
          })
        const [{  
            entity_name, 
            fund_cluster, 
            division, 
            center_code, 
            office, 
            ib_id, 
            ab_id, 
            rb_id,  
            issued_by,
            approved_by,
            received_by,
            prepared_by,
        }] = this.state.request;
        this.setState({
            entity_name:entity_name, 
            fund_cluster:fund_cluster, 
            division:division, 
            center_code:center_code, 
            office:office, 
            issued_by:issued_by,  
            approved_by:approved_by, 
            received_by:received_by,
            prepared_by:prepared_by
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

    }
    onChange = e => {this.setState({
        [e.target.name]: e.target.value 
    })
    //console.log(this.state);
}

handleOnApproved = (e) =>{
        
    //const res = this.state.signatories.filter(it => it.name.includes(e));
    //console.log(name, designation);
   if(this.state.signatories.filter(it => it.name.includes(e)).length>0){
    const [{id,designation}] = this.state.signatories.filter(it => it.name.includes(e));

        this.setState({
            approved_by: e,
            approved_id: id,
            approvedbyDesignation: designation
        })
    }else{
        this.setState({
            approved_by: e,
            approved_id: 0
        })
        //console.log('time to insert new enttry.');
    }
    
  
  }

  handleOnIssued = (e) =>{

    if(this.state.signatories.filter(it => it.name.includes(e)).length>0){
    const [{id,designation}] = this.state.signatories.filter(it => it.name.includes(e));
        this.setState({
            issued_by: e,
            issued_id: id,
            issuedbyDesignation: designation
        }) 
    }else{
        this.setState({
            issued_by: e,
            issued_id: 0
        })
    }
     
}


handleOnReceived = (e) =>{
    //console.log(e);
    if(this.state.signatories.filter(it => it.name.includes(e)).length>0){
        const [{id,designation}] = this.state.signatories.filter(it => it.name.includes(e));
        this.setState({
            received_by: e,
            received_id: id,
            receivedbyDesignation: designation
        }) 
    }else{
        this.setState({
            received_by: e,
            received_id: 0
        })
    }
       
}
onBack = e =>{
    e.preventDefault(); 
    this.props.history.push(`/request/viewnonfood/${this.props.match.params.id}`);
  }
  canSave = (type,id) => {
    
    if (type==='a'){
        //console.log(id);
        if(id===0){
            return 'plus-circle';
        }       
    }

    if (type==='r'){
        //console.log(id);
        if(id===0){
            return 'plus-circle';
        }       
    }
    if (type==='i'){
        //console.log(id);
        if(id===0){
            return 'plus-circle';
        }       
    }
    return '';
  };

  onAddapproved = () =>{
    //e.preventDefault();
    const isValid = this.validateApprove();
    if (isValid) { 
        const { 
            approved_by,
            approvedbyDesignation,    
        } = this.state;

        const signatories = {
            name_:approved_by,
            designation:approvedbyDesignation,
        }
        //console.log(signatories);
        /*axios.post('/api/signatoriesnew', signatories)
        .then(res => {
            //tempApproved = res.data.id;
            this.setState({approved_id:res.data.id})  
            window.alert("New Signatories Added: "+ res.data.name_);                 
        }).catch(error=>{
            window.alert("Something went wrong, Entry not added");
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/signatoriesnew`,{
            mode:'cors',
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}` 
            },
                body: JSON.stringify(signatories)
            }).then(async response => {
                if (!response.ok) {
                const validation = await response.json();
                console.log(validation.errors);
                this.setState({alert_message:"error"})
            }else{
                //history('/categories')
                const validation = await response.json();
                this.setState({approved_id:validation.id})  
                window.alert("New Signatories Added: "+ validation.name_);   
            }
            })

    }
  }
  validateApprove = () => {

    let approveErr = '';
    if (!this.state.approvedbyDesignation) {
        approveErr = "Designation cannot be Empty";
    }
    if (approveErr) {
        this.setState({ 
            approveErr:approveErr,
        });
        return false;
    }else{
        this.setState({ 
            approveErr:'',
        });
        return true;
    }
  }
  onAddissued = () =>{
    //e.preventDefault();
    const isValid = this.validateIssued();
    if (isValid) { 
        const { 
            issued_by,
            issuedbyDesignation,    
        } = this.state;

        const signatories = {
            name_:issued_by,
            designation:issuedbyDesignation,
        }
        //console.log(signatories);
        /*axios.post('/api/signatoriesnew', signatories)
        .then(res => {
            //tempApproved = res.data.id;
            this.setState({issued_id:res.data.id})  
            window.alert("New Signatories Added: "+ res.data.name_);                 
        }).catch(error=>{
            //this.setState({alert_message:"error"})
            window.alert("Something went wrong, Entry not added");
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/signatoriesnew`,{
            mode:'cors',
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}` 
            },
                body: JSON.stringify(signatories)
            }).then(async response => {
                if (!response.ok) {
                const validation = await response.json();
                console.log(validation.errors);
                this.setState({alert_message:"error"})
            }else{
                //history('/categories')
                const validation = await response.json();
                this.setState({issued_id:validation.id})  
                window.alert("New Signatories Added: "+ validation.name_);   
            }
            })
    }
  }
  validateIssued = () => {

    let issueErr = '';
    if (!this.state.issuedbyDesignation) {
        issueErr = "Designation cannot be Empty";
    }
    if (issueErr) {
        this.setState({ 
            issueErr:issueErr,
        });
        return false;
    }else{
        this.setState({ 
            issueErr:'',
        });
        return true;
    }
  }
  onAddreceived = () =>{
    //e.preventDefault();
    const isValid = this.validateReceived();
    if (isValid) { 
        const { 
            received_by,
            receivedbyDesignation,    
        } = this.state;

        const signatories = {
            name_:received_by,
            designation:receivedbyDesignation,
        }
        //console.log(signatories);
        /*axios.post('/api/signatoriesnew', signatories)
        .then(res => {
            //tempApproved = res.data.id;
            this.setState({received_id:res.data.id})  
            window.alert("New Signatories Added: "+ res.data.name_);                 
        }).catch(error=>{
            //this.setState({alert_message:"error"})
            window.alert("Something went wrong, Entry not added");
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/signatoriesnew`,{
            mode:'cors',
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}` 
            },
                body: JSON.stringify(signatories)
            }).then(async response => {
                if (!response.ok) {
                const validation = await response.json();
                console.log(validation.errors);
                this.setState({alert_message:"error"})
            }else{
                //history('/categories')
                const validation = await response.json();
                this.setState({received_id:validation.id})  
                window.alert("New Signatories Added: "+ validation.name_);   
            }
            })
    }
  }
  validateReceived = () => {

    let receiveErr = '';
    if (!this.state.receivedbyDesignation) {
        receiveErr = "Designation cannot be Empty";
    }
    if (receiveErr) {
        this.setState({ 
            receiveErr:receiveErr,
        });
        return false;
    }else{
        this.setState({ 
            issueErr:'',
        });
        return true;
    }
  }
  //
onAddprepared = () =>{
    //e.preventDefault();
    const isValid = this.validatePrepare();
    if (isValid) { 
        const { 
            prepared_by,
            preparedbyDesignation,    
        } = this.state;

        const signatories = {
            name_:prepared_by,
            designation:preparedbyDesignation,
        }
        //console.log(signatories);
        /*axios.post('/api/signatoriesnew', signatories)
        .then(res => {
            //tempApproved = res.data.id;
            this.setState({prepared_id:res.data.id})  
            window.alert("New Signatories Added: "+ res.data.name_);                 
        }).catch(error=>{
            window.alert("Something went wrong, Entry not added");
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/signatoriesnew`,{
            mode:'cors',
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}` 
            },
                body: JSON.stringify(signatories)
            }).then(async response => {
                if (!response.ok) {
                const validation = await response.json();
                console.log(validation.errors);
                this.setState({alert_message:"error"})
            }else{
                //history('/categories')
                const validation = await response.json();
                this.setState({prepared_id:validation.id})  
                window.alert("New Signatories Added: "+ validation.name_);   
            }
            })
    }
  }
  validatePrepare = () => {

    let prepareErr = '';
    if (!this.state.preparedbyDesignation) {
        prepareErr = "Designation cannot be Empty";
    }
    if (prepareErr) {
        this.setState({ 
            prepareErr:prepareErr,
        });
        return false;
    }else{
        this.setState({ 
            prepareErr:'',
        });
        return true;
    }
  }

  handleOnPrepared = (e) =>{
    //console.log(e);
    if(this.state.signatories.filter(it => it.name.includes(e)).length>0){
        const [{id,designation}] = this.state.signatories.filter(it => it.name.includes(e));
        this.setState({
            prepared_by: e,
            prepared_id: id,
            preparedbyDesignation: designation
        }) 
    }else{
        this.setState({
            prepared_by: e,
            prepared_id: 0
        })
    }
       
}
//
    render(){
        const { 
            entity_name, 
            fund_cluster,
            division,
            office,
            approved_by,
            issued_by,
            received_by,
            center_code,
            editFields,
            approved_id,
            approvedbyDesignation,
            issued_id,
            received_id,
            issuedbyDesignation,
            receivedbyDesignation,
            prepared_by,
            preparedbyDesignation,
            prepared_id
          } = this.state;
         
    return this.state.init ? <div>
               
                <p style={{textAlign:'center', marginLeft:'10px', fontWeight:'bold', color: '#6c757d'}}>ADDITIONAL INFORMATION</p>
                        <Form style={{marginRight:'15px',paddingLeft:'.75em'}}>                                                                  
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEntity">
                                        <Form.Label>Entity Name</Form.Label>
                                        <Form.Control type="text" name="entity_name" value={entity_name} placeholder="Enter Entity Name" onChange={this.onChange}/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridFundCluster">
                                        <Form.Label>Fund Cluster</Form.Label>
                                        <Form.Control type="text" name="fund_cluster" value={fund_cluster} placeholder="Enter Fund Cluster" onChange={this.onChange}/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridResponsibilityCode">
                                        <Form.Label>Responsibility Code</Form.Label>
                                        <Form.Control type="text" name="center_code" value={center_code} placeholder="Enter Responsibility Code" onChange={this.onChange}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridDivision">
                                        <Form.Label>Division</Form.Label>
                                        <Form.Control type="text" name="division" value={division} placeholder="Enter Division" onChange={this.onChange}/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridOffice">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="office" value={office} placeholder="Enter Office Address" onChange={this.onChange}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridApproved">
                                        <Form.Label>Requested By</Form.Label><br/>
                                        <ReactDropdownAutoComplete
                                                getItemValue={item => item.name}
                                                className="form-control"
                                                id="prepared_by"
                                                name="prepared_by"
                                                placeholder="Select Name"
                                                data={this.state.signatories}
                                                renderItem={item => (
                                                  <div
                                                    role="button"
                                                    tabIndex="-1"
                                                    onClick={(val) => { editFields.name = val; }}
                                                  >{item.name}</div>
                                                )}
                                                icon= {this.canSave('p',prepared_id)}
                                                iconColor="#ff000"
                                                iconClick={this.onAddprepared}
                                                value={prepared_by}
                                                onChange={this.handleOnPrepared}
                                                onEnter={(e) => {/*TODO  */}}
                                              />
                                       
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridApproved1">
                                        <Form.Label>Designation</Form.Label><br/>
                                        <Form.Control type="text" name="preparedbyDesignation" value={preparedbyDesignation} placeholder="Enter Designation" onChange={this.onChange}/>  
                                        <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.prepareErr}
                                                  </div> 
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridApproved">
                                        <Form.Label>Approved By</Form.Label><br/>
                                        {/*<select name="approved_by" value={approved_by}
                                                onChange={this.onChange}>
                                            {this.state.signatories.map((team) => <option key={team.id} value={team.id}>{team.name_}</option>)}
                                        </select>*/}
                                        <ReactDropdownAutoComplete
                                                getItemValue={item => item.name}
                                                className="form-control"
                                                id="approved_by"
                                                name="approved_by"
                                                placeholder="Select Name"
                                                data={this.state.signatories}
                                                renderItem={item => (
                                                  <div
                                                    role="button"
                                                    tabIndex="-1"
                                                    onClick={(val) => { editFields.name = val; }}
                                                  >{item.name}</div>
                                                )}
                                                icon= {this.canSave('a',approved_id)}
                                                iconColor="#ff000"
                                                iconClick={this.onAddapproved}
                                                value={approved_by}
                                                onChange={this.handleOnApproved}
                                                onEnter={(e) => {/*TODO  */}}
                                              />
                                       
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridApproved1">
                                            <Form.Label>Designation</Form.Label><br/>
                                            <Form.Control type="text" name="approvedbyDesignation" value={approvedbyDesignation} placeholder="Enter Designation" onChange={this.onChange}/>  
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                        {this.state.approveErr}
                                                    </div> 
                                        </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridIssued">
                                        <Form.Label>Issued By</Form.Label><br/>
                                        <ReactDropdownAutoComplete
                                                getItemValue={item => item.name}
                                                className="form-control"
                                                id="issued_by"
                                                name="issued_by"
                                                placeholder="Select Name"
                                                data={this.state.signatories}
                                                renderItem={item => (
                                                  <div
                                                    role="button"
                                                    tabIndex="-1"
                                                    onClick={(val) => { editFields.name = val; }}
                                                  >{item.name}</div>
                                                )}
                                                icon= {this.canSave('i',issued_id)}
                                                iconColor="#ff000"
                                                iconClick={this.onAddissued}
                                                value={issued_by}
                                                onChange={this.handleOnIssued}
                                                onEnter={(e) => {/*TODO  */}}
                                              />
                                              

                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridIssued1">
                                        <Form.Label>Designation</Form.Label><br/>
                                        <Form.Control type="text" name="issuedbyDesignation" value={issuedbyDesignation} placeholder="Enter Designation" onChange={this.onChange}/>  
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridReceived">
                                        <Form.Label>Received By</Form.Label><br/>
                                        <ReactDropdownAutoComplete
                                                getItemValue={item => item.name}
                                                className="form-control"
                                                id="received_by"
                                                name="received_by"
                                                placeholder="Select Name"
                                                data={this.state.signatories}
                                                renderItem={item => (
                                                  <div
                                                    role="button"
                                                    tabIndex="-1"
                                                    onClick={(val) => { editFields.name = val; }}
                                                  >{item.name}</div>
                                                )}
                                                icon= {this.canSave('r',received_id)}
                                                iconColor="#ff000"
                                                iconClick={this.onAddreceived}
                                                value={received_by}
                                                onChange={this.handleOnReceived}
                                                onEnter={(e) => {/*TODO  */}}
                                              />
                                        

                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridReceived">
                                        <Form.Label>Designation</Form.Label><br/>
                                        <Form.Control type="text" name="receivedbyDesignation" value={receivedbyDesignation} placeholder="Enter Designation" onChange={this.onChange}/>  
                                    </Form.Group>
                                </Form.Row>
                         
                        </Form>
                        {this.state.alert_message=="success"?<SuccessAlert/>:null}
                        {this.state.alert_message=="error"?<ErrorAlert/>:null}
                        <Button variant='success' onClick={this.onUpdate} id='update'>Update</Button>  
                        <Button onClick={this.onBack} variant="secondary">
                                    Back
                                </Button>
            </div> : <div>loading...</div>;

    }
   
}

