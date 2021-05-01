//import { CAMPSITES } from '../shared/campsites'
// don't need anymore because receiving CAMPSITES data from an action

import * as ActionTypes from './ActionTypes'
// import action types instead

/*export const Campsites = (state = CAMPSITES, action) => {
    switch (action.type) {
        default:
            return state
    }
change state to include 3 properties
}*/

export const Campsites = (state = {
        isLoading: true,
        errMess: null,
        campsites: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload}
        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []}
        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload}
        default:
            return state
    }
}