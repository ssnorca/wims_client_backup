import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col
} from "shards-react";

const Stocks = ({ title, discussions }) => (
  <Card small className="blog-comments">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>

    <CardBody className="p-0">
      {discussions.map((discussion, idx) => (
        <div key={idx} className="blog-comments__item d-flex p-3">

          {/* Content */}
          <div className="blog-comments__content">
            {/* Content :: Title */}
            <div className="blog-comments__meta text-mutes">
             <span style={{fontSize:'13px',fontStyle:'bold'}}>
              {discussion.purpose}
             </span>
                <br/>
              expires on{" "}
              <span className="text-mutes"> {discussion.date_expire}</span>
            </div>

            {discussion.daysleft < 0 ? 
            <div>
              <p style={{color:'red', display:'inline', textDecorationLine:'underline'}}> Item Expired</p>
            </div>:
            <div>
              <p style={{color:'red', display:'inline', fontSize:'18px'}}>{discussion.daysleft}</p>
              <p style={{display:'inline'}}> days left before expiration</p>
            </div>
            }

            {/* Content :: Body */}
            <p style={{color:'green', display:'inline', fontSize:'18px'}}>{discussion.quantity_available}</p>
            <p style={{display:'inline'}}> Remaining Quantity</p>
            {/* Content :: Actions
            <div className="blog-comments__actions">
              <ButtonGroup size="sm">
                <Button theme="white">
                  <span className="text-success">
                    <i className="material-icons">check</i>
                  </span>{" "}
                  Approve
                </Button>
                <Button theme="white">
                  <span className="text-danger">
                    <i className="material-icons">clear</i>
                  </span>{" "}
                  Reject
                </Button>
                <Button theme="white">
                  <span className="text-light">
                    <i className="material-icons">more_vert</i>
                  </span>{" "}
                  Edit
                </Button>
              </ButtonGroup>
            </div>
             */}
          </div>
        </div>
      ))}
    </CardBody>
{/* Content :: Body */}
    <CardFooter className="border-top">
      <Row>
        <Col className="text-center view-report">
          <Button theme="white" type="submit">
            View All Expired Items
          </Button>
        </Col>
      </Row>
    </CardFooter>
  </Card>
);

Stocks.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The discussions dataset.
   */
  discussions: PropTypes.array
};

Stocks.defaultProps = {
  title: "Upcoming Expired Food Packs",
  /*discussions: [
    {
      id: 1,
      date: "3 days ago",
      author: {
        image: require("../../images/avatars/1.jpg"),
        name: "John Doe",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "Well, the way they make shows is, they make one show ..."
    },
    {
      id: 2,
      date: "4 days ago",
      author: {
        image: require("../../images/avatars/2.jpg"),
        name: "John Doe",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "After the avalanche, it took us a week to climb out. Now..."
    },
    {
      id: 3,
      date: "5 days ago",
      author: {
        image: require("../../images/avatars/3.jpg"),
        name: "John Doe",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "My money's in that office, right? If she start giving me..."
    }
  ]*/
};

export default Stocks;
