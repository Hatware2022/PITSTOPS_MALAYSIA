import * as Actions from '../ActionTypes';
import AzureAuth from 'react-native-azure-auth';
import jwt_decode from "jwt-decode";

export const isLoggedChanged = flag => {
    return {
        type: Actions.IS_LOGGED,
        payload: flag
    }
}

export const userIdChanged = userId => {
    return {
        type: Actions.USER_ID_CHANGED,
        payload: userId
    }
}

export const accessTokenChanged = token => {
    return {
        type: Actions.ACCESS_TOKEN_CHANGED,
        payload: token
    }
}

export const userNameChanged = name => {
    return {
        type: Actions.USER_NAME_CHANGED,
        payload: name
    }
}

export const selectedOpuChanged = opu => {
    return {
        type: Actions.SELECTED_OPU_CHANGED,
        payload: opu
    }
}

export const selectedOpuIdChanged = opuid => {
    return {
        type: Actions.SELECTED_OPU_ID_CHANGED,
        payload: opuid
    }
}

export const selectedEventChanged = eventname => {
    return {
        type: Actions.SELECTED_EVENT_CHANGED,
        payload: eventname
    }
}

export const selectedEventIdChanged = eventid => {
    return {
        type: Actions.SELECTED_EVENT_ID_CHANGED,
        payload: eventid
    }
}


export const fetchOpusList = params => {
    return {
        type: Actions.FETCH_OPUS_LIST,
        payload: params
    }
}

export const fetchOpusListSuccess = data => {
    return {
        type: Actions.FETCH_OPUS_LIST_SUCCESS,
        payload: data
    }
}

export const fetchOpusListError = data => {
    return {
        type: Actions.FETCH_OPUS_LIST_ERROR,
        payload: data
    }
}
export const fetchEventList = params => {
    return {
        type: Actions.FETCH_EVENT_LIST,
        payload: params
    }
}

export const fetchEventListSuccess = data => {
    return {
        type: Actions.FETCH_EVENT_LIST_SUCCESS,
        payload: data
    }
}

export const fetchEventListError = data => {
    return {
        type: Actions.FETCH_EVENT_LIST_ERROR,
        payload: data
    }
}
export const getToken = store => store.root.user.accessToken
export const getUserId = store => store.root.user.user_id

export const fetchUser = () => {
    return {
        type: Actions.FETCH_USER
    }
}

export const fetchUserSuccess = (data) => {
    return {
        type: Actions.FETCH_USER_SUCCESS,
        payload: data
    }
}

export const fetchUserFailure = (err) => {
    return {
        type: Actions.FETCH_USER_FAILURE,
        error: err
    }
}

export const uploadUserPic = () => {
    return {
        type: Actions.UPLOAD_USER_PIC
    }
}

export const uploadUserPicSuccess = (data) => {
    return {
        type: Actions.UPLOAD_USER_PIC_SUCCESS,
        payload: data
    }
}

export const uploadUserPicFailure = (err) => {
    return {
        type: Actions.UPLOAD_USER_PIC_FAILURE,
        error: err
    }
}

export const internetStatusChanged = flag => {
    return {
        type: Actions.INTERNET_CONNECTIVITY_CHANGED,
        payload: flag
    }
}

export function refreshAccessToken(user_id, access_token) {
    return async function (dispatch) {
        try {
            const azureAuth = new AzureAuth({
                clientId: '7aba82e4-0e98-4bdf-8271-c4b19adb16ba'
            });
            var dateNow = new Date();
            if ((jwt_decode(access_token).exp) < dateNow / 1000) {
                console.log("REFRESH ACCESS TOKEN:===================================REFRESH ACCESS TOKEN");
                console.log("GETTING NEW ACCESS TOKEN FOR USER : " + user_id);
                let tokens = await azureAuth.auth.acquireTokenSilent({ scope: 'api://7aba82e4-0e98-4bdf-8271-c4b19adb16ba/App.Read', userId: user_id })
                console.log("NEW ACCESS TOKEN : " + JSON.stringify(tokens));
                dispatch(accessTokenChanged(tokens.accessToken))
            } else {
                console.log("TOKEN NOT EXPIRED======================================================TOKEN NOT EXPIRED");
            }
        } catch (error) {
            console.log("ERROR : " + error)

        }
    }
}

// Temp 
export const setWcsVerifier = (data) => {
    return {
        type: Actions.SET_WCS_VERIFIER,
        payload: data
    }
}

