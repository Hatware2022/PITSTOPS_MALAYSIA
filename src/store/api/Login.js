import Actions from 'actions'
import * as ApiList from './ApiList'


export const fetchOpusList = (params) => async dispatch => {
    const resp = await ApiList.fetchOpusList(params)
    try {
        // console.log("RESP:", resp.data)
        console.log("OPUS RESPONSE : " + JSON.stringify(resp.data));
        dispatch(Actions.fetchOpusListSuccess(resp.data ? resp.data.data : {}))
    } catch (error) {
        console.log("ERROR:", error)
        dispatch(Actions.fetchOpusListError(error))
    }
}

export const fetchEventList = (params) => async dispatch => {
    const resp = await ApiList.fetchEventList(params)
    try {
        // console.log("RESP:", resp.data)
        console.log("EVENT RESPONSE : " + JSON.stringify(resp.data));
        dispatch(Actions.fetchEventListSuccess(resp.data ? resp.data.data : {}))
    } catch (error) {
        console.log("EVENT ERROR:", error)
        dispatch(Actions.fetchEventListError(error))
    }
}