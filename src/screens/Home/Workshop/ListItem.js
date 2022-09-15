import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Touchable } from 'react-native'
import { useDispatch } from 'react-redux'
import { scale } from 'react-native-size-matters'
import { Text } from 'components/Text'
import { Styles, Colors } from 'themes'
import Actions from 'actions'
import Spacer from 'components/Spacer'
import * as Helpers from 'utils/Helpers'
import Card from 'components/Card'
import ChevronRightIcon from 'assets/icons/chevron-right.svg'

export default function body({ item, navigation }) {

    const { id, userId, title, body } = item
    const didMount = Helpers.useDidMount()
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log("ITEM:", item)
        // if (didMount) {
        //     if (planStart) {
        //         setStartDate(format(parseISO(planStart), 'dd-MMM-yyyy hh:mm'))
        //     }

        //     if (planFinish) {
        //         setEndDate(format(parseISO(planFinish), 'dd-MMM-yyyy hh:mm'))
        //     }

        // }
    }, [item])

    return (
        <Card
            containerStyle={styles.cardContainer}
            touchable={true}
            onPress={() => {
                // dispatch(Actions.storeTask(item))
                navigation.navigate('Worklist', { category: title })
            }}>
            <View style={[Styles.row, Styles.spaceBetween, Styles.alignCenter]}>
                <Text style={styles.name}>{title}</Text>
                <Spacer size="sm" />
                <ChevronRightIcon width={15} height={15} fill={Colors.greyLighter} />
            </View>
        </Card >
    )
}

const styles = StyleSheet.create({
    name: {
        color: '#625E70',
        fontWeight: '600',
        fontSize: 16
    },
    cardContainer: {
        marginVertical: 3,
        alignSelf: 'center',
        width: Helpers.ScreenWidth - scale(20),
        paddingVertical: 15,
        paddingHorizontal: 10
    },
})