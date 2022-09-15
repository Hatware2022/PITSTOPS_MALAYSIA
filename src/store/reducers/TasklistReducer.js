import * as Actions from '../ActionTypes';
import { PAGE_SIZE, convertStatus } from 'utils/Helpers'

const initialState = {
    subTask: [
        { "id": 0, "name": "SubTask 1", "status": true, "submitted": false, "rework": false, "verified": false },
        { "id": 1, "name": "SubTask 2", "status": false, "submitted": false, "rework": false, "verified": false },
        { "id": 2, "name": "SubTask 3", "status": true, "submitted": true, "rework": false, "verified": false },
        { "id": 3, "name": "SubTask 4", "status": false, "submitted": false, "rework": false, "verified": false },
        { "id": 4, "name": "SubTask 5", "status": true, "submitted": true, "rework": true, "verified": false },
        { "id": 5, "name": "SubTask 6", "status": true, "submitted": true, "rework": false, "verified": true },
    ],
    task: {},
    tempTask: {
        // id: '72c62b18-62d3-472c-a34a-3a6d1f6988dc'
    },
    data: [],
    metadata: {},
    loading: false,
    isOnEndReached: false,
    error: null,
    selectAllStatus: true

}

const TasklistReducer = (state = initialState, action) => {
    console.log("TASKLIST REDUCER --->" + action.type);
    switch (action.type) {
        case Actions.FETCH_TASKLIST:
            return {
                ...state,
                loading: true
            }
        case Actions.FETCH_TASKLIST_SUCCESS:
            let newData = []
            let endReached = false

            if (action.params && action.payload.items) {
                const pageIndex = action.params.pageIndex

                // console.log("##METADATA11:", pageIndex, action.params, state.metadata)

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

            return {
                ...state,
                data: newData,
                isOnEndReached: endReached,
                metadata: action.payload.metadata ? action.payload.metadata : state.metadata,
                loading: false
            }
        case Actions.FETCH_TASKLIST_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case Actions.FETCH_TASK:
            return {
                ...state,
                loading: true
            }
        case Actions.FETCH_TASK_SUCCESS:
            return {
                ...state,
                task: action.payload,
                loading: false
            }
        case Actions.FETCH_TASK_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case Actions.UPDATE_TASK:
            return {
                ...state,
                loading: true
            }
        case Actions.UPDATE_TASK_SUCCESS: {
            let mergeData = { ...state.task, ...action.params }
            let newData = []

            if (state.data.length > 0 && action.params) {
                newData = state.data.map(item => {
                    if (item.id === action.params.tasklistID) {
                        return { ...item, progressPercent: action.params.progressPercent, pendingStatus: convertStatus(action.params.pendingStatus) }
                    }
                    return item
                })
            }
            // console.log('#MERGEDATA: ', mergeData, newData)

            return {
                ...state,
                task: mergeData,
                data: newData,
                loading: false
            }
        }
        case Actions.UPDATE_TASK_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case Actions.STORE_TASK:
            return {
                ...state,
                tempTask: action.data
            }
        case Actions.UPDATE_SUBTASK_STATUS:
            return {
                ...state,
                subTask: action.payload
            }
        case Actions.SELECT_ALL_STATUS_CHANGED:
            return {
                ...state,
                selectAllStatus: action.payload
            }
        case Actions.MUTATE_TASKLIST: {
            let newData = []

            if (state.data) {
                newData = state.data.map(item => {
                    if (item.id === action.params.id) {
                        return { ...item, progressPercentage: action.params.progressPercentage }
                    }
                    return item
                })
            }

            return {
                ...state,
                data: newData
            }
        }
        default:
            return state;
    }
}

export default TasklistReducer;