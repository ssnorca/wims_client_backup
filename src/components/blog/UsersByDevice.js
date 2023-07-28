import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button
} from "shards-react";

import Chart from "../../utils/chart";
import { Pie } from 'react-chartjs-2'; 
class UsersByDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData:[],
      provinceStock:'',//this.props.provinceStock
    }
  }

  componentDidMount() {
    const ipl = this.props.stockpile;  
    //console.log(ipl);
      let runBalance = [];
      let runName = [];
      ipl.forEach(record => {    
        runBalance.push(record.request);
        runName.push(record.province);  
      });
      this.setState({
        chartData:{
          labels: runName,
          datasets: [
            {
              label: 'Stockpile Request by Warehouse',  
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
    /*const chartConfig = {
      type: "pie",
      data: this.props.chartData,
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.props.chartOptions
      }
    };

    new Chart(this.canvasRef.current, chartConfig);*/
  }
  componentWillUpdate(nextProps, nextState){
    
    if(nextProps.stockpile!== this.props.stockpile){
      //console.log(nextProps.stockpile);
      const ipl = nextProps.stockpile;  
      let runBalance = [];
      let runName = [];
      ipl.forEach(record => {    
        runBalance.push(record.remBalance);
        runName.push(record.province);  
      });
      this.setState({
        chartData:{
          labels: runName,
          datasets: [
            {
              label: 'Stockpile Request by Warehouse',  
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
  }
  onHandleProvinceStocks = e => {this.setState({
      [e.target.name]: e.target.value 
    })
    //console.log(e.target.value);
  };

  onSelectProvince = e =>{
    //this.handleChanges();
    console.log(e.target.value);
    /*this.setState({
      particular: e.target.value 
    })*/
  
  }
  render() {
    const { title } = this.props;
    const { provinceStock } = this.state;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="d-flex flex-column">
          <Pie  
            data={this.state.chartData} 
            options={{ maintainAspectRatio: false }} />
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col>
              <FormSelect
                name="provinceStock"
                size="sm"
                style={{ maxWidth: "130px" }}
                value={provinceStock}
                onChange={this.onHandleProvinceStocks}
              >
                <option value="">Select</option>
                <option value="Agusan del Norte">Agusan del Norte</option>
                <option value="Agusan del Sur">Agusan del Sur</option>
                <option value="Surigao del Norte">Surigao del Norte</option>
                <option value="Surigao del Sur">Surigao del Sur</option>
                <option value="Province of Dinagat Island">Province of Dinagat Island</option>
              </FormSelect>
            </Col>
            <Col className="text-right view-report">
              {/* eslint-disable-next-line */}
              <Button
                size="sm"
                className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
                onClick={this.props.onHandleProvinceStocks}
                name='provinceStock' 
                value={this.state.provinceStock}
              >
                View Full Reports &rarr;
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

UsersByDevice.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};

UsersByDevice.defaultProps = {
  title: "Released Stockpile Request by Province"
 /* ,
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        data: [68.3, 24.2, 7.5],
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.5)",
          "rgba(0,123,255,0.3)"
        ]
      }
    ],
    labels: ["Desktop", "Tablet", "Mobile"]
  }*/
};

export default UsersByDevice;
