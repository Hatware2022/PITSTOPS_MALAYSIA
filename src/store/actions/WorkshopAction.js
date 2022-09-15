import * as Actions from '../ActionTypes';

export const fetchWorkshop = () => {
    return {
        type: Actions.FETCH_WORKSHOP
    }
}

export const fetchWorkshopSuccess = (data, params) => {
    return {
        type: Actions.FETCH_WORKSHOP_SUCCESS,
        payload: data,
        params
    }
}

export const fetchWorkshopFailure = (err) => {
    return {
        type: Actions.FETCH_WORKSHOP_FAILURE,
        error: err
    }
}







