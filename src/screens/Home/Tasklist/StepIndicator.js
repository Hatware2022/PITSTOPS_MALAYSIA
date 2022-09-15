import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import { Text } from 'components/Text'
import { Styles, Colors } from 'themes'
import Spacer from 'components/Spacer'
import * as Helpers from 'utils/Helpers'
import CheckIcon from 'assets/icons/check.svg'
import CheckGreyIcon from 'assets/icons/check-grey.svg'
import SyncIcon from 'assets/icons/sync.svg'

export default function body({ items, handleIndicatorTapped, page }) {
    let indicatorWidth = Helpers.ScreenWidth * 0.85

    // const [page, setPage] = useState(0)

    const renderIndicator = (item, idx) => {
        const { status } = item
        let color = { backgroundColor: Colors.white }

        if (status === 'pending') {
            color = { backgroundColor: Colors.yellowDark }
        } else if (status === 'completed') {
            color = { backgroundColor: Colors.primary }
        }
        // console.log("pAGE:", page)

        if (page == idx) {
            return <TouchableOpacity
                style={[styles.wrapperIndicator, Styles.itemCenter]}
                onPress={() => handleIndicatorTapped(item, idx)}
                delayPressIn={0}>
                <View
                    style={[styles.indicator, Styles.itemCenter, { ...color }]}
                >
                    {status === 'pending' ? <SyncIcon /> : status === 'pending' ? <CheckIcon /> : <CheckGreyIcon />}
                </View>
            </TouchableOpacity>
        }
        return <TouchableOpacity
            style={[styles.shadowIndicator, Styles.itemCenter, { ...color }]}
            onPress={() => handleIndicatorTapped(item, idx)}
            delayPressIn={0}>
            {status === 'pending' ? <SyncIcon /> : status === 'pending' ? <CheckIcon /> : <CheckGreyIcon />}
        </TouchableOpacity>

    }

    return (
        <View style={Styles.itemCenter}>
            <View style={[Styles.justifyCenter, { width: indicatorWidth }]}>
                <View style={[styles.circleIndicator, Styles.row, Styles.spaceBetween]}>
                    {items.map((item, idx) => {
                        const { status, name } = item
                        return (
                            <View key={idx} style={[Styles.row, Styles.alignCenter]}>
                                <View style={Styles.col}>
                                    {renderIndicator(item, idx)}
                                </View>
                                {idx + 1 != items.length ?
                                    <View style={[styles.barIndicator, status == 'completed' ? { backgroundColor: Colors.primary } : {}]} /> :
                                    <View />}
                            </View>
                        )
                    })}
                </View>
            </View>
            <Spacer size="xxs" />
            <View style={[Styles.row, Styles.spaceBetween, { width: Helpers.ScreenWidth * 0.9 }]}>
                {items.map((item, idx) => {
                    return <Text key={idx} style={[idx == page ? Styles.textBold : {}, styles.stageTitle]}>{item.name}</Text>
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    barIndicator: {
        height: 8,
        backgroundColor: Colors.greyLight,
        width: scale(40),
        marginLeft: -3,
        marginRight: -3
    },
    circleIndicator: {
        alignItems: 'center',
    },
    progressIndicator: {
        backgroundColor: Colors.primary,
        height: 8
    },
    wrapperIndicator: {
        backgroundColor: Colors.white,
        borderRadius: 18.5,
        width: scale(37),
        height: scale(37),
        padding: 5,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 5,
    },
    indicator: {
        backgroundColor: Colors.white,
        borderWidth: 0.1,
        borderColor: Colors.grey,
        borderRadius: 25,
        height: scale(30),
        width: scale(30),
    },
    shadowIndicator: {
        backgroundColor: Colors.white,
        borderWidth: 0.1,
        borderColor: Colors.grey,
        borderRadius: 25,
        height: scale(30),
        width: scale(30),
        padding: 5,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 5,
    },
})