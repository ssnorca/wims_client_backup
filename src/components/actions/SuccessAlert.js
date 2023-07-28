import React, {Component} from 'react';
import { Alert } from "shards-react";

class SuccessAlert extends Component{
    render(){
      return(
        <div>
             <Alert theme="primary">
                Successfully Saved
            </Alert>
        </div>
      );
    }
  }

export default SuccessAlert;