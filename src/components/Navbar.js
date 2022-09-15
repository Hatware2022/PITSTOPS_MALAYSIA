import React from 'react'
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from 'components/Text'
import { Styles, Colors } from 'themes'
import Spacer from 'components/Spacer'
import ChevronLeftIcon from 'assets/icons/chevron-left.svg'

export default function (props) {
    const { children, handleGoBack, containerStyles = null, titleComponent, title = '', titleStyle = {}, navigation, leftComponent, rightComponent } = props

    const defaultNavbar = () => {
        return (
            <View style={[Styles.row, Styles.spaceBetween, containerStyles ? { ...containerStyles } : Styles.navbarContainer]}>
                {leftComponent ? leftComponent :
                    <View style={[Styles.row, Styles.alignCenter]}>
                        <TouchableOpacity
                            style={[Styles.justifyCenter, Styles.paddingSm]}
                            onPress={() => {
                                if (handleGoBack) {
                                    handleGoBack()
                                } else {
                                    if (navigation.canGoBack()) {
                                        navigation.goBack()
                                    } else {
                                        console.log('Previous screen does not exist')
                                    }
                                }
                            }}>
                            <ChevronLeftIcon fill={Colors.secondary} />
                        </TouchableOpacity>
                        <Spacer size="xs" />
                        {titleComponent ? titleComponent : <Text style={[Styles.textBold, Styles.textXl, Styles.textTitle, { ...titleStyle }]}>{title}</Text>}
                    </View>}
                {rightComponent ? rightComponent :
                    <View />}
            </View>
        )
    }

    return (
        <View
            style={styles.container}>
            {children ? children : defaultNavbar()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})