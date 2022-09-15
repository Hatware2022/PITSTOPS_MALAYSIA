import Actions from 'actions'
import * as ApiList from './ApiList'

export const fetchTasklistEvent = (params) => async dispatch => {
    dispatch(Actions.fetchTasklist())
    try {
        const resp = await ApiList.fetchTasklist(params)
        // console.log("RESP:", resp.data)

        dispatch(Actions.fetchTasklistSuccess(resp.data ? resp.data.data : {}, params))
    } catch (error) {
        dispatch(Actions.fetchTasklistFailure(error))
    }
}

export const fetchTaskEvent = (id) => async dispatch => {
    dispatch(Actions.fetchTask())
    try {
        const resp = await ApiList.fetchTask(id)
        // console.log("###fetchTask RESP:", resp.data)

        dispatch(Actions.fetchTaskSuccess(resp.data ? resp.data.data : {}))
    } catch (error) {
        dispatch(Actions.fetchTaskFailure(error))
    }
}

export const updateTaskEvent = (params) => async dispatch => {
    dispatch(Actions.updateTask())
    try {
        // console.log("#PARAMS: ", params)
        const resp = await ApiList.updateTasklist(params)
        // console.log("###updateTaskEvent RESP:", resp.data)

        dispatch(Actions.updateTaskSuccess(resp.data ? resp.data.data : {}, params))
        dispatch(Actions.updateActivityLogs(resp.data ? resp.data.data : {}, params))
    } catch (error) {
        dispatch(Actions.updateTaskFailure(error))
    }
}