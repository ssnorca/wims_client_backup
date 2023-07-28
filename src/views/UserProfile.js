import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import  {data} from './data';
import ErrorAlert from '../components/actions/ErrorAlert';
import SuccessAlert from '../components/actions/SuccessAlert';
import ConfirmationAlert from '../components/actions/ConfirmationAlert';
import axios from 'axios';
import Logout from './Logout';
//import axios from '../axios';
//const UserAccountDetails = ({ title }) => (
    export default class UserAccountDetails extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                username:'',
                firstname:'',
                lastname:'',
                email:'',
                division:'',
                sections:[],
                section:'',
                sectionErr:'',
                contact:'',
                contactErr:'',
                designation:'',
                designationErr:'',
                init:0,
                dataJSON:[],
                alert_message:'',
                area:'',
                areaErr:''
              };
        }
        componentDidMount() {
            this.setState({ dataJSON: data });     
            var username  = localStorage.getItem('react-preferred_name');
            var firstname = localStorage.getItem('react-givenname'); 
            var lastname  = localStorage.getItem('react-familyname');
            var email     = localStorage.getItem('react-email');
            //console.log('u-a ' +logout);
              this.setState({ 
                username: username,
                firstname:firstname,
                lastname:lastname,
                email:email,
              });
              
          }

          onChange = e => {this.setState({
            [e.target.name]: e.target.value 
            })
          };

          division_onChange = e => {
            //var opt=document.createElement("option");
            this.setState({
              division: e.target.value 
            })
            var val=e.target.value;
            //console.log(val);
            this.getcity(val);
          };

          getcity = (e) =>{
            console.log(e);
            var result = [];
            for (var item, i = 0; item = data[i++];) {
                var id = i;
                var division = item.Division;
                var section = item.Section;
    
              if (division===e) {		
              result.push({id,section})	
              //console.log(division)
              }
            }	 
            this.setState({sections:result});
          }

          section_onChange = e => {
            this.setState({
              section: e.target.value 
            })
          };
          
          validate = () => {
            let sectionErr = '';
            let contactErr = '';
            let designationErr = '';
            let areaErr = '';
            if (!this.state.section) {
              sectionErr = "Section cannot be Empty";
            }
            if (!this.state.contact) {
              contactErr = "Contact cannot be Empty";
            }
            if (!this.state.designation) {
              designationErr = "Designation cannot be Empty";
            }
            if(!this.state.area){
              areaErr = "Area Designation cannot be Empty";
            }
            if (sectionErr || contactErr || designationErr || areaErr) {
              this.setState({ 
                contactErr:contactErr,
                designationErr:designationErr,
                sectionErr:sectionErr,
                areaErr:areaErr
               });
              return false;
            }
    
            return true;
        };
          onUpdate = (e) =>{
            //e.preventDefault();
            const isValid = this.validate();
            if (isValid) {
            // this.props.onAdd();
            // window.confirm('Are you sure you wish to delete this item?');
            const {username, firstname, lastname, email, division, section, contact, designation, area} = this.state
            const ffprequest ={
                username: username,
                firstname: firstname,
                lastname: lastname,
                email:email,
                division:division,
                section:section,
                contact:contact,
                designation:designation,
                valid:0,
                area,
            }
            //console.log(ffprequest)
            /*axios.post('/api/employee', ffprequest)
            .then(res => {
              this.setState({alert_message:"success"})
              this.liveRedirectTime = setTimeout(()=>{ 
                //this.setState({alert_message:''})
                window.location.replace('https://caraga-auth.dswd.gov.ph:8443/auth/realms/entdswd.local/protocol/openid-connect/logout?redirect_uri=https%3A%2F%2Fcaraga-whims-staging.dswd.gov.ph%2Fwhims%2F')
              }, 3000);
            }).catch(error=>{
              this.setState({alert_message:"error"})
            });*/
            var accessToken = localStorage.getItem('token');
            fetch(`${process.env.REACT_APP_API_PROXY}/api/employee`,{
              mode:'cors',
              method: 'POST',
              headers: {
                "Content-Type" : "application/json",
                "accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}`             
              },
                body: JSON.stringify(ffprequest)
              }).then(async response => {
                if (!response.ok) {
                const validation = await response.json();
                //console.log(validation.errors);
                this.setState({alert_message:"error"})
              }else{
                //history('/categories')
                //const validation = await response.json();
                this.setState({alert_message:"success"})
                this.liveRedirectTime = setTimeout(()=>{ 
                  //this.setState({alert_message:''})
                  window.location.replace('https://caraga-auth.dswd.gov.ph:8443/auth/realms/entdswd.local/protocol/openid-connect/logout?redirect_uri=https%3A%2F%2Fcaraga-whims-staging.dswd.gov.ph%2Fwhims%2F')
                }, 3000);
              }
            })


            }
           
          }
        render() {
            const { username, firstname, lastname, email, contact, division, section, designation, area } = this.state;
            return (
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                <h6 className="m-0">User Account Details</h6>
                </CardHeader>
                <ListGroup flush>
                <ListGroupItem className="p-3">
                    <Row>
                    <Col>
                        <Form>
                        <Row form>
                            {/* First Name */}
                            <Col md="6" className="form-group">
                            <label htmlFor="feFirstName">First Name</label>
                            <FormInput
                                name="firstname"
                                placeholder="First Name"
                                value={firstname || ''}
                                onChange={this.onChange}
                            />
                            </Col>
                            {/* Last Name */}
                            <Col md="6" className="form-group">
                            <label htmlFor="feLastName">Last Name</label>
                            <FormInput
                                id="lastname"
                                placeholder="Last Name"
                                value={lastname || ''}
                                onChange={this.onChange}
                            />
                            </Col>
                        </Row>
                        <Row form>
                            {/* Email */}
                            <Col md="6" className="form-group">
                            <label htmlFor="feEmail">Email</label>
                            <FormInput
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={email||''}
                                onChange={this.onChange}
                                autoComplete="email"
                            />
                            </Col>
                            {/* Password */}
                            <Col md="6" className="form-group">
                                <label htmlFor="feusername">Username</label>
                                <FormInput
                                name="username"
                                placeholder="Address"
                                value={username||''}
                                onChange={this.onChange}
                                />
                            </Col>
                        </Row>
                        <Row form>
                            {/* Email */}
                            <Col md="6" className="form-group">
                            <label htmlFor="feEmail">Division</label>
                            <FormSelect 
                                id="division" 
                                className="form-control"
                                value={division||''}
                                onChange={this.division_onChange}>
                                    <option value="empty">-</option>
                                    <option value="Administrative Division">Administrative Division</option>
                                    <option value="DRMD">DRMD</option>
                                    <option value="Finance Division">Finance Division</option>
                                    <option value="HRMDD">HRMDD</option>
                                    <option value="Planning Division">Planning Division</option>
                                    <option value="Promotive Services Division">Promotive Services Division</option>
                                    <option value="Protective Services Division">Protective Services Division</option>
                            </FormSelect>
                            </Col>
                            {/* Password */}
                            <Col md="6" className="form-group">
                                <label htmlFor="feusername">Section</label>
                                <select 
                                name="section" 
                                className="form-control"
                                value={section||''}
                                onChange={this.section_onChange}
                                >
                                    {this.state.sections.map((team) => <option key={team.id} value={team.section}>{team.section}</option>)}
                                </select>
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.sectionErr}
                                </div>
                            </Col>
                        </Row>
                        <Row form>
                            {/* City */}
                            <Col md="4" className="form-group">
                            <label htmlFor="feCity">Contact Number</label>
                            <FormInput
                                    required
                                    type="number"
                                    name="contact" 
                                    value={contact||''}
                                    onChange={this.onChange}
                                    placeholder="ex. 09104..."
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.contactErr}
                                </div>
                            </Col>
                            {/* State */}
                            <Col md="4" className="form-group">
                            <label htmlFor="feInputState">Position/Designation</label>
                            <FormSelect 
                                name="designation" 
                                className="form-control"
                                value={designation||''}
                                onChange={this.onChange}
                                >
                                    <option value="">Select Designation</option>
                                    <option value="admin">System Administrator</option>
                                    <option value="manager">Warehouse Manager</option>
                                    <option value="staff">Office Staff</option>
                            </FormSelect>
                            <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.designationErr}
                            </div>
                            </Col>
                            <Col md="4" className="form-group">
                            <label htmlFor="feInputArea">Area Designation</label>
                            <FormSelect 
                                name="area" 
                                className="form-control"
                                value={area||''}
                                onChange={this.onChange}>
                                    <option value="">-</option>
                                    <option value="Agusan del Norte">FO-Caraga</option>
                                    <option value="Agusan del Sur">Agusan del Sur</option>
                                    <option value="Surigao del Norte">Surigao del Norte</option>
                                    <option value="Surigao del Sur">Surigao del Sur</option>
                                    <option value="Province of Dinagat Island">Province of Dinagat Island</option>
                            </FormSelect>
                            <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.areaErr}
                            </div>
                            </Col>
                        </Row>
                        {this.state.alert_message=="success"?<ConfirmationAlert/>:null}
                        {this.state.alert_message=="error"?<ErrorAlert/>:null} 
                        <Button theme="accent" onClick={this.onUpdate} id='update'>Update Account</Button>
                        </Form>
                    </Col>
                    </Row>
                </ListGroupItem>
                </ListGroup>
            </Card>
            );
        }
    }
//);

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

//export default UserAccountDetails;
