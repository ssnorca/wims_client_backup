import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
class About extends Component{
    render(){
      return(
        <div>
        {/**<div class="topleft">
          <p>Logo</p>
      </div>**/}
        <div>
          <h1>WhIMS Caraga</h1>
          <p>Warehouse Inventory and Management System</p>
        </div>
        <div>
          <p>The Warehouse Inventory and Management System is designed  to provide a real-time status of stockpiles from the Regional Warehouse down to the provincial warehouses situated in the different parts of Caraga Region.</p>
        </div>
      </div> 
        
      );
    }
  }

export default About;