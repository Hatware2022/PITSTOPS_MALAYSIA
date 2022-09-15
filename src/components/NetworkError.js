import React from 'react'
import { Platform, Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SubmitButton from 'components/Forms/SubmitButton'
import { Colors, Styles } from 'themes'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import * as Helpers from 'utils/Helpers'

export default function NetworkError(props) {
    const { style = {}, handleReload } = props

    return (
        <View
            style={[styles.container, Styles.itemCenter, style]}>
            <View style={[styles.content, Styles.alignCenter]}>
                <View style={Styles.alignCenter}>
                    <Image source={require('assets/images/common/offline.png')} style={styles.image} />
                </View>
                <Spacer size="sm" />
                <Text style={[Styles.textSecondary, Styles.textCenter, Styles.textLg]}>There's no network. Please check your data connection and retry again</Text>
                <Spacer size="sm" />
                <SubmitButton title="Retry" hasOpacity={true} containerStyles={{ width: Helpers.ScreenWidth - 40 }} onPress={() => {
                    if (handleReload) {
                        handleReload()
                    }
                }} />
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