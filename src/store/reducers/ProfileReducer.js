import * as Actions from '../ActionTypes';

const initialState = {
    data: {},
    loading: false,
    error: null
}

const ProfileReducer = (state = initialState, action) => {
    // console.log("PROFILE REDUCER --->" + action.type);
    switch (action.type) {
        case Actions.FETCH_PROFILE:
            return {
                ...state,
                loading: true
            }
        case Actions.FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case Actions.FETCH_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case Actions.UPLOAD_PROFILE_PIC:
            return {
                ...state,
                loading: true
            }
        case Actions.UPLOAD_PROFILE_PIC_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case Actions.UPLOAD_PROFILE_PIC_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default ProfileReducer;