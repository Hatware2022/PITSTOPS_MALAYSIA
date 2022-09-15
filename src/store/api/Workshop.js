import Actions from 'actions'
import * as ApiList from './ApiList'

export const fetchWorkshopEvent = (params) => async dispatch => {
    // console.log("###fetchWorkshopEvent PARAMS: ", params)
    dispatch(Actions.fetchWorkshop())
    try {
        const resp = await ApiList.fetchWorkshop(params)
        // console.log("###fetchWorkshop RESP:", resp)

        let newData = {}

        if (resp) {
            newData.metadata = { currentPage: params.pageIndex }
            newData.items = resp
        }

        dispatch(Actions.fetchWorkshopSuccess(newData ? newData : {}, params))
    } catch (error) {
        dispatch(Actions.fetchWorkshopFailure(error))
    }
}
