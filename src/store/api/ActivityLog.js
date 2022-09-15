import Actions from 'actions'
import * as ApiList from './ApiList'

export const fetchActivityLogsEvent = (params) => async dispatch => {
    // console.log("###fetchActivityLogsEvent PARAMS: ", params)
    dispatch(Actions.fetchActivityLogs())
    try {
        const resp = await ApiList.fetchActivityLogs(params)
        // console.log("###fetchActivityLogs RESP:", resp.data)

        dispatch(Actions.fetchActivityLogsSuccess(resp.data ? resp.data.data : {}, params))
    } catch (error) {
        dispatch(Actions.fetchActivityLogsFailure(error))
    }
}
