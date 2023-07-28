import React from "react";
import PropTypes from "prop-types";
import { Pie } from 'react-chartjs-2'; 
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  FormSelect
} from "shards-react";
import { Link } from 'react-router-dom';

class NewDraft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData:[],
    }
  }
  componentDidMount() {
    //console.log(this.props.newdraft);
    const ipl = this.props.newdraft;  
      let runBalance = [];
      let runName = [];
      ipl.forEach(record => {    
        runBalance.push(record.ffps);
        runName.push(record.type_);  
      });
      this.setState({
        chartData:{
          labels: runName,
          datasets: [
            {
              label: 'Stockpile Breakdown',  
              data: runBalance,  
              backgroundColor: [  
                "#3cb371",
                "#0000FF",  
                "#9966FF",  
                "#4C4CFF",  
                "#00FFFF",  
                "#f990a7",  
                "#aad2ed",  
                "#FF00FF",  
                "Blue",  
                "Red"
              ]  
            }
          ]
        },
      }) 
  }
  render(){
    return(
      <Card small className="h-100">
        {/* Card Header */}
        <CardHeader className="border-bottom">
          <h6 className="m-0">Stockpile Breakdown</h6>
        </CardHeader>

        <CardBody className="d-flex flex-column">
          <Pie  
            data={this.state.chartData} 
            options={{ maintainAspectRatio: false }} />
        </CardBody>
        <CardFooter className="border-top">
                <Row>
                  {/* Time Span */}
                  <Col>
                    <FormSelect
                      size="sm"
                      value="last-week"
                      style={{ maxWidth: "130px" }}
                      onChange={() => {}}
                    >
                      <option value="last-week">Last Week</option>
                      <option value="today">Today</option>
                      <option value="last-month">Last Month</option>
                      <option value="last-year">Last Year</option>
                    </FormSelect>
                  </Col>
          
                  {/* View Full Report */}
                  <Col className="text-right view-report">
                    {/* eslint-disable-next-line */}
                    <Link to="/request">View Requests &rarr;</Link>
                  </Col>
                </Row>
              </CardFooter>
      </Card>
    );
  }
}


NewDraft.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

NewDraft.defaultProps = {
  title: "FFP Status"
};

export default NewDraft;
