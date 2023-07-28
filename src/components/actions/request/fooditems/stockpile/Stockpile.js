import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Index from './Index';
import Viewstockpile from './ViewStockpile';
class Stockpile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ris_id: '',
    }
  }
  
  componentDidMount() {
    console.log(this.props.requests);
    const { ris_id, quantity_requested } = this.props.location.state;
    /*this.setState({ 
      ris_id: ris_id
    })*/
    //
    //console.log(quantity_requested + 'stockpile')
  }
    render(){
      const { ris_id, quantity_requested } = this.props.location.state;
      const {provider, preposition_id} = this.props.requests;
       return(
        <Router basename={'/whims'}>
            <div>
            <Switch>
                <Route exact path="/request/release" render={()=><Index ris_id  = {ris_id} quantity_requested = {quantity_requested} provider={provider} />}/>
                {/** <Route exact path="/request/release" component={Index}/>*/}
                <Route path="/request/viewstockpile/:id"  render={props => <Viewstockpile {...props} preposition_id={preposition_id}  />} />
            </Switch>
            </div>
        </Router>
    );     
     
    }
  }

export default Stockpile;