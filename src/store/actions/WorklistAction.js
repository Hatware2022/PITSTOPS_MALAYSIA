import * as Actions from '../ActionTypes';

export const fetchWorklist = () => {
    return {
        type: Actions.FETCH_WORKLIST
    }
}

export const fetchWorklistSuccess = (data, params) => {
    return {
        type: Actions.FETCH_WORKLIST_SUCCESS,
        payload: data,
        params
    }
}

export const fetchWorklistFailure = (err) => {
    return {
        type: Actions.FETCH_WORKLIST_FAILURE,
        error: err
    }
}

export const fetchWorklistPhases = () => {
    return {
        type: Actions.FETCH_WORKLIST_PHASES
    }
}

export const fetchWorklistPhasesSuccess = (data) => {
    return {
        type: Actions.FETCH_WORKLIST_PHASES_SUCCESS,
        payload: data
    }
}

export const fetchWorklistPhasesFailure = (err) => {
    return {
        type: Actions.FETCH_WORKLIST_PHASES_FAILURE,
        error: err
    }
}

export const saveBookmark = () => {
    return {
        type: Actions.SAVE_BOOKMARK
    }
}

export const saveBookmarkSuccess = (data, params) => {
    return {
        type: Actions.SAVE_BOOKMARK_SUCCESS,
        payload: data,
        params: params
    }
}

export const saveBookmarkFailure = (err) => {
    return {
        type: Actions.SAVE_BOOKMARK_FAILURE,
        error: err
    }
}


