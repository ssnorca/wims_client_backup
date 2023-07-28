import React, {Component} from 'react';

export default class ItemList extends Component{
     
    render(){
        const { release_id, ris_id, quantity, date_release } = this.props.release_ffp;
    return(
        <tr>
            <td>{release_id}</td>
            <td>{ris_id}</td>
            <td>{quantity}</td>
            <td>{date_release}</td>
        </tr>
        );
    }

}