import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
class UserList extends Component{

   
    onConvert = (param)=>{
        if (param) {
          const arr = 'true';
          return arr;
        } else {
          const arr = 'false';
         return arr;
        }       
    } 
    render(){
      return(
        <div>
            <Table responsive>
                <thead>
                    <tr>
                    <th>Username</th>
                    <th>Authorization</th> 
                    <th>Validity</th>
                    <th>Date</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.props.employee.map((item)=>{
                        const {id, username} = this.props;
                        return(
                            
                            <tr key={item.id}>
                                <td>{item.username}</td>
                                <td>{item.designation}</td>
                                <td>{this.onConvert(item.valid)}</td>
                                <td>{item.created_at}</td>
                                <td>
                                <Button size="sm" id={item.id} value={item.name} onClick={this.props.handleOnView.bind(this, item.id, item.username, item.firstname, item.lastname, item.email, item.division, item.section, item.designation, item.valid, item.contact, item.area)}>Select</Button>
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

export default UserList;