import * as Actions from '../ActionTypes';

export const fetchSavedWorklist = () => {
    return {
        type: Actions.FETCH_SAVED_WORKLIST
    }
}

export const fetchSavedWorklistSuccess = (data, params) => {
    return {
        type: Actions.FETCH_SAVED_WORKLIST_SUCCESS,
        payload: data,
        params
    }
}

export const fetchSavedWorklistFailure = (err) => {
    return {
        type: Actions.FETCH_SAVED_WORKLIST_FAILURE,
        error: err
    }
}



