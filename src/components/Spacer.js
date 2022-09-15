import React from 'react'
import { View } from 'react-native'
import Styles from 'themes/styles'

export default function Spacer({ size }) {
    if (!size) return <View />

    const charToUpper = `${size.charAt(0).toUpperCase()}${size.substring(1)}`
    var paddingSize = charToUpper ? `padding${charToUpper}` : `paddingMd`

    return <View style={Styles[paddingSize]}></View>
}