import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../Header.js'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "../../styles/School.css";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ReactMapGL, {Marker} from 'react-map-gl';
import Icon from '@material-ui/core/Icon';

class SchoolPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      info: {},
      marginTop: 0,
      viewport: {}
    }
    this.renderPrograms = this.renderPrograms.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }
  renderPrograms(){
    
    return(
      this.state.info.programs.map((program) => {
        return(

          <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h2 className="program-title">{program.name}<span className="program-price">${program.tuition}</span></h2>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid direction="column">
          <p className="program-description" dangerouslySetInnerHTML={{__html: program.description}}></p>
          {/* <MuiThemeProvider theme={styles}> */}
          <Button variant="contained" color="primary" style={{float: "right", backgroundColor: "#4384AB"}}>
            Apply
          </Button>
          {/* </MuiThemeProvider> */}
          </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        )
        })
    )
  }
  componentDidMount(){
    const {match} = this.props
    const id = match.params.uid
    axios.get('http://localhost:8000/api/institutions/'+id,{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      console.log(response.data)
      this.setState({
          info: response.data
        });
        this.setState({
          viewport : {
            width: "100%",
            height: 400,
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            zoom: 12
          }
        })
    }).catch((error)=>{
      console.log(error.response.data);
    });
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll () {
    let scrollTop = window.scrollY;
    this.setState({
      marginTop: scrollTop + 'px',
    })
  }


  render() {
    const divStyle = {
        marginTop: this.state.marginTop
    };
    return (
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <Header/>
        <div className="body-wrapper">
          <Grid container spacing={24} direction="row" justify="center" alignItems="flex-start">
            <Grid item xs={9} md={3} className="school-info" style={divStyle}>
              <Card>
              <CardContent>
              {this.state.info.name ?
                <div>
                <img src={this.state.info.logo} alt="profilepic"/>
                <h3><img src={`https://www.countryflags.io/${this.state.info.country}/flat/24.png`} /> {this.state.info.name}</h3>
                <p>Founded in {this.state.info.founded}</p>
                <p>{[this.state.info.street, this.state.info.city, this.state.info.province].join(", ")}</p>
                {this.state.info.dli_number ? <p><strong>DLI Number</strong>: {this.state.info.dli_number}</p>  : ""}
                {this.state.info.cost_of_living ? <p><strong>Cost of Living</strong>: {this.state.info.cost_of_living}</p>  : ""}
                </div> : ""
              }
              </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={9} className="school-desc">
              <Card >
              <CardContent >
                <h1>About</h1>
                <div dangerouslySetInnerHTML={{__html: this.state.info.description}} />

                <h2>Location</h2>
                <ReactMapGL mapboxApiAccessToken={"pk.eyJ1IjoiaWNlYW5kZWxlIiwiYSI6ImNqb2F1dXFoazF3Ynozdm5sZDBtcW1xbnQifQ.MvnPlcX-tgVTqx-Vd-is-w"}
                  {...this.state.viewport}
                  onViewportChange={(viewport) => this.setState({viewport})}>
                  <Marker latitude={this.state.info.latitude} longitude={this.state.info.longitude} offsetLeft={-20} offsetTop={-10}>
                  <Icon className="material-icons" color="primary" style={{color: "#4384AB"}}>
                    school
                  </Icon>
                  </Marker>
                </ReactMapGL>
                <h2>Programs</h2>
                  
                {!this.state.info.programs ? <p>Loading.. </p> : this.renderPrograms()}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}



export default withRouter(SchoolPage);
