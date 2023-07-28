import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import {Card, Button}from "react-bootstrap"
import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import UsersOverview from "../components/blog/UsersOverview";
import UsersByDevice from "../components/blog/UsersByDevice";
import NewDraft from "../components/blog/NewDraft";
import Stocks from "./../components/blog/Stocks";
import Discussions from "../components/blog/Discussions";
import TopReferrals from "../components/common/TopReferrals";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// const BlogOverview = ({ smallStats }) => (
 // import axios from '../axios';
class BlogOverview extends Component {

  constructor(props) {
    super(props);
    var date = new Date(); // Now
    date.setDate(date.getDate() + 30);
    this.state = {
      chartData:[],
      carouselData:[],
      init:0,
      particular:'',
      discussions: [],
      ffpstatus:[],
      requeststatus:[],
      stockpile:[],
      toExpireStockpile:[],
      startDate: new Date(),
      provinceStock:'',
      endDate: date,
      startDate_:'',
      endDate_:''
    }

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleStartDateChange(value) {
    //console.log(value);
    this.setState({
      ...this.state,
      ...{ startDate: value }
    });
  }

  handleEndDateChange(value) {
    //console.log(value);
    this.setState({
      ...this.state,
      ...{ endDate: value }
    });
  }

  handleOnSelect = (e)=>{
    //console.log(e.target.value);
    this.setState({
      particular:e.target.value,
    })
  }

  onHandleProvinceStocks = e => {this.setState({
    [e.target.name]: e.target.value 
    })
    //console.log(e.target.name);
    //console.log(e.target.value);

        
  };

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

  componentDidMount(){
   //  axios.get('/api/overview/Rice')
   // console.log('mounted');
    //this.getDate();
    const { endDate, startDate } = this.state;
    var startDate_ = this.formatDate(startDate);
    var endDate_ = this.formatDate(endDate);
 //   axios.get('/api/overviewfp/Food-Packs/'+ startDate_ +'/'+endDate_)
  //  //axios.get('/api/overviewfp/Food-Packs/2020-03-01/2020-03-31')
  //  .then(res =>this.setState({ 
  //    chartData: res.data,
   //   particular:'Food-Packs', 
   // })); `${process.env.REACT_APP_API_PROXY}/api/employee`

   fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewfp/Food-Packs/`+ startDate_ +'/'+endDate_,{
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
           chartData: validation,
           particular:'Food-Packs', 
        });
     }
  })

   // axios.get('/api/overviewbal/')
  //  .then(res =>this.setState({ 
   //   carouselData: res.data,
   // })); 

   fetch( `${process.env.REACT_APP_API_PROXY}/api/overviewbal`,{
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
          carouselData: validation 
        });
     }
  })

    //axios.get('/api/overviewstockpile/')
    //axios.get('/api/stockpileprepositionbalance')
   // .then(res =>this.setState({ 
    //  stockpile: res.data,
    //}));
   
    fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewstockpile`,{
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
            stockpile: validation 
          });
       }
    })

  //  axios.get('/api/overviewexpirydate/')
  //  .then(res =>this.setState({ 
  //    discussions: res.data,
  //  }));

  fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewexpirydate`,{
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
          discussions: validation 
        });
     }
  });

    //axios.get('/api/overviewupcomingexpiredstocks/')
    //.then(res =>this.setState({ 
    //  toExpireStockpile: res.data,
    //}));

    
    fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewupcomingexpiredstocks`,{
      mode:'cors',
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}` }
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
            toExpireStockpile: validation 
          });
       }
    });

   // axios.get('/api/overviewrequeststatus/')
   // .then(res =>this.setState({ 
   //   requeststatus: res.data,
   // }));

   fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewrequeststatus`,{
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
          requeststatus: validation 
        });
     }
  });

   // axios.get('/api/overviewffpstatus/')
   // .then(res =>this.setState({ 
   //   ffpstatus: res.data,
   //   init:1,
   // }));

   fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewffpstatus`,{
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
          ffpstatus: validation,
          init:1,
        });
     }
  })
  }

  getDate() {
    var date =  new Date();

    this.setState({
      startDate: date,
      endDate: date.setDate(date.getDate() + 30) 
    });
  }

  componentWillUpdate(nextProps, nextState){
    // Typical usage (don't forget to compare props):
    if (this.state.particular !== nextState.particular) {
      //console.log('changed particular'+ this.state.particular);
      //console.log(nextState.particular);
      if(nextState.particular ==='Food-Packs'){
        
        var startDate_ = this.formatDate(nextState.startDate);
        var endDate_ = this.formatDate(nextState.endDate);

        //axios.get('/api/overviewfp/Food-Packs/'+ startDate_ +'/'+endDate_)
        //axios.get('/api/overviewfp/Food-Packs/2020-03-01/2020-03-31')
        //.then(res =>this.setState({ 
        //  chartData: res.data,
        //  particular:'Food-Packs', 
       // }));
       fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewfp/Food-Packs/`+ startDate_ +'/'+endDate_,{
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
              chartData: validation,
              particular:'Food-Packs', 
            });
         }
      })

      }else if (nextState.particular === 'Agusan del Norte'
      ||nextState.particular === 'Agusan del Sur'
      ||nextState.particular === 'Surigao del Norte'
      ||nextState.particular === 'Surigao del Sur'
      ||nextState.particular === 'Province of Dinagat Island') {
        //console.log(nextState.particular);
        var startDate_ = this.formatDate(nextState.startDate);
        var endDate_ = this.formatDate(nextState.endDate);

          fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewstockpilecategory/`+nextState.provinceStock+'/'+ startDate_ +'/'+endDate_,{
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
                chartData: validation,
                particular: nextState.provinceStock, 
                startDate_: startDate_,
                endDate_: endDate_ 
              });
           }
        });

       //axios.get('/api/overviewstockpilecategory/'+nextState.provinceStock+'/'+ startDate_ +'/'+endDate_)
       // .then(res =>this.setState({ 
       //  chartData: res.data,
       //   particular: nextState.provinceStock, 
       //  startDate_: startDate_,
       //  endDate_: endDate_
       // }));

      fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewstockpileoverall/`+startDate_ +'/'+endDate_,{
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
              stockpile: validation 
            });
        }
      })

        //axios.get('/api/overviewstockpileoverall/'+startDate_ +'/'+endDate_)
        //.then(res => this.setState({ 
        //  stockpile: res.data, 
        //}));
        //console.log(this.state.stockpile);
      }else{
        //console.log('called');
        var startDate_ = this.formatDate(nextState.startDate);
        var endDate_ = this.formatDate(nextState.endDate);

        fetch(`${process.env.REACT_APP_API_PROXY}/api/overview/`+nextState.particular+'/'+ startDate_ +'/'+endDate_,{
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
                chartData: validation,
                particular: nextState.particular, 
              });
           }
        })

        //axios.get('/api/overview/'+nextState.particular+'/'+ startDate_ +'/'+endDate_)
        //.then(res =>this.setState({ 
        //  chartData: res.data,
        //  particular: nextState.particular, 
        //}));
      }

    }

    if (this.state.provinceStock !== nextState.provinceStock) {
      //console.log('changed Province');
      var startDate_ = this.formatDate(nextState.startDate);
      var endDate_ = this.formatDate(nextState.endDate);

      fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewstockpilecategory/`+nextState.provinceStock+'/'+ startDate_ +'/'+endDate_,{
        mode:'cors',
        method: 'GET',
        headers: {
          "Content-Type" : "application/json",
          "accept" : "application/json",
          "Authorization" : `Bearer ${localStorage.getItem('token')}` }
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
              chartData: validation,
              particular: nextState.provinceStock, 
              startDate_: startDate_,
              endDate_: endDate_
            });
         }
      })

      //axios.get('/api/overviewstockpilecategory/'+nextState.provinceStock+'/'+ startDate_ +'/'+endDate_)
      //.then(res =>this.setState({ 
      //  chartData: res.data,
      //  particular: nextState.provinceStock, 
      //  startDate_: startDate_,
      //    endDate_: endDate_
      //}));

      
    }
    
    if(this.state.startDate !== nextState.startDate || this.state.endDate !== nextState.endDate) {
      //console.log('Changed Date');
      if(nextState.particular ==='Food-Packs'){

        var startDate_ = this.formatDate(nextState.startDate);
        var endDate_ = this.formatDate(nextState.endDate);

        fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewfp/Food-Packs/`+ startDate_ +'/'+endDate_,{
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
                chartData: validation,
                particular:'Food-Packs', 
              });
           }
        })
        //axios.get('/api/overviewfp/Food-Packs/'+ startDate_ +'/'+endDate_)
        //.then(res =>this.setState({ 
        //  chartData: res.data,
        //  particular:'Food-Packs', 
        //}));
      }else if (nextState.provinceStock === 'Agusan del Norte'
      ||nextState.provinceStock === 'Agusan del Sur'
      ||nextState.provinceStock === 'Surigao del Norte'
      ||nextState.provinceStock === 'Surigao del Sur'
      ||nextState.provinceStock === 'Province of Dinagat Island'){
        //console.log(nextState.provinceStock); 
        var startDate_ = this.formatDate(nextState.startDate);
        var endDate_ = this.formatDate(nextState.endDate);

        fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewstockpilecategory/`+nextState.provinceStock+'/'+ startDate_ +'/'+endDate_,{
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
                chartData: validation,
                particular: nextState.provinceStock,
              });
           }
        })   

        //axios.get('/api/overviewstockpilecategory/'+nextState.provinceStock+'/'+ startDate_ +'/'+endDate_)
        //.then(res =>this.setState({ 
        //  chartData: res.data,
        //  particular: nextState.provinceStock, 
        //}));

        fetch(`${process.env.REACT_APP_API_PROXY}/api/overviewstockpileoverall/`+startDate_ +'/'+endDate_,{
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
                stockpile: validation 
              });
           }
        })

        //axios.get('/api/overviewstockpileoverall/'+startDate_ +'/'+endDate_)
        //.then(res => this.setState({ 
        //  stockpile: res.data, 
        //}));
      }else{
        
        var startDate_ = this.formatDate(nextState.startDate);
        var endDate_ = this.formatDate(nextState.endDate);

        fetch(`${process.env.REACT_APP_API_PROXY}/api/overview/`+nextState.particular+'/'+ startDate_ +'/'+endDate_,{
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
                chartData: validation,
                particular: nextState.particular, 
              });
           }
        })
        //axios.get('/api/overview/'+nextState.particular+'/'+ startDate_ +'/'+endDate_)
        //.then(res =>this.setState({ 
        //  chartData: res.data,
        //  particular: nextState.particular, 
        //}));
      }
    } 


  }

  render() {
    //console.log(this.state.carouselData)
    const { Sardines, Rice, Corned_Beef, Coffee } = this.state.carouselData;
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };
    return this.state.init ? <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Stockpile Overview" subtitle="Dashboards" className="text-sm-left mb-3" />
        </Row>
        <Slider {...settings}>
        {
        this.state.carouselData.map((item)=>{
            return(
            <div key={item.particular}>
              <Card style={{ width: '18rem', marginBottom:'15px' }}>
                <Card.Body>
            <Card.Title>{item.particular}</Card.Title>
                  <Card.Text style={{display:'inline',color:'red',fontSize:'24px'}}>
                      {item.remBalance} &nbsp;
                  </Card.Text>
                  <Card.Text style={{display:'inline',fontSize:'14px'}}>
                      {item.label}
                  </Card.Text>
                  <br/>
                  <Button size="sm" id={item.particular} value={item.particular} onClick={this.handleOnSelect}>View</Button>
                </Card.Body>
              </Card>
            </div>
            )
          })
        }      
        </Slider>
        <Row>
          {/* Users Overview */}
          <Col lg="8" md="8" sm="8" className="mb-4">
            <UsersOverview chartData={this.state}
              startDate={this.state.startDate} 
              endDate={this.state.endDate} 
              handleStartDateChange={this.handleStartDateChange} 
              handleEndDateChange={this.handleEndDateChange}/>
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="4" sm="4" className="mb-4">
            <UsersByDevice stockpile = {this.state.stockpile} 
            onHandleProvinceStocks={this.onHandleProvinceStocks}
            provinceStock = {this.state.provinceStock}/>
          </Col>

          {/* Upcoming Expired Items */}
          <Col lg="5" md="12" sm="12" className="mb-4">
            <Discussions discussions={this.state.discussions} />
          </Col>
          {/* Upcoming Expired Food Packs */}
          <Col lg="4" md="12" sm="12" className="mb-4">
            <Stocks discussions={this.state.toExpireStockpile} />
          </Col>

          {/* Stockpile Breakdown */}
          <Col lg="3" md="6" sm="12" className="mb-4">
            <Row>
              <Col className="mb-4">
                <NewDraft newdraft={this.state.ffpstatus}/>
              </Col>
              <Col className="mb-4">
                <TopReferrals referralData={this.state.requeststatus}/>
              </Col>                        
            </Row>
          </Col>

        </Row>
      </Container>
      </div> : <div>loading...</div>;
  }
}


BlogOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

export default BlogOverview;
