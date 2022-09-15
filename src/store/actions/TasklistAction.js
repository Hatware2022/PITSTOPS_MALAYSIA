import * as Actions from '../ActionTypes';

export const fetchTasklist = () => {
    return {
        type: Actions.FETCH_TASKLIST
    }
}

export const fetchTasklistSuccess = (data, params) => {
    return {
        type: Actions.FETCH_TASKLIST_SUCCESS,
        payload: data,
        params
    }
}

export const fetchTasklistFailure = (err) => {
    return {
        type: Actions.FETCH_TASKLIST_FAILURE,
        error: err
    }
}

export const fetchTask = () => {
    return {
        type: Actions.FETCH_TASK
    }
}

export const fetchTaskSuccess = (data) => {
    return {
        type: Actions.FETCH_TASK_SUCCESS,
        payload: data
    }
}

export const fetchTaskFailure = (err) => {
    return {
        type: Actions.FETCH_TASK_FAILURE,
        error: err
    }
}

export const updateTask = () => {
    return {
        type: Actions.UPDATE_TASK
    }
}

export const updateTaskSuccess = (data, params) => {
    return {
        type: Actions.UPDATE_TASK_SUCCESS,
        payload: data,
        params
    }
}

export const updateTaskFailure = (err) => {
    return {
        type: Actions.UPDATE_TASK_FAILURE,
        error: err
    }
}

export const storeWorklist = (data) => {
    return {
        type: Actions.STORE_WORKLIST,
        data
    }
}

export const updateSubTaskStatus = (data) => {
    return {
        type: Actions.UPDATE_SUBTASK_STATUS,
        payload: data
    }
}

export const selectAllStatusChanged = flag => {
    return {
        type: Actions.SELECT_ALL_STATUS_CHANGED,
        payload: flag
    }
}
export const mutateTasklist = (params) => {
    return {
        type: Actions.MUTATE_TASKLIST,
        params
    }
}

export const getWorklist = (store) => store.worklist.worklist

export const storeTask = (data) => {
    return {
        type: Actions.STORE_TASK,
        data
    }
}

export const getTask = (store) => store.tasklist.tempTask








