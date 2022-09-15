import React from 'react'
import { Platform, Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SubmitButton from 'components/Forms/SubmitButton'
import CancelButton from 'components/Forms/CancelButton'
import { Colors, Styles } from 'themes'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import * as Helpers from 'utils/Helpers'

export default function Loading(props) {
    const { style = {}, handleReload, navigation, hasBack = false } = props

    return (
        <View
            style={[styles.container, Styles.itemCenter, style]}>
            <View style={[styles.content, Styles.alignCenter]}>
                <View style={Styles.alignCenter}>
                    <Image source={require('assets/images/common/Hourglass.gif')} style={styles.image} />
                </View>
                <Spacer size="sm" />
                <Text style={[Styles.textSecondary, Styles.textCenter, Styles.textLg]}>Fetching the data. Please wait...</Text>
                <Spacer size="sm" />
                <SubmitButton title="Retry" hasOpacity={true} containerStyles={{ width: Helpers.ScreenWidth - 40 }} onPress={() => {
                    if (handleReload) {
                        handleReload()
                    }
                }} />
                {hasBack ?
                    <CancelButton title="Back" hasOpacity={true} containerStyles={{ width: Helpers.ScreenWidth - 40 }} onPress={() => {
                        if (navigation) {
                            if (navigation.canGoBack()) {
                                navigation.goBack()
                            }
                        }
                    }} /> : <View />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.white
    },
    content: {
        height: scale(300)
    },
    image: {
        resizeMode: 'contain',
        height: scale(Helpers.ScreenWidth * 0.3)
    }
})