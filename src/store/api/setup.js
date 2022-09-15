import axios from 'axios';
import Config from 'react-native-config';
import { store } from 'store/store'
const { API_URL } = Config;
import { getToken, getUserId } from 'actions/UserAction'
import { useSelector, useDispatch } from 'react-redux';



const fullUrlFrom = (endpoint) => {
    const url = `${API_URL}/${endpoint}`;
    console.log("URL: ", url);
    return url;
}



// export const refreshAccessToken = async dispatch => {

//     try {
//         console.log("REFRESH ACCESS TOKEN:===================================");
//         const state = store.getState()
//         const user_id = getUserId(state)
//         console.log("GETTING NEW ACCESS TOKEN FOR USER : " + user_id);
//         let tokens = azureAuth.auth.acquireTokenSilent({ scope: 'api://7aba82e4-0e98-4bdf-8271-c4b19adb16ba/App.Read', userId: user_id })
//         console.log("NEW ACCESS TOKEN : " + tokens.accessToken);
//         dispatch(Actions.accessTokenChanged(tokens.accessToken))
//         return tokens.accessToken
//     } catch (error) {
//         console.log("ERROR : " + error)
//         return null;
//     }
// }

export const configureInterceptor = async () => {
    // const token1 = await refreshAccessToken();
    axios.interceptors.request.use(async (config) => {
        const newConfig = config
        const state = store.getState()
        const token = getToken(state)
        console.log("TOKEN=======================" + token);

        if (token) {
            const tokenString = `Bearer ${token}`
            newConfig.headers.common['Authorization'] = tokenString
        }
        newConfig.headers.common['Accept'] = '*/*'
        newConfig.headers.common['Content-Type'] = 'application/json'
        return newConfig;
    }, err => {
        console.log('REQ INTERCEPTOR ERROR: ', err)
    });

    axios.interceptors.response.use((resp) => {
        // console.log("INTERCEPTOR RESP: ", resp);
        // const { data } = resp;
        // return data;
        return resp
    }, err => {
        console.log("RESP INTERCEPTOR ERROR: ", err);
        if (err.response) {
            // if (err.response.status === 401) {

            // }
            Promise.reject(err.response);
        }
        return Promise.reject('Please check your internet connection or try again later');
    });
}

const fetchUrl = (method, endpoint, params = {}, options = {}) => {
    // let newData = JSON.stringify(data).replace(/\\\\,/g, '\\,')
    // console.log('PARAMS:', params)
    if (method === 'get') {
        return axios({
            method,
            params,
            url: fullUrlFrom(endpoint),
            headers: { ...options.headers || {} },
        });
    }

    return axios({
        method,
        data: params,
        url: fullUrlFrom(endpoint),
        headers: { ...options.headers || {} }
    });
}


const api = {
    get(endpoint, params) {
        return fetchUrl('get', endpoint, params);
    },
    post(endpoint, params, options) {
        return fetchUrl('post', endpoint, params, options);
    },
    put(endpoint, params, options) {
        return fetchUrl('put', endpoint, params, options);
    }
}

export default api;