import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  Row,
  Col,
  FormSelect
} from "shards-react";
import { Link } from 'react-router-dom';
//const TopReferrals = ({ title, referralData }) => (
  class TopReferrals extends Component{
    constructor(props) {
      super(props);
      this.state = {
        referralData:[],
      }
    }
    componentDidMount() {
      this.setState({
        referralData:this.props.referralData,
      }) 
    }
    findStatus =(id)=>{
      const ready = 'badge badge-info badge-pill';
      const not = 'badge badge-warning badge-pill'
      if(id==='Pending'){
          return not
      }return ready
  }
    render() {
      return(
        <Card small>
              <CardHeader className="border-bottom">
                <h6 className="m-0">Request Status Breakdown</h6>
                <div className="block-handle" />
              </CardHeader>
          
              <CardBody className="p-0">
                <ListGroup small flush className="list-group-small">
                  {this.state.referralData.map((item, idx) => (
                    <ListGroupItem key={idx} className="d-flex px-3">
                      <span className="text-semibold text-fiord-blue">{item.emp_id}</span>
                      <span className="ml-auto text-right text-semibold text-reagent-gray">
                      {item._status}
                      </span>
                      &ensp;
                      <span className={this.findStatus(item._status)}>{item._count}</span>
                    </ListGroupItem>
                  ))}
                </ListGroup>
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
 
//);

TopReferrals.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The referral data.
   */
  referralData: PropTypes.array
};

TopReferrals.defaultProps = {
  title: "Request Status Breakdown",
 /* referralData: [
    {
      title: "GitHub",
      value: "19,291"
    },
    {
      title: "Stack Overflow",
      value: "11,201"
    },
    {
      title: "Hacker News",
      value: "9,291"
    },
    {
      title: "Reddit",
      value: "8,281"
    },
    {
      title: "The Next Web",
      value: "7,128"
    },
    {
      title: "Tech Crunch",
      value: "6,218"
    },
    {
      title: "YouTube",
      value: "1,218"
    },
    {
      title: "Adobe",
      value: "1,171"
    }
  ]*/
};

export default TopReferrals;
