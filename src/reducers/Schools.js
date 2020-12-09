import * as types from '../constants/ActionTypes'

export const schoolInitialSate = {
    loading: false,
    loaded: false,
    count: 0,
    pages: 0,
    current_page: 0,
    perPage: 20,
    schoolsList: [],
    error: null
}

// Reducer
export default function schools(state = schoolInitialSate, action) {
    switch (action.type) {
        case types.REQUEST_SCHOOLS_FROM_ST:
            return Object.assign({}, state, {
                loading: true,
                perPage: action.perPage,
                error: null,
            })
        case types.RECEIVE_SCHOOLS_FROM_ST:
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                current_page: 1,
                count: action.response.numberOfSchools,
                pages: action.response.numberOfPages,
                schoolsList: action.response.schoolList
            })
        case types.CLEAR_SCHOOLS:
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
            })
        case types.CLEAR_SCHOOLS_COMPLETED:
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                count: 0,
                pages: 0,
                current_page: 0,
                error: null,
                schoolsList: []
            })
        case types.REQUEST_SCHOOLS_FROM_ST_FAILED:
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                error: action.error
            })
        default:
            return state
    }
}

// Selector
export const schoolsLoaded  = state => state.schools.loading === false && state.schools.loaded === true && state.schools.error === null;
export const getSchoolsList = state => state.schools.schoolsList;