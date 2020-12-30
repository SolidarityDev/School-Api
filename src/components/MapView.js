import React, {useState} from 'react'
import PropTypes from 'prop-types'
import ReactMapGL, {Marker} from "react-map-gl";
import SchoolIcon from "../images/school-icon.svg"

const TOKEN = "pk.eyJ1Ijoic29saWRhcml0eWRldiIsImEiOiJja2loZG9ocGYwZ2loMzNvM2Z0cHp2MXhiIn0.SKo-KQStnLaghXGGHKn0gQ"

const MapView = (props) => {
    const [viewport, setViewport] = useState({
        latitude: 39.7837304,
        longitude: -100.4458825,
        width: "1000px",
        height: "700px",
        zoom: 3.5,
    });

    return (
        <div className="render">
            <ReactMapGL className="map" {...viewport} mapboxApiAccessToken={TOKEN}
                        mapStyle="mapbox://styles/solidaritydev/ckihu1rz211271apf0sl9sgau"
                        onViewportChange={viewport => {
                            setViewport(viewport);
                        }}
            >
                {props.schools.map(school =>
                    <Marker
                        key={school.schoolid}
                        latitude={school.address.latLong.latitude}
                        longitude={school.address.latLong.longitude}
                    >
                        <button className="marker-btn">
                            <img src={SchoolIcon} alt="schools markers"/>
                        </button>
                    </Marker>
                )}
            </ReactMapGL>
        </div>
    )

};

MapView.propTypes = {
    schools: PropTypes.arrayOf(PropTypes.shape({
        schoolid: PropTypes.string.isRequired,
        schoolName: PropTypes.string.isRequired,
        address: PropTypes.shape({
            city: PropTypes.string.isRequired,
            stateFull: PropTypes.string.isRequired,
            zip: PropTypes.string.isRequired,
            latLong: PropTypes.shape({
                latitude: PropTypes.number.isRequired,
                longitude: PropTypes.number.isRequired
            }).isRequired
        }).isRequired,
        numberOfStudents: PropTypes.number,
        rankHistory: PropTypes.arrayOf(PropTypes.shape({
            rank: PropTypes.number.isRequired,
            rankLevel: PropTypes.string.isRequired,
            rankStars: PropTypes.number.isRequired,
        })),
    }).isRequired).isRequired,
}
export default MapView;