import React from 'react'
import { View, StyleSheet, Animated, Image } from 'react-native'
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux'
import { Text } from 'components/Text'
import { Styles, Colors } from 'themes'
import Spacer from 'components/Spacer'
import * as Helpers from 'utils/Helpers'
import SubTask from './SubTask';

export default function body({ item, fadeAnim }) {
    const { items = [], date } = item
    const userStore = useSelector(state => state.root.user)
    const { user_id } = userStore

    return (
        <View style={[Styles.flex, Styles.paddingSm]}>
            <Text style={[Styles.textBold, Styles.textSecondary]}>{date}</Text>
            {items ? <Spacer size="sm" /> : <View />}
            {items && items.map((item, index) => {
                const { time, progressPercent, remarks, animate = false } = item

                const Container = animate ? Animated.View : View
                const ContainerStyle = animate ? [styles.fadingContainer, { opacity: fadeAnim }] : Styles.col

                return (
                    <Container style={ContainerStyle} key={`activity-${index}`}>
                        <View style={Styles.row}>
                            <Spacer size="sm" />
                            <View style={[Styles.col, Styles.alignEnd]}>
                                {time ? <Text>{time}</Text> : <Text>19:20</Text>}
                                <Spacer size="xs" />
                                <View style={[styles.verticalLine, Styles.marginRightXs]} />
                            </View>
                            <Spacer size="sm" />
                            <View style={[Styles.row, Styles.textWrap]}>
                                <Image source={require('assets/icons/avatar.png')} style={styles.avatar} />
                                <Spacer size="xs" />
                                <View style={[Styles.col, { width: Helpers.ScreenWidth * 0.5 }]}>
                                    <View>
                                        {user_id ?
                                            <Text style={[Styles.textSecondary]}>
                                                <Text style={[Styles.textSecondary, Styles.textBold]}>{user_id}</Text> updated progress {progressPercent ? <Text style={[Styles.textSecondary, Styles.textBold]}>{progressPercent} %</Text> : <Text style={[Styles.textSecondary, Styles.textBold]}>50 %</Text>}
                                            </Text> : <View />}
                                    </View>
                                    <Spacer size="xxs" />
                                    <Text style={[Styles.textGreyLighter, Styles.textBold, Styles.textItalic]}>Remarks</Text>
                                    {remarks ? <Text style={Styles.textGreyLighter}>{remarks}</Text> : <Text style={Styles.textGreyLighter}>test</Text>}
                                </View>
                            </View>
                        </View>
                        {(items.length - 1) !== index ? <Spacer size="sm" /> : <View />}
                    </Container>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: scale(20),
        height: scale(20),
    },
    verticalLine: {
        width: 1,
        backgroundColor: Colors.border,
        height: scale(40)
    },
    fadingContainer: {
        backgroundColor: '#D9F2F7',
        padding: 5,
        marginBottom: 10,
        borderRadius: 10
    },
})