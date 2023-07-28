import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import Modal from 'react-responsive-modal';
import RangeDatePicker from "../common/RangeDatePicker";
import Chart from "../../utils/chart";
import axios from 'axios';
import {Table} from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2'; 
import { CSVLink } from "react-csv";
//import axios from '../../axios';
class UsersOverview extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();

    this.state = {
      chartData:[],
      tabularData:[],
      particular:'',
      init:0,
      open: false,
      headers:[],
      tableheader:[],
      data:[],

    }


  }


  componentDidMount() {
    //console.log(this.props);
    if(this.props.chartData.particular === 'Food-Packs'){
      //console.log(this.props.chartData.chartData);
      const ipl = this.props.chartData.chartData;  
      const title = this.props.chartData.particular;
      let runBalance = [];
      let runName = [];
      ipl.forEach(record => {   
        //runBalance.push(record.remaining_balance);  
        //runDate.push(record.created_at);  
        runBalance.push(record.remaining_balance);
        runName.push(record.created_at);  
      });
      this.setState({
        chartData:{
          labels: runName,
          datasets: [
            {
              label: title,  
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
        particular:'Food-Packs',
        headers:[
          { label: "Transaction", key: "typeOf" },
          { label: "Date", key: "created_at" },
          { label: "Reference", key: "name" },
          { label: "Source", key: "source_" },
          { label: "Quantity Received", key: "quantity_received" },
          { label: "Unit Cost", key: "unit_cost" },
          { label: "Unit Value", key: "unit_value" },
          { label: "Quantity Issued", key: "quantity_issued" },
          { label: "End User", key: "end_user" },
          { label: "RIS No.", key: "ris_no" },
          { label: "Purpose", key: "purpose" },
          { label: "Remaining Balance", key: "remaining_balance" }
        ],
          tableheader:[{ 
            Transaction: "", 
            Date: "", 
            Reference: "", 
            Source: "", 
            QuantityReceived: "", 
            UnitCost: "", 
            UnitValue: "", 
            QuantityIssued: "", 
            EndUser: "", 
            RIS_No: "", 
            Purpose: "", 
            RemainingBalance: ""
          }],
      }) 
    }else{
      //console.log(this.props.chartData.particular);
    }


  }
 
  componentWillUpdate(nextProps, nextState){
    
     //console.log(this.props.chartData.particular + '-' + nextProps.chartData.particular);
     
     if(nextProps.chartData.chartData !== this.props.chartData.chartData){
      
      if(nextProps.chartData.particular === 'Food-Packs'){
       // console.log(nextProps.chartData.chartData);
        var startDate_ = this.formatDate(nextProps.startDate);
        var endDate_ = this.formatDate(nextProps.endDate);
          const ipl = nextProps.chartData.chartData;  
          const title = nextProps.chartData.particular;
          let runBalance = [];
          let runName = [];
          ipl.forEach(record => {   
            //runBalance.push(record.remaining_balance);  
            //runDate.push(record.created_at);  
            runBalance.push(record.remaining_balance);
            runName.push(record.typeOf);  
          });
          this.setState({
            chartData:{
              labels: runName,
              datasets: [
                {
                  label: title,  
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
            particular:'Food-Packs'
          })
          
          /*axios.get('/api/overviewtabularfp/'+ startDate_ +'/'+endDate_)
          .then(res => this.setState({

           }));*/
           fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewtabularfp/`+ startDate_ +'/'+endDate_,{
            mode:'cors',
            method: 'GET',
            headers: {
              "Content-Type" : "application/json",
              "accept" : "application/json",
              "Authorization" : `Bearer ${localStorage.getItem('token')}` 
            }
             }).then(async response => {
               if (!response.ok) {
               const validation = await response.json();
               //setErrors(validation.errors);
               console.log(validation.errors);
               this.setState({alert_message:"error"})
             }else{
              //history('/categories')
              const validation = await response.json();
              //console.log(validation)
                 this.setState({ 
                  tabularData:validation,
                  headers:[
                    { label: "Transaction", key: "typeOf" },
                    { label: "Date", key: "created_at" },
                    { label: "Reference", key: "name" },
                    { label: "Source", key: "source_" },
                    { label: "Quantity Received", key: "quantity_received" },
                    { label: "Unit Cost", key: "unit_cost" },
                    { label: "Unit Value", key: "unit_value" },
                    { label: "Quantity Issued", key: "quantity_issued" },
                    { label: "End User", key: "end_user" },
                    { label: "RIS No.", key: "ris_no" },
                    { label: "Purpose", key: "purpose" },
                    { label: "Remaining Balance", key: "remaining_balance" }
                  ],
                  tableheader:[{ 
                    Transaction: "", 
                    Date: "", 
                    Reference: "", 
                    Source: "", 
                    QuantityReceived: "", 
                    UnitCost: "", 
                    UnitValue: "", 
                    QuantityIssued: "", 
                    EndUser: "", 
                    RIS_No: "", 
                    Purpose: "", 
                    RemainingBalance: ""
                  }],
                });
             }
          })
          

          
      }else if(nextProps.chartData.particular === 'Agusan del Norte'
      ||nextProps.chartData.particular === 'Agusan del Sur'
      ||nextProps.chartData.particular === 'Surigao del Norte'
      ||nextProps.chartData.particular === 'Surigao del Sur'
      ||nextProps.chartData.particular === 'Province of Dinagat Island'){
      
        //const { endDate, startDate } = this.state;
        var startDate_ = this.formatDate(nextProps.startDate);
        var endDate_ = this.formatDate(nextProps.endDate);
         // console.log(nextProps.chartData.chartData);
      const ipl = nextProps.chartData.chartData;
      const title = nextProps.chartData.particular;
      let runBalance = [];
      let runName = [];
      ipl.forEach(record => {    
        runBalance.push(record.remBalance);
        runName.push(record.name); 
      });
      this.setState({
        chartData:{
          labels: runName,
          datasets: [
            {
              label: title,  
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
        particular:nextProps.chartData.particular,
      });
//console.log(nextProps.chartData.particular+'/'+ startDate_ +'/'+endDate_)
      
      /*axios.get('/api/overviewstockpilerelease/'+nextProps.chartData.particular+'/'+ startDate_ +'/'+endDate_)
      .then(res => this.setState({

       }));*/
       fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewstockpilerelease/`+nextProps.chartData.particular+'/'+ startDate_ +'/'+endDate_,{
        mode:'cors',
        method: 'GET',
        headers: {
          "Content-Type" : "application/json",
          "accept" : "application/json",
          "Authorization" : `Bearer ${localStorage.getItem('token')}` 
        }
         }).then(async response => {
           if (!response.ok) {
           const validation = await response.json();
           //setErrors(validation.errors);
           console.log(validation.errors);
           this.setState({alert_message:"error"})
         }else{
          //history('/categories')
          const validation = await response.json();
          //console.log(validation)
             this.setState({ 
              tabularData:validation,
              headers:[
                { label: "Purpose", key: "purpose_type" },
                { label: "Destination", key: "destination" },
                { label: "RIS ID", key: "ris_id" },
                { label: "Province", key: "prov" },
                { label: "Date", key: "created_at" },
                { label: "Requested", key: "quantity_requested" },
                { label: "Allocated", key: "allocated" },
                { label: "Released", key: "released" },
                { label: "Status", key: "status" },
                { label: "Distributed", key: "distributed" },
                { label: "Remarks", key: "remarks" }
              ],
              tableheader:[{ 
                Purpose: "", 
                Destination: "", 
                RIS_ID: "", 
                Province: "", 
                Date: "", 
                Requested: "", 
                Allocated: "",
                Released: "",
                Status: "",
                Distributed:"",
                Remarks:""
              }],
            });
         }
      })

      }
      else{
        var startDate_ = this.formatDate(nextProps.startDate);
        var endDate_ = this.formatDate(nextProps.endDate);
        //console.log(nextProps.chartData.chartData); 
        const ipl = nextProps.chartData.chartData;  
        const title = nextProps.chartData.particular;
        let runBalance = [];
        let runName = [];
        ipl.forEach(record => {   
          //runBalance.push(record.remaining_balance);  
          //runDate.push(record.created_at);  
          runBalance.push(record.remBalance);
          runName.push(record.name);  
        });
        this.setState({
          chartData:{
            labels: runName,
            datasets: [
              {
                label: title,  
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
          particular:nextProps.chartData.particular,
        }) 

        /*axios.get('/api/overviewtabular/'+nextProps.chartData.particular+'/'+ startDate_ +'/'+endDate_)
        .then(res => this.setState({

         }));*/
         fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewtabular/`+nextProps.chartData.particular+'/'+ startDate_ +'/'+endDate_,{
          mode:'cors',
          method: 'GET',
          headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem('token')}` 
          }
           }).then(async response => {
             if (!response.ok) {
             const validation = await response.json();
             //setErrors(validation.errors);
             console.log(validation.errors);
             this.setState({alert_message:"error"})
           }else{
            //history('/categories')
            const validation = await response.json();
            //console.log(validation)
               this.setState({ 
                tabularData:validation,
                headers:[
                  { label: "Transaction", key: "typeOf" },
                  { label: "Date", key: "created_at" },
                  { label: "Reference", key: "name" },
                  { label: "Source", key: "source_" },
                  { label: "Quantity Received", key: "quantity_received" },
                  { label: "Unit Cost", key: "unit_cost" },
                  { label: "Unit Value", key: "unit_value" },
                  { label: "Quantity Issued", key: "quantity_issued" },
                  { label: "End User", key: "end_user" },
                  { label: "RIS No.", key: "ris_no" },
                  { label: "Purpose", key: "purpose" },
                  { label: "Remaining Balance", key: "remaining_balance" }
                ],
                tableheader:[{ 
                  Transaction: "", 
                  Date: "", 
                  Reference: "", 
                  Source: "", 
                  QuantityReceived: "", 
                  UnitCost: "", 
                  UnitValue: "", 
                  QuantityIssued: "", 
                  EndUser: "", 
                  RIS_No: "", 
                  Purpose: "", 
                  RemainingBalance: ""
                }],
              });
           }
        })

        }
      }
      


  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  renderTableHeader() {
   
    //console.log(this.state.headers[0]);
    if(typeof(this.state.tableheader[0]) != "undefined"){
      //console.log(this.state.tableheader[0]);
      let header = Object.keys(this.state.tableheader[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
    } 

 }

 renderTableData() {
  if(this.state.particular === "Food-Packs"){
    //console.log(this.state.tabularData);
    return this.state.tabularData.map((item)=>{
        return(
            <tr key={item.created_at}>
                <td>{item.typeOf}</td>
                <td>{item.created_at}</td>
                <td></td> 
                <td>{item.source_}</td>
                <td>{item.quantity_received}</td>
                <td>{item.unit_cost}</td>
                <td>{item.unit_value}</td>
                <td>{item.quantity_issued}</td>
                <td>{item.end_user}</td>
                <td>{item.ris_no}</td>
                <td>{item.purpose}</td>
                <td>{item.remaining_balance}</td>
            </tr>
    
        ) 
    })
  }else if(this.state.particular === 'Agusan del Norte'
  ||this.state.particular === 'Agusan del Sur'
  ||this.state.particular === 'Surigao del Norte'
  ||this.state.particular === 'Surigao del Sur'
  ||this.state.particular === 'Province of Dinagat Island'){
    //console.log('province');
    return this.state.tabularData.map((item)=>{
      return(
          <tr key={item.id}>
              <td>{item.purpose_type}</td>
              <td>{item.destination}</td>
              <td>{item.ris_id}</td> 
              <td>{item.prov}</td>
              <td>{item.created_at}</td>  
              <td>{item.quantity_requested}</td>
              <td>{item.allocated}</td>         
              <td>{item.released}</td>  
              <td>{item.status}</td>   
              <td>{item.distributed}</td>  
              <td>{item.remarks}</td>      
          </tr>
      ) 
  })

  }else{
    //console.log('coms');
    return this.state.tabularData.map((item)=>{
      return(
          <tr key={item.id}>
              <td>{item.typeOf}</td>
              <td>{item.created_at}</td>
              <td>{item.name}</td> 
              <td>{item.source_}</td>
              <td>{item.quantity_received}</td>
              <td>{item.unit_cost}</td>
              <td>{item.unit_value}</td>
              <td>{item.quantity_issued}</td>
              <td>{item.end_user}</td>
              <td>{item.ris_no}</td>
              <td>{item.purpose}</td>
              <td>{item.remaining_balance}</td>
          </tr>

      ) 
  })
  }


}

 formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
  render() {
    const { title } = this.props;
    const { open } = this.state;
    //console.log(this.state);
    return (
      <div>
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
            {
              <Col sm="6" className="d-flex mb-2 mb-sm-0">
              <RangeDatePicker startDate={this.props.startDate} endDate={this.props.endDate} handleStartDateChange={this.props.handleStartDateChange} handleEndDateChange={this.props.handleEndDateChange}/>
            </Col>
            } 
            <Col>
              <Button
                size="sm"
                className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
                onClick={this.onOpenModal}
              >
                View Full Reports &rarr;
              </Button>
            </Col>
          </Row>
  
          {this.state.particular === "Food-Packs"?<Line  
            data={this.state.chartData} 
            options={{ maintainAspectRatio: true }} />:<Bar  
            data={this.state.chartData} 
            options={{ maintainAspectRatio: true }} />}
        </CardBody>
      </Card>

      <Modal open={open} onClose={this.onCloseModal} center style={modalStyle}>
        
      <Card style={{ width: '45rem' }}>
        <CardHeader>{this.state.particular}</CardHeader>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>{this.renderTableHeader()}</tr>
            </thead>
            <tbody>
                  {this.renderTableData()}
            </tbody>
            
          </Table>
        </CardBody>
        <CSVLink 
          data={this.state.tabularData} 
          headers={this.state.headers}
          filename={this.state.particular+".csv"}
          className="btn btn-primary">
          Export to Excel
        </CSVLink>
      </Card>
        


      </Modal>
      </div>
      
    );
  }
}

UsersOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};

const modalStyle = {
  background:'red'
}

export default UsersOverview;
