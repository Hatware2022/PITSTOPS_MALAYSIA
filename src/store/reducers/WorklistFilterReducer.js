import * as Actions from '../ActionTypes';

const initialState = {
    disciplines: [],
    workCategories: [],
    locations: [],
    subLocation1s: [],
    subLocation2s: [],
    status: [],
    equipmentTypes: [],
    equipmentNos: [],
    notes: [],
    phases: [],
    loading: false,
    error: null
}

const WorklistReducer = (state = initialState, action) => {
    console.log("WORKLIST FILTER REDUCER --->" + action.type);
    switch (action.type) {
        case Actions.GET_WORKLIST_FILTER:
            return {
                ...state,
                loading: true
            }
        case Actions.GET_WORKLIST_FILTER_SUCCESS:
            // console.log('PAYLOAD:', action.payload)
            return {
                ...state,
                disciplines: action.payload['disciplines'] ? action.payload['disciplines'] : [],
                workCategories: action.payload['workCategories'] ? action.payload['workCategories'] : [],
                locations: action.payload['locations'] ? action.payload['locations'] : [],
                subLocation1s: action.payload['subLocation1s'] ? action.payload['subLocation1s'] : [],
                subLocation2s: action.payload['subLocation2s'] ? action.payload['subLocation2s'] : [],
                status: action.payload['status'] ? action.payload['status'] : [],
                equipmentTypes: action.payload['equipmentTypes'] ? action.payload['equipmentTypes'] : [],
                equipmentNos: action.payload['equipmentNos'] ? action.payload['equipmentNos'] : [],
                notes: action.payload['notes'] ? action.payload['notes'] : [],
                phases: action.payload['phases'] ? action.payload['phases'] : [],
                loading: false
            }
        case Actions.GET_WORKLIST_FILTER_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state;
    }
}

export default WorklistReducer;