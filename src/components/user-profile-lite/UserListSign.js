import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
class UserListSign extends Component{

    render(){
      return(
        <div>
            <Table responsive>
                <thead>
                    <tr>
                    <th>User</th>
                    <th>Designation</th> 
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.props.employee.map((item)=>{
                        return(
                            
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.designation}</td>
                                <td>
                                <Button size="sm" id={item.id} value={item.name} onClick={this.props.handleOnView.bind(this, item.id, item.name, item.designation)}>Select</Button>
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

export default UserListSign;