import React from 'react'
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Colors } from 'themes'


export default function Card(props) {
    const { children, touchable, onPress, containerStyle = {}, style = {} } = props

    const renderChildren = () => {
        return (
            <View style={[styles.content, style]}>
                {children}
            </View>
        )
    }

    const Container = touchable ? TouchableOpacity : View

    return (
        <Container
            style={[styles.container, containerStyle]}
            onPress={onPress}
            activeOpacity={0.8}>
            {renderChildren()}
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                shadowColor: Colors.black,
                shadowOffset: {
                    backgroundColor: Colors.white,
                    height: 3,
                    width: 3,
                    shadowOpacity: 0.4,
                    shadowRadius: 4
                }
            },
            android: {
                elevation: 10,
                backgroundColor: Colors.white,
                borderRadius: 5,
                // borderWidth: 0.5,
                borderColor: Colors.greyLight
            }
        })
    }
})