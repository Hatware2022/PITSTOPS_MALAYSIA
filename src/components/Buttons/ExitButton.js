import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Styles, Colors } from 'themes'
import ExitIcon from 'assets/icons/exit.svg'

export default function body({ navigation = null, handleBackPressed = null }) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            if (handleBackPressed) {
                handleBackPressed()
            } else {
                if (navigation && navigation.canGoBack()) {
                    navigation.goBack()
                }
            }
        }}>
            <ExitIcon />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
    }
})