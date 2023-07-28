import React, {Component} from 'react';
import { Table, Button } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import ReactToPrint from 'react-to-print';
export default class Printfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
           open: false,
        }
    }
    onOpenModal = () => {
        this.setState({ open: true });
      };
      onCloseModal = () => {
        this.setState({ open: false });
      };
    render(){
        const { open, } = this.state;
        const { purpose, production_date, expiration_date} = this.props.info;
    return(

        <div >
                <Button
                    variant='danger'
                          onClick={this.onOpenModal} >Print</Button>
            <Modal open={open} onClose={this.onCloseModal} center>
                <Table ref={el => (this.componentRef = el)} className="table table-bordered table-sm" responsive="sm" style={{marginTop:'10px'}}>
                    <caption style={{ textAlign:'center', captionSide:'top',fontWeight:'bold',marginTop:'-10px' }}>DEPARTMENT OF SOCIAL WELFARE AND DEVELOPMENT</caption>
                    <caption style={{ textAlign:'center', captionSide:'top',fontWeight:'bold',marginTop:'-20px'  }}>RROS Warehousing Unit</caption>
                    <caption style={{ textAlign:'center', captionSide:'top',fontWeight:'bold',marginTop:'-20px'  }}>DSWD Regional Office (Caraga)</caption>
                    <caption style={{ textAlign:'center', captionSide:'top',fontWeight:'bold',marginTop:'-20px'  }}>FAMILY FOOD-PACKS PRODUCTION FORM</caption>
                    <tbody >
                    <tr>
                        <td colSpan={3}>
                            <strong><p>Production Date :</p></strong><span>{production_date}</span>
                        </td>
                        <td colSpan={3}>
                            <strong><p>Expiration Date :</p></strong><span>{expiration_date}</span>
                        </td>
                    </tr>
                        <tr>
                            <td>Stock No.</td>
                            <td>Description</td>
                            <td>Quantity</td>
                            <td>Unit</td>
                            <td>Percentage</td>
                            <td>Remarks</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {
                                this.props.print.map((item)=>{
                                    return(
                                        <tr key={item.id}>
                                            <td>-</td>
                                            <td>{item.particular}</td>
                                            <td>{item.quantity_requested}</td>
                                            <td>-</td>
                                            <td>{item.percentage}</td>
                                            <td>{item.request_status}</td>
                                        </tr>
                                    )
                                })
                            }
                        <tr>
                            <td>-</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={6}>Purpose : {purpose}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Signature :</td>
                            <td colSpan={4}>-</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Prepared By :</td>
                            <td colSpan={4}>-</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Designation :</td>
                            <td colSpan={4}>-</td>
                        </tr>
                    </tbody>
                </Table> 
                <ReactToPrint
                                    trigger={() => 
                                        <Button variant='danger' id='print'>Print</Button>
                                    }
                                    content={() => this.componentRef}
                                    />
            </Modal>
         
</div>
        );
    }
}