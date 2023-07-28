import React, {Component} from 'react';
import ItemList from './ItemList';
import { Table } from 'react-bootstrap';
export default class ItemListAllocate extends Component{
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
        return this.props.production_ffp.map((production_ffp)=>(

            <ItemList 
                key={production_ffp.id } 
                provider={this.props.provider}
                production_ffp={production_ffp} 
                production_percentage={this.props.production_percentage}
                onAllocate={this.props.onAllocate}
                /*onRemainFFP={this.props.onRemainFFP}*//>
               
        ));
    }
    
}

