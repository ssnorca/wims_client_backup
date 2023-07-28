import React, {Component} from 'react';
import { Alert } from "shards-react";

class ConfirmationAlert extends Component{
    render(){
      return(
        <div>
             <Alert theme="success">
                Request is being processed, Please Wait for a text message confirming your validation. Thank You
            </Alert>
        </div>
      );
    }
  }

export default ConfirmationAlert;