import Actions from 'actions'
import * as ApiList from './ApiList'

export const fetchWorklistEvent = (params) => async dispatch => {
    dispatch(Actions.fetchWorklist())
    try {
        // console.log('#PARAMS: ', params)
        const resp = await ApiList.fetchWorklist(params)
        // console.log("##RESP:", resp.data)
        dispatch(Actions.fetchWorklistSuccess(resp.data ? resp.data.data : {}, params))
    } catch (error) {
        // console.log("##ERROR:", error)
        dispatch(Actions.fetchWorklistFailure(error))
    }
}

export const fetchWorklistPhasesEvent = (eventId) => async dispatch => {
    dispatch(Actions.fetchWorklistPhases())
    // console.log("EVENTID:", eventId)
    try {
        const resp = await ApiList.fetchWorklistPhases(eventId)
        // console.log("#fetchWorklistPhasesEvent RESP: ", resp)
        dispatch(Actions.fetchWorklistPhasesSuccess(resp.data ? resp.data.data : {}))
    } catch (error) {
        // console.log("#fetchWorklistPhasesEvent ERROR: ", error)
        dispatch(Actions.fetchWorklistPhasesFailure(error))
    }
}

export const saveBookmarkEvent = (worklist) => async dispatch => {
    dispatch(Actions.saveBookmark())
    // console.log('#saveBookmarkEvent: ', worklist)

    try {
        // const resp = await ApiList.saveBookmark(worklistId)
        // console.log("#saveBookmarkEvent DATA: ", resp.data)
        // dispatch(Actions.saveBookmarkSuccess(resp.data ? resp.data.data : {}, worklist))
        dispatch(Actions.saveBookmarkSuccess(null, worklist))
    } catch (error) {
        dispatch(Actions.saveBookmarkFailure(error))
    }
}