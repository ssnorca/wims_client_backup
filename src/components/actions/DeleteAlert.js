import React, {Component} from 'react';
import { Alert } from "shards-react";

class DeleteAlert extends Component{
    render(){
      return(
        <div>
             <Alert theme="primary">
                Successfully Deleted
            </Alert>
        </div>
      );
    }
  }

export default DeleteAlert;