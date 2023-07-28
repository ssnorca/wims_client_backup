import React, {Component} from 'react';
import {Button, Popover, OverlayTrigger} from 'react-bootstrap';

const popover = (rem)=> (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Remaining Balance</Popover.Title>
      <Popover.Content>
        Total of <strong>{rem}</strong> Family Food Packs..
      </Popover.Content>
    </Popover>
  );

export default class ItemListCancellation extends Component{
    state = {
                quantity_remain: 0,
                isComplete:'true',
                percentComplete:'',
                provider:'',
    }
    roughScale =(x)=> {
        const parsed = parseInt(x);
        if (isNaN(parsed)) { return 0; }
        return parsed * 1;
      }
    componentDidMount() {
        
        /*const myArray = this.props.allocation_ffp.filter(ffp=>{
            return ffp.ris_id===this.props.ris_id;
        });
        this.props.onTotalAllocated(myArray)*/
        //console.log(this.props.provider);
        this.setState({ 
            provider: this.props.provider
        });

        //const [{ ris_id, purpose, created_at, quantity_requested, allocated, percentage, released, rpercentage }] = this.props.production_percentage;
        //console.log(this.roughScale(percentage));
        //console.log(this.props.production_percentage);
        //if(this.roughScale(percentage)<100){
        //    console.log('updated')
        //    this.setState({ isComplete: false });
       // }
    }
    onAllocate =(id)=>{
        //console.log(id)
        this.setState({ 
            quantity_remain: this.props.production_ffp.quantity_available - this.props.production_ffp.quantity_release
        });
          console.log(this.state.quantity_remain)
    }

    canSave = (status) => {
        //console.log(myStatus+'-w');
        //console.log(desigArea+'-a');
        var designation = localStorage.getItem('roleDesig');
        var desigArea   = localStorage.getItem('roleDesigArea');
        var provider    = this.state.provider;
        //const { paramCode } = this.state.row;
       // if(warehouse!=desigArea){
        //  return true
       // }else 
        if(provider===desigArea && status != 'cancelled'){
          return false
        }
        return true;
      }
    render(){
        //console.log(this.state)
        const { id, stockpile_id, status, quantity, ris_id, warehouse } = this.props.cancellation_ffp;
    return (
        <tr>
            <td>{ris_id}</td>
            <td>{stockpile_id}</td>
            <td>{status}</td>
            <td>{quantity}</td>
            <td>{/*
                <OverlayTrigger trigger="hover" placement="top" overlay={popover (this.props.production_ffp.quantity_available - this.props.production_ffp.quantity_release)} rootClose={true}>
                    <Button variant="outline-info" size="sm" onClick={this.props.onAllocate.bind(this,quantity_available - quantity_release, id)}>Allocate</Button>
                </OverlayTrigger>*/
                }
                <Button disabled={this.canSave(status)} variant="outline-info" size="sm" 
                onClick={
                    this.props.onCancelled.bind(this,quantity, id,stockpile_id)
                }>Cancel</Button>
            </td>
        </tr>
    )
   /* this.state.isComplete ?
        :
        <tr>
            <td>{id}</td>
            <td>{purpose}</td>
            <td>{created_at}</td>
            <td>{quantity_available}</td>
            <td>{quantity_release}</td>
            <td>{
                <OverlayTrigger trigger="hover" placement="top" overlay={popover (this.props.production_ffp.quantity_available - this.props.production_ffp.quantity_release)} rootClose={true}>
                    <Button variant="outline-info" size="sm" onClick={this.props.onAllocate.bind(this,quantity_available - quantity_release, id)}>Allocate</Button>
                </OverlayTrigger>
                }
                <Button disabled={false} variant="outline-info" size="sm" onClick={this.props.onAllocate.bind(this,quantity_available - quantity_release, id)}>Allocate</Button>
            </td>
        </tr>*/

    }

}
