import Actions from 'actions'
import * as ApiList from './ApiList'

export const fetchUserEvent = (id) => async dispatch => {
    try {
        const resp = await ApiList.fetchUser(id)
        // console.log("##FETCHUSER RESP:", resp.data)

        dispatch(Actions.fetchUserSuccess(resp.data ? resp.data.data : {}))
    } catch (error) {
        dispatch(Actions.fetchUserFailure(error))
    }
}

export const uploadUserPicEvent = (params) => async dispatch => {
    dispatch(Actions.uploadUserPic())
    try {
        dispatch(Actions.uploadUserPicSuccess(params))
    } catch (error) {
        dispatch(Actions.uploadUserPicFailure(error))
    }
}