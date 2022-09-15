import * as Actions from '../ActionTypes';

const initialState = {
    groups: [],
    status: [],
    loading: false,
    error: null
}

const TasklistFilterReducer = (state = initialState, action) => {
    console.log("TASKLIST FILTER REDUCER --->" + action.type);
    switch (action.type) {
        case Actions.GET_TASKLIST_FILTER:
            return {
                ...state,
                loading: true
            }
        case Actions.GET_TASKLIST_FILTER_SUCCESS:
            // console.log('PAYLOAD:', action.payload)
            let newGroups = []

            if (action.payload['groups'] && action.payload['groups'].length) {
                newGroups = action.payload['groups'].filter(item => item != null && item != undefined)
            }

            return {
                ...state,
                groups: newGroups,
                status: action.payload['status'] ? action.payload['status'] : [],
                loading: false
            }
        case Actions.GET_TASKLIST_FILTER_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state;
    }
}

export default TasklistFilterReducer;