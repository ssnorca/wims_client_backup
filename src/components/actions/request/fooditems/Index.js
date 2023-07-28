import React, {Component} from 'react';
import IndexPreposition from './IndexPreposition';
import Stockpile from './stockpile/Stockpile';
import IndexAugmentation from './IndexAugmentation';
export default class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {
          init:0,
          requests:[]
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
      if (prevState.requests !== this.state.requests) {
        //console.log('prev'+prevState.requests.purpose_type);
        console.log('pres'+this.state.requests.provider);
        this.setState({ type: this.state.requests.provider }) 
      }
    }  
    //receives the values from the FoOd.js CompOnent
    onAllocate = (ris_id, purpose, created_at, quantity_requested, allocated, percentage, released, rpercentage, emp_id, provider, preposition_id) =>{
      const ffprequest ={
          ris_id:ris_id,
          purpose: purpose,
          created_at:created_at,
          percentage: percentage,   
          quantity_requested:quantity_requested, 
          allocated:allocated,     
          released:released,
          rpercentage:rpercentage,
          emp_id:emp_id ,
          provider:provider,
          preposition_id:preposition_id
        }
       //console.log(emp_id+'low');
       this.setState({ requests: ffprequest }) 
      this.onDisplay(emp_id);
  }

    onDisplay =(user)=>{
      var role = localStorage.getItem('roleDesig');
      var username = localStorage.getItem('react-username');
      const yes = 'none';
      const no = 'block';
      if(role==='manager'&& user === username || role ==='admin'){
        this.setState({ 
          init:1 
        })
      }
      //return no;
  }
      render(){
        
        if (this.state.requests.provider==='Agusan del Norte') {
          return (
            <IndexPreposition onAllocate={this.onAllocate}/>
          )
          }else
          return (
            <IndexAugmentation onAllocate={this.onAllocate} requests={this.state.requests}/>
          );
              
    }
    
}

