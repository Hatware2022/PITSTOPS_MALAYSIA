import * as Actions from '../ActionTypes';

const initialState = {
    username: '',
    isLogged: false,
    user_id: null,
    accessToken: null,
    selectedOpu: null,
    selectedOpuId: null,
    selectedEvent: '',
    selectedEventId: null,
    opuList: [],
    eventList: [],
    user: {},
    loading: false,
    internet: false
}

const UserReducer = (state = initialState, action) => {
    console.log("USER REDUCER --->" + action.type);
    switch (action.type) {
        case Actions.ADD_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case Actions.USER_NAME_CHANGED:
            return {
                ...state,
                username: action.payload
            }
        case Actions.IS_LOGGED:
            // console.log('### PAYLOAD: ', action.payload)
            return {
                ...state,
                isLogged: action.payload
            }
        case Actions.USER_ID_CHANGED:
            return {
                ...state,
                user_id: action.payload
            }
        case Actions.ACCESS_TOKEN_CHANGED:
            return {
                ...state,
                accessToken: action.payload
            }
        case Actions.SELECTED_OPU_ID_CHANGED:
            return {
                ...state,
                selectedOpuId: action.payload
            }
        case Actions.SELECTED_EVENT_ID_CHANGED:
            return {
                ...state,
                selectedEventId: action.payload
            }
        case Actions.FETCH_OPUS_LIST_SUCCESS:
            return {
                ...state,
                opuList: action.payload
            }
        case Actions.FETCH_OPUS_LIST_ERROR:
            return {
                ...state,
                opuList: state.opuList
            }
        case Actions.FETCH_EVENT_LIST_SUCCESS:
            return {
                ...state,
                eventList: action.payload
            }
        case Actions.FETCH_EVENT_LIST_ERROR:
            return {
                ...state,
                eventList: state.eventList
            }
        case Actions.FETCH_USER:
            return {
                ...state,
                loading: true
            }
        case Actions.FETCH_USER_SUCCESS:
            // console.log("##FETCH_USER_SUCCESS:", action.payload)
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case Actions.FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false
            }
        case Actions.UPLOAD_USER_PIC:
            return {
                ...state,
                loading: true
            }
        case Actions.UPLOAD_USER_PIC_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case Actions.UPLOAD_USER_PIC_FAILURE:
            return {
                ...state,
                loading: false
            }
        case Actions.INTERNET_CONNECTIVITY_CHANGED:
            return {
                ...state,
                internet: action.payload
            }
        // Temp
        case Actions.SET_WCS_VERIFIER: {
            return {
                ...state,
                user: { ...state.user, isWcsVerifier: action.payload }
            }
        }
        default:
            return state;
    }
}

export default UserReducer;