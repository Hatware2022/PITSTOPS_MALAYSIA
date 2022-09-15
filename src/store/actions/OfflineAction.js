import * as Actions from '../ActionTypes';

export const offlineModeChanged = (mode) => {
    return {
        type: Actions.OFFLINE_MODE_CHANGED,
        payload: mode
    }
}

export const addOfflineData = data => {
    return {
        type: Actions.ADD_OFFLINE_DATA,
        payload: data
    }
}

export const offlineDataChanged = data => {
    return {
        type: Actions.OFFLINE_DATA_CHANGED,
        payload: data
    }
}

export const resetOfflineData = data => {
    return {
        type: Actions.RESET_OFFLINE_DATA,
        payload: data
    }
}

export const offlineDataStatusChanged = data => {
    return {
        type: Actions.OFFLINE_DATA_STATUS_CHANGED,
        payload: data
    }
}

export const offlineProgressChanged = status => {
    return {
        type: Actions.OFFLINE_PROGRESS_CHANGED,
        payload: status
    }
}

