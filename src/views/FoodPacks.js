import React, {Component} from 'react';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import ListFoodPacks from '../components/actions/foodpacks/ListFoodPacks';
import ListStockpile from '../components/actions/foodpacks/ListStockpile';
import IndexFoodPacks from '../components/actions/foodpacks/IndexFoodPacks';

class FoodPacks extends Component{
  constructor(props) {
    super(props);
    this.state = {
      init:1,
    }
  }
  componentDidMount() {
           
    var role = localStorage.getItem('roleDesig');
    
    //console.log(role);
    if(role==='manager'){
        this.setState({ 
          init:0 
        })   
      // }, 2000)
    }
        
  }
    render(){
      return this.state.init ? <div>
        <Container fluid className="main-content-container px-4">
           <Row noGutters className="page-header py-4">
                <PageTitle title="List of Food Items" subtitle="Welfare Good Family Food Packs" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>
            <Row>
                <Col lg="12">
                  {/**<ListFoodPacks/> */}
                  <IndexFoodPacks/>
                </Col>          
            </Row>
          
        </Container>
        </div>: <div>
        <Container fluid className="main-content-container px-4">
           <Row noGutters className="page-header py-4">
                <PageTitle title="List of Food Packs" subtitle="Provincial Stockpile" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>
            <Row>
                <Col lg="12">
                  <ListStockpile/>
                </Col>          
            </Row>
          
        </Container>            
        </div>;
    }
  }

export default FoodPacks;