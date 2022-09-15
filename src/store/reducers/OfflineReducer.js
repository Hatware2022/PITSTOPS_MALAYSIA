import * as Actions from '../ActionTypes';

const initialState = {
    offline_mode: false,
    offline_data: [],
    offline_data_status: false,
    offline_progress: null, // completed, failed, progress 
};

const OfflineReducer = (state = initialState, action) => {
    console.log("OFFLINE REDUCER --->" + action.type);
    switch (action.type) {
        case Actions.OFFLINE_MODE_CHANGED:
            return {
                ...state,
                offline_mode: action.payload
            }
        case Actions.ADD_OFFLINE_DATA:
            return {
                ...state,
                offline_data: [].concat(...state.offline_data, action.payload)
            }
        case Actions.OFFLINE_DATA_CHANGED:
            return {
                ...state,
                offline_data: action.payload
            }
        case Actions.RESET_OFFLINE_DATA:
            return {
                ...state,
                offline_data: []
            }
        case Actions.OFFLINE_DATA_STATUS_CHANGED:
            return {
                ...state,
                offline_data_status: action.payload
            }
        case Actions.OFFLINE_PROGRESS_CHANGED:
            return {
                ...state,
                offline_progress: action.payload
            }
        default:
            return state;
    }
}

export default OfflineReducer;