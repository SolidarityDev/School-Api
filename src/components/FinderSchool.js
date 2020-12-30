import React from 'react'
import {connect, useSelector} from 'react-redux'
import {requestAllSchoolsByST, disablesStub, enablesStub} from "../actions"
import Button from 'react-bootstrap/Button';
import Teacher from "../images/teacher.svg"
import './SchoolsList.css';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {isSchoolLoading} from '../reducers/Schools.js';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const FinderSchool = ({ dispatch }) => {

    const classes = useStyles();
    let inputSt
    let inputQuery

    const handleStub = (value) => (value ? dispatch(enablesStub()) : dispatch(disablesStub()))

    const schoolIsLoading = useSelector(isSchoolLoading);
     
    return (
        <div>
            <img className="logo-site" src={Teacher} alt="logo-website"/>
            <p className="title">FIND YOUR SCHOOL</p>
            <form onSubmit={e => {
                e.preventDefault()
                if (!inputSt.value.trim()) {
                    return
                }
                
                requestAllSchoolsByST(dispatch, inputSt.value, inputQuery.value)
            }}>
            
            <span> <input className="stub" type="checkbox" name="stub" onChange={e => handleStub(e.target.checked)}/>
            <label htmlFor="stub">Activate Stub</label>
               <br></br></span>
               <span>  <input className="inputs" ref={node => inputSt = node} placeholder={'State'}/>
                <input className="inputs" ref={node2 => inputQuery = node2}  placeholder={'Name'}/></span>
                <Button type="submit" variant="outline-dark" className="btn-search">Search</Button>
            </form>
           
             <Backdrop className={classes.backdrop} open={schoolIsLoading}>
            <CircularProgress color="inherit" />
            </Backdrop>

        </div>
    )
}

export default connect()(FinderSchool)