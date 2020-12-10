import './SchoolsList.css';
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import  {getSchoolsList} from "../reducers/Schools";
import {useSelector} from "react-redux";
import ReactMapGL, {Marker} from "react-map-gl";
import SchoolIcon from "../images/school-icon.svg"
import Teacher from "../images/teacher.svg"
import Graduate from "../images/graduate-logo.svg"
const TOKEN = "pk.eyJ1Ijoic29saWRhcml0eWRldiIsImEiOiJja2loZG9ocGYwZ2loMzNvM2Z0cHp2MXhiIn0.SKo-KQStnLaghXGGHKn0gQ"


const SchoolsList = () => {
 
    const [viewport, setViewport] = useState({
        latitude: 39.7837304,
        longitude: -100.4458825,
        width: "1000px",
        height: "700px",
        zoom: 3.5,
      });
        const schools  = useSelector(getSchoolsList)
                
       
        if (schools !== undefined){

        
            const renderSchools = schools.map(school =>
                    <div className="card">
                        <div className="name">
                            <span key={school.schoolid}>Name:</span> {school.schoolName}
                        </div>

                        <div className="address">
                            <span>Address:</span> {school.address.street},
                            {school.address.city},
                            {school.address.state},
                            {school.address.stateFull},
                            {school.address.zip}
                        </div>
                        <div className="students">
                        <span> Students: </span> {school.schoolYearlyDetails[0].numberOfStudents}
                        </div>
                    </div>
                )
                
                
        return <div className="render" >
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
            <div className="cards">{renderSchools}
            </div>
     
            </div>
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