import * as Actions from '../ActionTypes';

export const addUsername = userName => {
    return {
        type: Actions.ADD_USERNAME,
        payload: userName
    }
}

export const addPassword = password => {
    return {
        type: Actions.ADD_USER_PIN,
        payload: password
    }
}


