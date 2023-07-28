import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import {BrowserRouter as Router,Link} from 'react-router-dom';
export default class Food extends Component{
    /*state = {
        open: false,
        ris:''
    };*/
    onSplit = (param)=>{
        if (param != null) {
          const arr = param.split('.');
          return arr[0] + "% complete";
        } else {
          return 0;
        }       
      } 
    getStyle = (e)=>{
        if(e){
            return {
                backgroundColor: 'lavender'
            }
        }else{
            return{
                textDecoration:'none'
            }
        }
    }
    findStatus =(id)=>{
        const ready = 'badge badge-success badge-pill';
        const not = 'badge badge-warning badge-pill';
        if(id===0){
            return ready
        }return not
    }
    findPercentage =(percent)=>{
        const num = Number.parseInt(percent, 10)
        const ready = 'badge badge-success badge-pill';
        const not = 'badge badge-secondary badge-pill';
        const nan = 'badge badge-warning badge-pill';
        if (isNaN(num)) {
            return nan;
        }else{
            if(num===100||num==='100'){
                return ready
            }return not
        }
       
        //console.log(num);
    }
    render(){
    return (
        <div>
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Prepared By</th>
                    <th>Purpose</th>
                    <th>Requested Qty.</th>
                    <th>Date Request</th>
                    <th>Approved Allocation</th>                   
                    <th>Released Qty.</th>
                    <th>Returned Qty.</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.props.requests.map((item)=>{
                        return(
                            <tr key={item.ris_id} style={this.getStyle(item.pending)}>
                                <td>
                                    <span className={this.findStatus(item.pending)} >
                                        {item.ris_id}
                                    </span>
                                </td>
                                <td>{item.emp_id}</td>
                                <td>
                                    {item.purpose}
                                </td>
                                <td>{item.quantity_requested}</td>
                                <td>{item.created_at}</td>
                                <td>
                                <p style={{display:'inline',fontSize:'13px',fontStyle:'bold'}}>{item.allocated} FFP's</p>
                                <p style={{fontSize:'13px',fontStyle:'italic',marginBottom:'-5px'}}>
                                    <span className={this.findPercentage(item.percentage)} >
                                        {this.onSplit(item.percentage)}
                                    </span>    
                                </p>                            
                                </td>
                                <td>
                                <p style={{display:'inline',fontSize:'13px',fontStyle:'bold'}}>{item.released} FFP's</p>
                                <p style={{fontSize:'13px',fontStyle:'italic'}}>
                                <span className={this.findPercentage(item.rpercentage)} >
                                        {this.onSplit(item.rpercentage)}
                                    </span>
                                </p>                                                       
                                </td>
                                <td>
                                <p style={{display:'inline',fontSize:'13px',fontStyle:'bold'}}>{item.returned} FFP's</p> 
                                </td>
                                <td>
                                    <Button>Select</Button>
                                </td>
                                </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    </div>
    );
    }
    
}

