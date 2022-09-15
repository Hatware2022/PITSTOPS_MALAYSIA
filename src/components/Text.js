import React from 'react'
import ReactNative, { StyleSheet } from 'react-native'

const styles = {
    default: {
        fontFamily: 'Inter',
        color: 'black',
        fontSize: 14,
        flexShrink: 1
    }
}

function Text({ style, ...props }) {
    let flatStyle = StyleSheet.flatten(style)
    flatStyle = { ...styles.default, ...flatStyle }

    return (
        <ReactNative.Text
            style={flatStyle}
            {...props}
        />
    )
}

export { Text }