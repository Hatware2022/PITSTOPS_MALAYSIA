import Actions from 'actions'
import * as ApiList from './ApiList'

export const getTasklistFilterEvent = (worklistId) => async dispatch => {
    dispatch(Actions.getTasklistFilter())
    try {
        const data = await ApiList.getTasklistFilter(worklistId)

        dispatch(Actions.getTasklistFilterSuccess(data.data ? data.data.data : {}))
    } catch (error) {
        dispatch(Actions.getTasklistFilterFailure(error))
    }
}
