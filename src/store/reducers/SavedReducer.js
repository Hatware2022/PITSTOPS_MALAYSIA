import * as Actions from '../ActionTypes';
import { useDidMount, PAGE_SIZE } from 'utils/Helpers'

const initialState = {
    data: [
        {

            "id": "f237d114-7be7-4601-96b3-052b23078357",

            "equipmentNo": "E-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 10.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "8d30f36b-5019-44b9-bcc9-060875d47686",

            "equipmentNo": "E-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 20.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "a37f9390-79e2-47bb-913a-14c01f9b56a8",

            "equipmentNo": "E-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 60.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "db923754-3b42-434e-b2c1-1e14f06f456f",

            "equipmentNo": "W-345",

            "workCategory": "Combine",

            "equipmentType": "Weight",

            "description": "This is machine",

            "note": "Note5 for weight machine",

            "percentageUpdate": 25.00,

            "status": "Deleted",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "8d3a1c75-8cba-4da5-94bf-1ef54cac2872",

            "equipmentNo": "E-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 60.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "a1120877-391e-47fa-90b1-1fbe00f03796",

            "equipmentNo": "W-345",

            "workCategory": "Combine",

            "equipmentType": "Weight",

            "description": "This is machine",

            "note": "Note5 for weight machine",

            "percentageUpdate": 60.00,

            "status": "Deleted",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "f91b0e96-fcf9-486c-bcd6-36d079668a67",

            "equipmentNo": "E-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 30.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "0c5dd1fd-5711-4d2c-bb8d-52d6d1f90259",

            "equipmentNo": "W-345",

            "workCategory": "Combine",

            "equipmentType": "Weight",

            "description": "This is machine",

            "note": "Note5 for weight machine",

            "percentageUpdate": 60.00,

            "status": "Deleted",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "3c33c3bf-894f-4c02-bbf3-5ec895e92486",

            "equipmentNo": "D-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 50.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "30da197c-0dc2-4dbb-b432-5effb4763f9a",

            "equipmentNo": "B-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 60.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        }

    ],
    metadata: {},
    loading: false,
    isOnEndReached: false,
    error: null,
    worklist: [
        {

            "id": "f237d114-7be7-4601-96b3-052b23078357",

            "equipmentNo": "E-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 10.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "8d30f36b-5019-44b9-bcc9-060875d47686",

            "equipmentNo": "E-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 20.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "a37f9390-79e2-47bb-913a-14c01f9b56a8",

            "equipmentNo": "E-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 60.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "db923754-3b42-434e-b2c1-1e14f06f456f",

            "equipmentNo": "W-345",

            "workCategory": "Combine",

            "equipmentType": "Weight",

            "description": "This is machine",

            "note": "Note5 for weight machine",

            "percentageUpdate": 25.00,

            "status": "Deleted",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "8d3a1c75-8cba-4da5-94bf-1ef54cac2872",

            "equipmentNo": "E-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 60.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "a1120877-391e-47fa-90b1-1fbe00f03796",

            "equipmentNo": "W-345",

            "workCategory": "Combine",

            "equipmentType": "Weight",

            "description": "This is machine",

            "note": "Note5 for weight machine",

            "percentageUpdate": 60.00,

            "status": "Deleted",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "f91b0e96-fcf9-486c-bcd6-36d079668a67",

            "equipmentNo": "E-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 30.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "0c5dd1fd-5711-4d2c-bb8d-52d6d1f90259",

            "equipmentNo": "W-345",

            "workCategory": "Combine",

            "equipmentType": "Weight",

            "description": "This is machine",

            "note": "Note5 for weight machine",

            "percentageUpdate": 60.00,

            "status": "Deleted",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "3c33c3bf-894f-4c02-bbf3-5ec895e92486",

            "equipmentNo": "D-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 50.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        },

        {

            "id": "30da197c-0dc2-4dbb-b432-5effb4763f9a",

            "equipmentNo": "B-321",

            "workCategory": "Assembly",

            "equipmentType": "Service",

            "description": "Another Assembly Machine",

            "note": "Note3 for machine",

            "percentageUpdate": 60.00,

            "status": "Completed",

            "opuName": "PPTSB",

            "locationName": "Location 1",

            "subLocation1Name": "Sub1-1",

            "subLocation2Name": "Sub2-1",

            "disciplineName": "Discipline 1",

            "bookmark": true

        }

    ],
    phases: []
}

const SavedReducer = (state = initialState, action) => {
    console.log("SAVED WORKLIST REDUCER --->" + action.type);
    switch (action.type) {
        case Actions.FETCH_SAVED_WORKLIST:
            return {
                ...state,
                loading: true
            }
        case Actions.FETCH_SAVED_WORKLIST_SUCCESS:
            let newData = []
            let endReached = false

            if (action.params && action.payload.items) {
                const pageIndex = action.params.pageIndex

                // console.log("##METADATA:", pageIndex, action.params, state.metadata)

                if (pageIndex !== 1) {
                    if (pageIndex != state.metadata.currentPage) {
                        endReached = false
                    } else {
                        endReached = true
                    }
                    newData = [...state.data, ...action.payload.items]
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
        case Actions.FETCH_SAVED_WORKLIST_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state;
    }
}

export default SavedReducer;