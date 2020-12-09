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
                <input ref={node => inputSt = node} placeholder={'State'}/>
                <input ref={node2 => inputQuery = node2}  placeholder={'Find by name'}/>
                <button type="submit">
                    Search for schools by States
                </button>
            </form>
        </div>
    )
}

export default connect()(FinderSchool)