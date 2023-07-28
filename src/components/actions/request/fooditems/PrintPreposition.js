import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
export default class PrintPreposition extends Component{
    constructor(props) {
        super(props);
        this.state = {
           username: localStorage.getItem('react-username')
        }
    }
    componentDidMount(){
    //const [{released}] = this.props.info.request
        
        //console.log(this.props.info.request);
        //console.log(released);
    //console.log('print'+this.props.print);
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
        //var username = localStorage.getItem('react-username');
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
            prepared_by,
            approved_by,
            issued_by,
            received_by,
            designation1,
            designation2,
            designation3,
            designation4,
            provider,
            destination,
            date_request
        } = this.props.info;
        
    return(
       <div >
                <Table className="table table-bordered table-sm" responsive="sm" style={{marginTop:'10px'}}>
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
                        <td colSpan={4}>
                            -
                        </td>
                        <td colSpan={2} style={{border:'none',textAlign:'left'}}>
                                    <strong><p style={{marginBottom:'1px'}}>DRN</p></strong>
                                    <p style={{marginLeft:'130px', marginTop:'6px', fontSize:'11px', position:'absolute', fontStyle:'italic'}}>Appendix 63</p>
                        </td>
                    </tr>
                    <tr style={{textAlign:'center',fontWeight:'bold'}}>
                        <td colSpan={8}>
                            SUPPLIES TRANSFER FORM (STF)
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <strong><p>From Warehouse :</p></strong><span>{provider}</span>
                        </td>
                        <td colSpan={2}>
                            <strong><p>Control No. :</p></strong><span>{ris_id}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <strong><p>To Warehouse :</p></strong>
                            <span>{destination}</span>
                        </td>
                        <td colSpan={2}>
                            <strong><p>Date :</p></strong>
                            <span>{date_request}</span>
                        </td>
                    </tr>

                    <tr style={{textAlign:'center'}}>
                        <td>Quantity</td>
                        <td>Unit</td>
                        <td>Description</td>
                        <td>Lot/Batch No.</td>
                        <td>Quantity</td>
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
                        <td><p style={{position:'absolute', marginTop:'35px'}}>{quantity_requested}</p></td>
                        <td></td>
                        <td></td>
                        <td>-</td>
                        <td>{quantity_released}</td>
                        <td>-</td>
                    </tr>
                    {
                            this.props.print.map((item)=>{
                                return(
                                    <tr key={item.category_id}>
                                        <td>{item.quantity_total}</td>
                                        <td>{item.unitval}</td>
                                        <td>{item.particular}&nbsp;({item.quantity})</td>
                                        <td>-</td>
                                        <td>{item.remBalance}</td>
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
                    <tr style={{textAlign:'center'}}>
                        <td colSpan={2}></td>
                        <td><strong><p>Requested By :</p></strong> </td>
                        <td><strong><p>Approved By :</p></strong></td>
                        <td><strong><p>Issued By :</p></strong></td>
                        <td><strong><p>Received By :</p></strong></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><p>Signature :</p></td>
                        <td><strong></strong></td>
                        <td><strong></strong></td>
                        <td><strong></strong></td>
                        <td><strong></strong></td>
                    </tr>
                    <tr >
                        <td colSpan={2}><p>Printed Name :</p></td>
                        <td style={{textAlign:'center'}}><strong>{prepared_by}</strong></td>
                        <td style={{textAlign:'center'}}><strong>{approved_by}</strong></td>
                        <td style={{textAlign:'center'}}><strong>{issued_by}</strong></td>
                        <td style={{textAlign:'center'}}><strong>{received_by}</strong></td>
                    </tr>
                    <tr >
                        <td colSpan={2}><p>Designation :</p></td>
                        <td style={{textAlign:'center'}}><strong>{designation4}</strong></td>
                        <td style={{textAlign:'center'}}><strong>{designation2}</strong></td>
                        <td style={{textAlign:'center'}}><strong>{designation1}</strong></td>
                        <td style={{textAlign:'center'}}><strong></strong></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><p>Date :</p></td>
                        <td><strong>-</strong></td>
                        <td><strong>-</strong></td>
                        <td><strong>-</strong></td>
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
