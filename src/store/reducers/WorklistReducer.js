import * as Actions from '../ActionTypes';
import { useDidMount, PAGE_SIZE } from 'utils/Helpers'

const initialState = {
    data: [],
    metadata: {},
    loading: false,
    isOnEndReached: false,
    error: null,
    worklist: {},
    phases: []
}

const WorklistReducer = (state = initialState, action) => {
    console.log("WORKLIST REDUCER --->" + action.type);
    switch (action.type) {
        case Actions.FETCH_WORKLIST:
            return {
                ...state,
                loading: true
            }
        case Actions.FETCH_WORKLIST_SUCCESS:
            let newData = []
            let endReached = false

            if (action.params && action.payload.items) {
                const pageIndex = action.params.pageIndex

                // console.log("##METADATA:", pageIndex, action.payload, action.params, state.metadata)

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
        case Actions.FETCH_WORKLIST_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case Actions.SAVE_BOOKMARK:
            return {
                ...state,
                loading: true
            }
        case Actions.SAVE_BOOKMARK_SUCCESS: {

            let newData = []
            const worklist = action.params

            if (state.data && state.data.length > 0) {
                newData = state.data.map(item => {
                    if (item.id === worklist.id) {
                        return { ...item, bookmark: item.bookmark ? false : true }
                    }
                    return item
                })
            }

            return {
                ...state,
                data: newData,
                loading: false
            }
        }
        case Actions.SAVE_BOOKMARK_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case Actions.STORE_WORKLIST:
            return {
                ...state,
                worklist: action.data
            }
        case Actions.GET_WORKLIST:
            return {
                worklist: state.worklist,
            }
        case Actions.FETCH_WORKLIST_PHASES:
            return {
                ...state,
                loading: true
            }
        case Actions.FETCH_WORKLIST_PHASES_SUCCESS:
            return {
                ...state,
                phases: action.payload,
                loading: false
            }
        case Actions.FETCH_WORKLIST_PHASES_FAILURE:
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