import React, { useEffect, useState, useRef } from 'react'
import { Dimensions } from "react-native";

export const ScreenWidth = Dimensions.get('window').width
export const ScreenHeight = Dimensions.get('window').height
export const PAGE_SIZE = 10

export const useDidMount = () => {
    const mountRef = useRef(true);
    // console.log('mountRef: ', mountRef)
    useEffect(() => {
        mountRef.current = false;
    }, []);
    return mountRef.current;
}

export const changeIsoStringToDate = (strDate) => {
    if (!strDate) return

    const timezone = strDate.indexOf('T')
    let date
    let time

    if (timezone !== -1) {
        date = strDate.subString(9, timezone)
        time = strDate.subString(9, timezone)
    }
    return `${date} ${time}`
}

export const convertStatus = (status) => {
    const statuses = ['', 'Not Started', 'In Progress', 'Completed', 'Deleted', 'Delayed', 'Rework', 'Awaiting WCS Approval']
    // console.log('#STATUS: ', status)
    return statuses[status]
}

export const convertEnumStatus = (status) => {
    if (!status) return ''
    return status.replace(/_/g, ' ')
}