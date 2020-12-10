import React from 'react'
import { connect} from 'react-redux'
import { requestAllSchoolsByST } from "../actions"


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
                <button type="submit">
                    Search for schools
                </button>
            </form>
            
        </div>
    )
}

export default connect()(FinderSchool)