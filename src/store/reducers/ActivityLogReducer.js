import * as Actions from '../ActionTypes';
import { parseISO, format } from 'date-fns'
import { PAGE_SIZE } from 'utils/Helpers'

const initialState = {
    data: [],
    list: [],
    metadata: {},
    loading: false,
    isOnEndReached: false,
    error: null
}

const ActivityLogReducer = (state = initialState, action) => {
    console.log("ACTIVITYLOG REDUCER --->" + action.type);
    switch (action.type) {
        case Actions.FETCH_ACTIVITY_LOGS:
            return {
                ...state,
                loading: true
            }
        case Actions.FETCH_ACTIVITY_LOGS_SUCCESS: {
            let newData = []
            let endReached = false
            let newLogs = []

            if (action.params && action.payload) {
                const pageIndex = action.params.pageIndex

                if (pageIndex != 1) {
                    if (pageIndex != state.metadata.currentPage) {
                        endReached = false
                    } else {
                        endReached = true
                    }
                    newLogs = action.payload.items ? [...state.list, ...action.payload.items] : state.list
                } else {
                    if (action.payload.items.length < PAGE_SIZE) {
                        endReached = true
                    }
                    newLogs = [...action.payload.items]
                }

                const logGroups = newLogs.reduce((logGroups, item) => {
                    const dateTime = format(parseISO(item.modifiedDate), 'dd-MMM-yyyy hh:mm')
                    const date = dateTime.split(" ")[0]
                    const time = dateTime.split(" ")[1]

                    if (!logGroups[date]) {
                        logGroups[date] = [];
                    }
                    logGroups[date].push({ ...item, time });
                    return logGroups;
                }, {});

                newData = Object.keys(logGroups).map((key) => {
                    return {
                        date: key,
                        items: logGroups[key]
                    };
                });
            } else {
                newData = state.data
            }

            return {
                ...state,
                data: newData,
                list: newLogs,
                isOnEndReached: endReached,
                metadata: action.payload.metadata ? action.payload.metadata : state.metadata,
                loading: false
            }
        }
        case Actions.FETCH_ACTIVITY_LOGS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case Actions.UPDATE_ACTIVITY_LOGS: {
            const data = action.payload
            let modifiedDate = null
            let date = null
            let time = null
            let newItem = {}
            let newData = []

            if (data && data.modifiedDate) {
                modifiedDate = format(parseISO(data.modifiedDate), 'dd-MMM-yyyy hh:mm')

                if (modifiedDate) {
                    date = modifiedDate.split(" ")[0]
                    time = modifiedDate.split(" ")[1]
                }

                newItem = {
                    id: data.id, time: time,
                    remarks: action.params.remarks,
                    progressPercent: action.params.progressPercent,
                    modifiedDate: data.modifiedDate,
                    animate: true
                }

                if (state.data.length > 0) {
                    const isExist = state.data.find(item => item.date === date)

                    if (isExist) {
                        newData = state.data.map((item) => {
                            if (item.date === date) {
                                return { date: item.date, items: [newItem, item.items] }
                            }
                            return { ...item }
                        })
                    } else {
                        newData = [{ date: date, items: [newItem] }, ...state.data]
                    }
                } else {
                    newData = [{ date: date, items: [newItem] }]
                }
            }

            return {
                ...state,
                data: newData,
                loading: false,
            }
        }

        default:
            return state;
    }
}

export default ActivityLogReducer;