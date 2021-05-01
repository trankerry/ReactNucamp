import * as ActionTypes from './ActionTypes'

export const Comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload}
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload}
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload
            // comment.id = state.comments.length //JSON now adds automatically
            // comment.date = new Date().toISOString() //date added in POST comment ActionCreators
            return {...state, comments: state.comments.concat(comment)}
        default:
            return state
    }
}