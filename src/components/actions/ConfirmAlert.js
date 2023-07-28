import React from "react";
import ReactDOM from "react-dom";

class ConfirmDialog extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="dialog">
          <div>confirm dialog</div>
          <button onClick={() => this.props.callback("yes")}>Yes</button>
          <button onClick={() => this.props.callback("no")}>No</button>
        </div>
      );
    }
  }

export default ConfirmDialog;