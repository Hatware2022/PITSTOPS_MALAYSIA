import * as Actions from '../ActionTypes';
import { PAGE_SIZE } from 'utils/Helpers'

const initialState = {
    data: [],
    metadata: {},
    loading: false,
    isOnEndReached: false,
    error: null,
    worklist: {},
    phases: []
}

const WorkshopReducer = (state = initialState, action) => {
    console.log("WORKSHOP REDUCER --->" + action.type);
    switch (action.type) {
        case Actions.FETCH_WORKSHOP:
            return {
                ...state,
                loading: true
            }
        case Actions.FETCH_WORKSHOP_SUCCESS:
            let newData = []
            let endReached = false

            if (action.params && action.payload.items) {
                const pageIndex = action.params.pageIndex

                console.log("##METADATA:", pageIndex, action.payload, action.params, state.metadata)

                if (pageIndex !== 1) {
                    if (pageIndex != state.metadata.currentPage) {
                        endReached = false
                        newData = [...state.data, ...action.payload.items]
                    } else {
                        endReached = true
                        newData = state.data
                    }
                } else {
                    if (action.payload.items.length < PAGE_SIZE) {
                        endReached = true
                    } else {
                        endReached = false
                    }

                    newData = action.payload.items
                }

            } else {
                newData = state.data
            }
            // console.log('###NEWDATA: ', newData)
            return {
                ...state,
                data: newData,
                isOnEndReached: endReached,
                metadata: action.payload.metadata ? action.payload.metadata : state.metadata,
                loading: false
            }
        case Actions.FETCH_WORKSHOP_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }

        default:
            return state;
    }
}

export default WorkshopReducer;