import * as Actions from '../ActionTypes';

export const getWorklistFilter = () => {
    return {
        type: Actions.GET_WORKLIST_FILTER
    }
}

export const getWorklistFilterSuccess = (data) => {
    return {
        type: Actions.GET_WORKLIST_FILTER_SUCCESS,
        payload: data
    }
}

export const getWorklistFilterFailure = (err) => {
    return {
        type: Actions.GET_WORKLIST_FILTER_FAILURE,
        error: err
    }
}





