import './SchoolsList.css';
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import  {getSchoolsList} from "../reducers/Schools";
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SchoolPic from '../images/school.jpeg'
import ReactMapGL, {Marker} from "react-map-gl";
import SchoolIcon from "../images/school-icon.svg"
import Teacher from "../images/teacher.svg"
import Graduate from "../images/graduate-logo.svg"
import StarRatings from 'react-star-ratings';
const TOKEN = "pk.eyJ1Ijoic29saWRhcml0eWRldiIsImEiOiJja2loZG9ocGYwZ2loMzNvM2Z0cHp2MXhiIn0.SKo-KQStnLaghXGGHKn0gQ"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


const SchoolsList = () => {
 
    const [viewport, setViewport] = useState({
        latitude: 39.7837304,
        longitude: -100.4458825,
        width: "1000px",
        height: "700px",
        zoom: 3.5,
      });
        const schools  = useSelector(getSchoolsList)
        const classes = useStyles();
       
        if (schools !== undefined){
            console.log(schools)

            
            const renderSchools = schools.map(school =>
                <Card>
                <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={SchoolPic}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    <div>
                         <span key={school.schoolid}></span> {school.schoolName}
                    </div>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  <div className="address">
                            <span>Address:</span> {school.address.street},
                            {school.address.city},
                            {school.address.state},
                            {school.address.stateFull},
                            {school.address.zip}
                        </div>
                        <div className="students">
                            <span>Students:</span>  {school.schoolYearlyDetails[0].numberOfStudents}
                        </div>
                  </Typography>
                  {school.rankHistory !== null && school.rankHistory.length > 0 && <StarRatings
                    rating={school.rankHistory[0].rankStars}
                    starRatedColor="purple"
                    numberOfStars={6}
                    name='rating'
                    starDimension="30px"
                />}
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>

         </Card>
                )
                
        return <div>
            <div className="render" >
                <ReactMapGL className="map" {...viewport} mapboxApiAccessToken={TOKEN}
                    mapStyle="mapbox://styles/solidaritydev/ckihu1rz211271apf0sl9sgau"
                    onViewportChange={viewport =>{
                    setViewport(viewport);
                    
                    }}
                    > 
                    {schools.map(school => 
                        <Marker
                        key={school.schoolid}
                        latitude={school.address.latLong.latitude}
                        longitude={school.address.latLong.longitude}
                        >
                            <button className="marker-btn">
                                <img src={SchoolIcon} alt="schools markers"></img>
                            </button>
                        </Marker>
                        )} 
                </ReactMapGL>
            <div>
                <img className ="logo-site" src={Teacher} alt="logo-website"></img>
            <p className="title">FIND YOUR SCHOOL</p>
            <p className="sentence">MAKE OUR SCHOOLS GREAT AGAIN</p>
                <img className ="graduate-logo" src={Graduate} alt="logo-website"></img>
            </div>     
    </div>
    <div className="cards">{renderSchools}
            </div>
     <p className="myself">Rachid ©</p>
    </div>
    }

     
    }


SchoolsList.propTypes = {
    schools: PropTypes.arrayOf(PropTypes.shape({
        schoolid: PropTypes.string.isRequired,
        schoolName: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        numberOfStudents: PropTypes.string.isRequired,
        lat: PropTypes.number,
        long: PropTypes.number,
    }).isRequired).isRequired,
}
export default SchoolsList