import * as types from '../constants/ActionTypes'
import * as API from '../API/SchoolsRequest'


export const requestAllSchoolsByST = (dispatch, st, query, perPage = 20) => {
   
    // dispatch({type : types.RECEIVE_SCHOOLS_FROM_ST}) 
    return API.retrieveSchools(st,query, perPage)
        .then(response => dispatch(receiveAllSchoolsByST(response.data)))
        .catch(error => {
            console.error(error)
            dispatch(requestAllSchoolsBySTFailed(error))
            // throw (error);
        })
}

export const receiveAllSchoolsByST = (response) => ({
    type: types.RECEIVE_SCHOOLS_FROM_ST,
    response: response
})

export const requestAllSchoolsBySTFailed = (error) => ({
    type: types.REQUEST_SCHOOLS_FROM_ST_FAILED,
    error: error
})

export const clearAllSchools = () => ({
    type: types.CLEAR_SCHOOLS
})

export const clearAllSchoolsCompleted = () => ({
    type: types.CLEAR_SCHOOLS_COMPLETED
})

export const enablesStub = () => ({
    type: types.ENABLES_STUB
})

export const disablesStub = () => ({
    type: types.DISABLES_STUB
})