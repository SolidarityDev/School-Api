import React from 'react'
import { connect} from 'react-redux'
import { requestAllSchoolsByST } from "../actions"
import Button from 'react-bootstrap/Button';


const FinderSchool = ({ dispatch }) => {
    let inputSt
    let inputQuery
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!inputSt.value.trim()) {
                    return
                }
                requestAllSchoolsByST(dispatch, inputSt.value, inputQuery.value)
                inputSt.value = ''
                inputQuery.value = ''
            }}>
              
                <input className="inputs" ref={node => inputSt = node} placeholder={'State'}/>
                
                <input className="inputs" ref={node2 => inputQuery = node2}  placeholder={'Find by name'}/>
                <Button type="submit" variant="outline-dark" className="btn-search">Search</Button>
            </form>
        </div>
    )
}

export default connect()(FinderSchool)