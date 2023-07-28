import React, {Component} from 'react';
import AddRequest from './AddRequest';
import { ListGroup } from 'react-bootstrap';
import {BrowserRouter as Router,Link} from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
export default class OperationUse extends Component{

    findStatus =(id)=>{
        const ready = 'badge badge-info badge-pill';
        const not = 'badge badge-warning badge-pill'
        if(id===0){
            return not
        }return ready
    }
    setStatus =(id)=>{
        const ready = 'Reconditioned';
        const not = 'Pending';
        if(id===0){
            return not
        }return ready
    }
    render(){
    return(
        <React.Fragment>
                <ReactSearchAutocomplete
                    items={this.props.listData}
                    onSearch={this.props.handleOnSearch}
                    onSelect={this.props.handleOnSelect}
                    /*onFocus={this.handleOnFocus}*/
                    autoFocus
                    fuseOptions={{ keys: ["ris_id","emp_id"] }}
                    resultStringKeyName="ris_id"
                />
                <ListGroup>
                    {
                        this.props.listData.map((item)=>{
                            return(
                                <ListGroup.Item key={item.id}>
                                    <p style={{display:'inline',fontSize:'15px',fontStyle:'bold',marginRight:'20px'}}>{item.destination}</p>
                                    <span className={this.findStatus(item.status)} >
                                        {this.setStatus(item.status)}
                                    </span>
                                   
                                    <p style={{display:'inline',fontSize:'13px',fontStyle:'bold',float:'right',marginLeft:'40px'}}>
                                    <Link className="badge badge-primary badge-pill" 
                                        to={{
                                            pathname:`/request/forcondition/${item.id}`,
                                            status: item.status,
                                        }}>View
                                    </Link>
                                    </p>
                                    <p style={{display:'inline',fontSize:'13px',fontStyle:'italic',float:'right',marginLeft:'20px'}}>{item.created_at}</p>  
                                    <p style={{display:'inline',fontSize:'13px',fontStyle:'bold',float:'right',marginLeft:'40px'}}>{item.returned} Family Food-Packs</p> 
                                    <p style={{display:'inline',fontSize:'13px',fontStyle:'bold',float:'right'}}>{item.ris_id}</p> 
                                    
                                </ListGroup.Item>
                            )
                        })
                    }

                </ListGroup>
        </React.Fragment>
        );
    }
    
}

