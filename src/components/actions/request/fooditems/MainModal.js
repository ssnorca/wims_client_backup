import React from "react";
import Modal from 'react-responsive-modal';
export default class MainModal extends React.Component {
  render() {
    return <Modal open={this.props.open} onClose={this.props.onCloseModal} center>
          <div>{this.props.children}</div>
        </Modal>
  }
}