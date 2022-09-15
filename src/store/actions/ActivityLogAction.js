import * as Actions from '../ActionTypes';

export const fetchActivityLogs = () => {
    return {
        type: Actions.FETCH_ACTIVITY_LOGS
    }
}

export const fetchActivityLogsSuccess = (data, params) => {
    return {
        type: Actions.FETCH_ACTIVITY_LOGS_SUCCESS,
        payload: data,
        params
    }
}

export const fetchActivityLogsFailure = (err) => {
    return {
        type: Actions.FETCH_ACTIVITY_LOGS_FAILURE,
        error: err
    }
}

export const updateActivityLogs = (data, params) => {
    return {
        type: Actions.UPDATE_ACTIVITY_LOGS,
        payload: data,
        params
    }
}







