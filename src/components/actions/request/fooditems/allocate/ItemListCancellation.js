import React, {Component} from 'react';
import ItemCancellation from './ItemCancellation';
import { Table } from 'react-bootstrap';
export default class ItemListCancellation extends Component{
    componentDidMount() {
        /*const myArray = this.props.allocation_ffp.filter(ffp=>{
            return ffp.ris_id===this.props.ris_id;
        });
        this.props.onTotalAllocated(myArray)*/
        //const [{ percentage, released, rpercentage }] = this.props.production_percentage;
        //console.log(this.props.production_percentage)
    }
       
    render(){
        /*const myArray = this.props.release_ffp.filter(ffp=>{
            return ffp.ris_id===this.props.ris;
        });*/
        return this.props.cancellation_ffp.map((cancellation_ffp)=>(

            <ItemCancellation 
                key={cancellation_ffp.id } 
                cancellation_ffp={cancellation_ffp} 
                provider={this.props.provider}
                onCancelled={this.props.onCancelled}
                /*onRemainFFP={this.props.onRemainFFP}*//>
               
        ));
    }
    
}

