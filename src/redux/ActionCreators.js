import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

// ------------ comments (add and failed)-----------------------------
export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if(response.ok) {
                    return response
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`)
                    error.response = response
                    throw error
                    // if there is a response, but it's a bad status
                }
            },
            error => {
                const errMess= new Error(error.message)
                throw errMess
                // if no response
            }
        )
        .then(response =>response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
})

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})


// ------------ new comment -----------------------------
export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})
// update local Redux store

export const postComment = (campsiteId, rating, author, text) => dispatch => {
    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
    newComment.date = new Date().toISOString()
    // handle async call to Fetch and server using Thunk

    return fetch(baseUrl + 'comments', { //optional 2nd argument in form of object
            method: "POST", //default is GET
            body: JSON.stringify(newComment), //JSON version of newComment object
            headers: {
                "Content-Type": "application/json" // lets server know to expect body formatted as json
            }
        })
        .then(response => {
                if(response.ok) {
                    return response
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`)
                    error.response = response
                    throw error
                    // if there is a response, but it's a bad status
                }
            },
            error => { throw error } //throw error to next catch block if promise is rejected
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        // updates redux store
        .catch(error => {
            console.log('post comment', error.message)
            alert('Your comment could not be posted\nError: ' + error.message)
        })
}


// ----------------- campsites (add, loading, failed) ------------------
export const fetchCampsites = () => dispatch => {
    dispatch(campsitesLoading())

    return fetch(baseUrl + 'campsites')
        .then(response => {
                if(response.ok) {
                    return response
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`)
                    error.response = response
                    throw error
                    // if there is a response, but it's a bad status
                }
            },
            error => {
                const errMess= new Error(error.message)
                throw errMess
                // if no response
            }
        )
        .then(response => response.json())
        // converts response (array of campsites) from json to JS
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)))
        // catches thrown errors
}
// uses thunk so can nest functions
// was simulating server request with setTimeout

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
})

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
})
// this action will be dispatched by fetchCampsites

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
})
// action that returns an error message

// ----------- promotions (add, loading, failed) ----------------------
export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading())

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if(response.ok) {
                    return response
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`)
                    error.response = response
                    throw error
                    // if there is a response, but it's a bad status
                }
            },
            error => {
                const errMess= new Error(error.message)
                throw errMess
                // if no response
            }
        )
        .then(response => response.json())
        // converts response (array of campsites) from json to JS
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)))
}

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
})

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
})
// this action will be dispatched by fetchCampsites

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
})

// ----------------- partners (add, loading, failed) ------------------
export const fetchPartners = () => dispatch => {
    dispatch(partnersLoading())

    return fetch(baseUrl + 'partners')
        .then(response => {
                if(response.ok) {
                    return response
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`)
                    error.response = response
                    throw error
                    // if there is a response, but it's a bad status
                }
            },
            error => {
                const errMess= new Error(error.message)
                throw errMess
                // if no response
            }
        )
        .then(response => response.json())
        // converts response (array of partners) from json to JS
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)))
        // catches thrown errors
}
// uses thunk so can nest functions
// was simulating server request with setTimeout

//---------------New feedback ----------------------

export const postFeedback = feedback => () => {
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; })
        .then(response => response.json())
        .then(response => { 
            console.log('Feedback: ', response); 
            alert('Thank you for your feedback!\n' + JSON.stringify(response));
        })
        .catch(error => { 
            console.log('Feedback: ', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        });
};

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
})

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
})
// this action will be dispatched by fetchPartners

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
})
// action that returns an error message

