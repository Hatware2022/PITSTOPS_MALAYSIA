import * as Actions from '../ActionTypes';

export const getTasklistFilter = () => {
    return {
        type: Actions.GET_TASKLIST_FILTER
    }
}

export const getTasklistFilterSuccess = (data) => {
    return {
        type: Actions.GET_TASKLIST_FILTER_SUCCESS,
        payload: data
    }
}

export const getTasklistFilterFailure = (err) => {
    return {
        type: Actions.GET_TASKLIST_FILTER_FAILURE,
        error: err
    }
}





