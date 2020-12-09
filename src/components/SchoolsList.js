import './SchoolsList.css';
import React from 'react'
import PropTypes from 'prop-types'
import  {getSchoolsList} from "../reducers/Schools";
import {useSelector} from "react-redux";


const SchoolsList = () => {

        const schools  = useSelector(getSchoolsList)
        console.log("this is school:",schools)
        if (schools !== undefined){

        
            const renderSchools = schools.map(school =>
                    <div className="card">
                        <div className="name">
                            Name: {school.schoolName}
                        </div>

                        <div className="address">
                            Adress: {school.address.street},
                            {school.address.city},
                            {school.address.state},
                            {school.address.stateFull},
                            {school.address.zip}
                        </div>
                        <div className="students">
                            Students: {school.schoolYearlyDetails[0].numberOfStudents}
                        </div>
                    </div>
                )
                
        return <div className="cards">{renderSchools},
                
    </div>
    }
    
}

SchoolsList.propTypes = {
    schools: PropTypes.arrayOf(PropTypes.shape({
        schoolid: PropTypes.string.isRequired,
        schoolName: PropTypes.string.isRequired,
        highGrade: PropTypes.string.isRequired,
        schoolLevel: PropTypes.string.isRequired,
        isVirtualSchool: PropTypes.string.isRequired
    }).isRequired).isRequired,
}
export default SchoolsList