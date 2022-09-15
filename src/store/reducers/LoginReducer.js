import * as Actions from '../ActionTypes';

const initialState = {
    username: '',
    password: '',
}

const LoginReducer = (state = initialState, action) => {
    console.log("LOGIN REDUCER --->" + action.type);
    switch (action.type) {
        case Actions.ADD_USERNAME:
            return {
                ...state,
                username: action.payload
            };
        case Actions.ADD_USER_PIN:
            return {
                ...state,
                password: action.payload
            }
        default:
            return state;
    }
}

export default LoginReducer;