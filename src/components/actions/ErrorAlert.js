import React, {Component} from 'react';
import { Alert } from "shards-react";

class ErrorAlert extends Component{
    render(){
      return(
        <div>
             <Alert theme="danger">
                An Error Occured, Entry not Saved
            </Alert>
        </div>
      );
    }
  }

export default ErrorAlert;