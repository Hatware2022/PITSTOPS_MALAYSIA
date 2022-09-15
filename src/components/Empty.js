import React from 'react'
import { Platform, Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SubmitButton from 'components/Forms/SubmitButton'
import { Colors, Styles } from 'themes'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import * as Helpers from 'utils/Helpers'

export default function NetworkError(props) {
    const { style = {}, msg } = props

    return (
        <View
            style={[styles.container, Styles.itemCenter, style]}>
            <View style={[styles.content, Styles.alignCenter]}>
                <View style={Styles.alignCenter}>
                    <Image source={require('assets/images/common/empty.jpg')} style={styles.image} />
                </View>
                <Spacer size="sm" />
                {msg ? <Text style={[Styles.textSecondary, Styles.textCenter, Styles.textLg]}>{msg}</Text> : <View />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    content: {
        height: scale(300)
    },
    image: {
        resizeMode: 'contain',
        height: scale(Helpers.ScreenWidth * 0.4)
    }
})