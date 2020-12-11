import React from 'react'
import {connect} from 'react-redux'
import {requestAllSchoolsByST, disablesStub, enablesStub } from "../actions"
import Button from 'react-bootstrap/Button';
import * as LocalApi from "/Users/supermac/Desktop/Emmaus-School-Api/school-finder-front/src/stub/local-api.json"

const FinderSchool = ({ dispatch }) => {

    let inputSt
    let inputQuery

    const handleStub = (value) => {
    
        if (value) {
            dispatch(enablesStub())
            console.log(value);
        } else {
          dispatch(disablesStub())
          console.log(value);
        }
    }  
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!inputSt.value.trim()) {
                    return
                }
                if(enablesStub)
                {
                    alert('hello')
                }
                requestAllSchoolsByST(dispatch, inputSt.value, inputQuery.value)
                inputSt.value = ''
                inputQuery.value = ''
            }}>
            
               <span> <input className="stub" type="checkbox" name="stub" onChange={e => handleStub(e.target.checked)}/>
               <label for="stub">Activate Stub</label>
               <br></br></span>
               <span>  <input className="inputs" ref={node => inputSt = node} placeholder={'State'}/>
                <input className="inputs" ref={node2 => inputQuery = node2}  placeholder={'Find by name'}/></span>
                <Button type="submit" variant="outline-dark" className="btn-search">Search</Button>
            </form>
        </div>
    )
}

export default connect()(FinderSchool)