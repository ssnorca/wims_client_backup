import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
export default class Printfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem('react-username')
        }
    }
    componentDidMount(){
        
    }
    
    
    render(){
        //console.log(this.props.info);
        /*const { 
            ris_id, 
            purpose,
            requested_by, 
            date_request, 
            quantity_requested, 
            released, 
            pending 
        } = this.props.print;*/
        const { 
            ris_id,
            emp_id,
            quantity_requested,
            quantity_released,
            purpose,
            center_code,
            requested_by,
            entity_name, 
            fund_cluster,
            division,
            office,
            approved_by,
            issued_by,
            received_by,
            prepared_by,
            designation1,
            designation2,
            designation3,
            designation4
        } = this.props.info;
        
    return(
       <div>
                <Table className="table table-bordered table-sm" responsive="sm">

                <tbody >
                    <tr style={{textAlign:'center',fontWeight:'bold'}}>

                        <td colSpan={3}>
                        <img
                            style={{marginLeft: '1px',marginTop: '10px'}}
                            src={require("./../../../../images/dswd/dswd.png")}
                            alt="User Avatar"
                        /> 
                                                <img
                            style={{ marginLeft:'58px'}}                    
                            src={require("./../../../../images/dswd/dswdlogo.png")}
                            alt="User Avatar"
                        /> 
                        </td>
                        <td colSpan={5}>
                                <p style={{textAlign:'center',marginTop:'5px', fontSize:'16px'}}>DISASTER RESPONSE MANAGEMENT DIVISION</p>
                                <p style={{textAlign:'center',marginTop:'-30px', fontSize:'16px'}}>FIELD OFFICE CARAGA</p>
                                <p style={{textAlign:'center',marginTop:'-30px', fontSize:'12px',marginBottom:'-2px', fontStyle:'italic'}}> DSWD-DRMG-GF-003 | REV 00 | 21 MAR 2022</p>

                        </td>
                    </tr>
                    <tr style={{textAlign:'center',fontWeight:'bold',border:'none'}}>
                        <td colSpan={5}>
                            -
                        </td>
                        <td colSpan={1} style={{border:'none',textAlign:'center'}}>
                                    <strong><p style={{marginBottom:'1px'}}>DRN</p></strong>
                                    <p style={{marginLeft:'130px', marginTop:'6px', fontSize:'11px', position:'absolute', fontStyle:'italic'}}>Appendix 63</p>
                        </td>
                    </tr>
                <tr style={{textAlign:'center',fontWeight:'bold'}}>
                        <td colSpan={8}>
                            REQUISITION ISSUE SLIP (RIS)
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <strong><p>Office/Bureau :</p></strong><span>{entity_name}</span>
                        </td>
                        <td colSpan={3}>
                            <strong><p>Fund Cluster :</p></strong><span>{fund_cluster}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <strong><p>Division :</p></strong>
                            <span>{division}</span>
                        </td>
                        <td colSpan={3}>
                            <strong><p>Responsibility Center Code :</p></strong>
                            <span>{center_code}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}><strong><p>Address :</p></strong> <span>{office}</span></td>
                        <td colSpan={3}><strong><p>RIS No. :</p></strong> {ris_id}</td>
                    </tr>
                    <tr>
                        <td colSpan={4}><strong><p>Requisition</p></strong></td>
                        <td colSpan={2}><strong><p>Stock Available ?</p></strong></td>
                        <td colSpan={2}><strong><p>Issue :</p></strong></td>
                    </tr>
                    <tr>
                        <td>Stock no.</td>
                        <td>Unit</td>
                        <td>Description</td>
                        <td>Quantity</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>Quantity</td>
                        <td>Remarks</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {
                            this.props.print.map((item)=>{
                                return(
                                    <tr key={item.name_}>
                                        <td>-</td>
                                        <td>{item.unit}</td>
                                        <td>{item.name_}</td>
                                        <td>{item.quantity_requested}</td>
                                        <td></td>
                                        <td></td>
                                        <td>{item.quantity_release}</td>
                                        <td>-</td>
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
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Delivery Site :</td>
                        <td colSpan={1}>-</td>
                        <td style={{textAlign:'center'}} colSpan={5}><strong>Returned/Cancelled Items</strong></td>

                    </tr>
                    <tr>
                        <td colSpan={2}>Delivery Date :</td>
                        <td colSpan={1}>-</td>
                        <td colSpan={1}>Date</td>
                        <td colSpan={2}>Particular</td>
                        <td colSpan={1}>Quantity</td>
                        <td colSpan={1}>Certified By</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Contact Number :</td>
                        <td colSpan={1}>-</td>
                        <td colSpan={1}>-</td>
                        <td colSpan={2}>-</td>
                        <td colSpan={1}>-</td>
                        <td colSpan={1}>-</td>
                    </tr>
                    <tr>
                        <td colSpan={8}>Purpose : {purpose}</td>
                    </tr>
                    <tr style={{textAlign:'center'}}>
                        <td colSpan={2}></td>
                        <td><strong><p>Requested By :</p></strong> </td>
                        <td colSpan={2}><strong><p>Approved By :</p></strong></td>
                        <td colSpan={2}><strong><p>Issued By :</p></strong></td>
                        <td><strong><p>Received By :</p></strong></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><p>Signature :</p></td>
                        <td><strong></strong></td>
                        <td colSpan={2}><strong></strong></td>
                        <td colSpan={2}><strong>-</strong></td>
                        <td><strong>-</strong></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><p>Printed Name :</p></td>
                        <td style={{textAlign:'center'}}><strong>{prepared_by}</strong></td>
                        <td style={{textAlign:'center'}} colSpan={2}><strong>{approved_by}</strong></td>
                        <td style={{textAlign:'center'}} colSpan={2}><strong>{issued_by}</strong></td>
                        <td style={{textAlign:'center'}}><strong>{received_by}</strong></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><p>Designation :</p></td>
                        <td style={{textAlign:'center'}}><strong>{designation4}</strong></td>
                        <td style={{textAlign:'center'}} colSpan={2}><strong>{designation2}</strong></td>
                        <td style={{textAlign:'center'}} colSpan={2}><strong>{designation1}</strong></td>
                        <td style={{textAlign:'center'}}><strong>{designation3}</strong></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><p>Date :</p></td>
                        <td><strong>-</strong></td>
                        <td colSpan={2}><strong>-</strong></td>
                        <td colSpan={2}><strong>-</strong></td>
                        <td><strong>-</strong></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={8}>
                            <p style={{textAlign:'center',marginTop:'30px', fontSize:'12px'}}>DSWD Field Office Caraga, R. Palma Street, Butuan City, Philippines (8600)</p>
                            <p style={{textAlign:'center',marginTop:'-30px', fontSize:'12px'}}> Website: http://www.caraga.dswd.gov.ph Tel Nos.: (085) 342-5619  Telefax: __________________</p>
                        </td>
                    </tr>

                </tfoot>
            </Table>  
        </div>
        );
    }
    
}
