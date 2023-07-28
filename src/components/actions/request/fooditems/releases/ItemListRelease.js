import React, {Component} from 'react';
import ItemList from './ItemList';
import { Table } from 'react-bootstrap';
export default class ItemListRelease extends Component{
    componentDidMount() {
        const myArray = this.props.release_ffp.filter(ffp=>{
            return ffp.ris_id===this.props.ris;
        });
        this.props.onAddQuantity(myArray)
        console.log(myArray)
    }
       
    render(){
        const myArray = this.props.release_ffp.filter(ffp=>{
            return ffp.ris_id===this.props.ris;
        });
        return myArray.map((release_ffp)=>(

            <ItemList key={release_ffp.release_id } release_ffp={release_ffp} />
               
        ));
    }
    
}

