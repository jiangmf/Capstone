import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Header from '../Header';
import Scrollspy from 'react-scrollspy';
import Grid from '@material-ui/core/Grid';
import profilepic from '../../assets/profilepic.png'
import Summary from './Summary'
import Education from './Education'
import CreateProfile from './CreateProfile'
import Interest from './Interest'
import axios from 'axios'
import '../../styles/App.css'
import GLOBALS from "../../config/common";
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import concat from 'concat-stream';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      openeditprofile: 1,
      summary:"",
      educationlevel:"",
      interestField:"",
      firstname:"",
      lastname:"",
      phone: "",
      city: "",
      age: "",
      grade: "",
      school: "",
      email: "",
      selectedFile: null,
      uid: null,
      transcript: "",
      profile_pic: null,
    }
    this.fileSelectHandler = this.fileSelectHandler.bind(this)
    this.fileUploadHandler = this.fileUploadHandler.bind(this)
    this.picUploadHandler = this.picUploadHandler.bind(this)
  }
  componentDidMount(){
    axios.get(
      GLOBALS.API_ROOT + "/api/users/details/",
      {
        headers: { Authorization: "Token " + localStorage.getItem("token") }
      })
    .then((response) => {      
      this.setState(
        {
          summary: response.data.summary,
          educationlevel: response.data.education_level,
          interestField: response.data.interest,
          firstname: response.data.first_name,
          lastname: response.data.last_name,
          email: response.data.email,
          uid: response.data.uid,
          transcript: response.data.transcript,
          profile_pic: response.data.profilepic,
        }
      )

    })
    .catch((error) => {
     console.log(error);
   });
  }

  componentWillReceiveProps(prop){
    this.setState(prop.user)
  }

  fileSelectHandler(e){
    console.log(e.target)
    console.log(e.target.files[0])
    this.setState({selectedFile: e.target.files[0]})
  }

  fileUploadHandler(e){
    const fd = new FormData()
    console.log(this.state.selectedFile.name)
    fd.append('transcript', this.state.selectedFile)
    axios.put(GLOBALS.API_ROOT + "/api/users/details/",fd,
    {
      headers: { 
        Authorization: "Token " + localStorage.getItem("token"),
        'Content-Type': 'multipart/form-data' 
      }
    }).then((response) => {
      console.log(response);
      this.setState({transcript: response.data.transcript})
    })
    .catch((error) => {
     console.log(error);
   });
  }

  picUploadHandler(e){
    const fd = new FormData()
    console.log(e.target.files[0])
    fd.append('profilepic', e.target.files[0])
    axios.put(GLOBALS.API_ROOT + "/api/users/details/",fd,
    {
      headers: { 
        Authorization: "Token " + localStorage.getItem("token"),
        'Content-Type': 'multipart/form-data' 
      }
    }).then((response) => {
      console.log(response);
      this.setState({profile_pic: response.data.profilepic})
    })
    .catch((error) => {
     console.log(error);
   });
  }
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <div className="body-wrapper">
          <Grid container spacing={24} direction="row" justify="center" alignItems="flex-start">
            <Grid item xs={3}>
              <Card className="profile">
              <CardContent className="profileInfo">
                <input
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{display: 'none'}}
                    onChange={this.picUploadHandler}
                />
                <label htmlFor="contained-button-file">
                <img 
                  className="profilePicture" 
                  src={this.state.profile_pic == null ? profilepic : this.state.profile_pic} 
                  alt="profilepic"
                />
                </label>
                <h3>{this.state.firstname} {this.state.lastname}</h3>
                <p><b>Email:</b> {this.state.email}</p>
                <Divider/>
                <Scrollspy items={ ['summary', 'education', 'interest'] } currentClassName="is-current">
                  <li>
                    <a href="#summary"><h4>Summary</h4></a>
                  </li>
                  <li>
                    <a href="#education"><h4>Education</h4></a>
                  </li>
                  <li>
                    <a href="#interest"><h4>Interest</h4></a>
                  </li>
                  <li>
                    <a href="#documents"><h4>Transcript</h4></a>
                  </li>
                </Scrollspy>
              </CardContent>
              </Card>
            </Grid>
            <Grid item xs={9}>
              <Card >
              <CardContent className="profileContent">
                <div>
                  <div>
                    <CreateProfile/>
                  </div>
                  <section id="summary" className="editSection">
                  <div>
                      <Summary/>
                  </div>
                  </section>
                  <section id="education" className="editSection">
                  <div>
                      <Education/>
                  </div>
                  </section>
                  <section id="interest" className="editSection">
                      <Interest/>
                  </section>
                  <section id="documents" className="editSection">
                  <h2>Transcript</h2>
                  {this.state.transcript != null ? <a href={this.state.transcript}>View Transcript</a> :
                      <p></p>
                    }
                  <br/>
                  <br/>
                  <input
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{display: 'none'}}
                    onChange={this.fileSelectHandler}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                      Choose File  
                    </Button>
                  </label>
                  <Button variant="contained" component="span" type="submit" style={{marginLeft: "20px"}} onClick={this.fileUploadHandler}>
                      Upload
                  </Button>
                  </section>
              </div>
              </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile);
