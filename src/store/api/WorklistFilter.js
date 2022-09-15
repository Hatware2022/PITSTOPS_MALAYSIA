import Actions from 'actions'
import * as ApiList from './ApiList'

export const getWorklistFilterEvent = () => async dispatch => {
    dispatch(Actions.getWorklistFilter())
    try {
        const data = await ApiList.getWorklistFilter()
        // console.log("#getWorklistFilterEvent Response: ", data.data)
        dispatch(Actions.getWorklistFilterSuccess(data.data ? data.data.data : {}))
    } catch (error) {
        // console.log("#getWorklistFilterEvent ERROR: ", error)
        dispatch(Actions.getWorklistFilterFailure(error))
    }
}
