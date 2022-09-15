import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Touchable } from 'react-native'
import { useDispatch } from 'react-redux'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import LinearGradient from 'react-native-linear-gradient'
import ProgressBar from 'components/ProgressBar'
import { parseISO, format } from 'date-fns'
import { Text } from 'components/Text'
import { Styles, Colors } from 'themes'
import Actions from 'actions'
import Spacer from 'components/Spacer'
import * as Helpers from 'utils/Helpers'
import Card from 'components/Card'
import UpdateIcon from 'assets/icons/update.svg'
import ChevronRightIcon from 'assets/icons/chevron-right.svg'
import CheckIcon from 'assets/icons/check-primary.svg'
import HourglassIcon from 'assets/icons/hourglass.svg'
import ReworkIcon from 'assets/icons/rework.svg'

export default function body({ item, navigation }) {
    // console.log("ITEM:", item)
    const { activityName, taskNo, planStart, planFinish, actualStart, actualFinish, wcsIndicator, note,
        pendingStatus, remarks, progressPercent, weightage, group, equipmentNo } = item
    const didMount = Helpers.useDidMount()
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()


    useEffect(() => {
        if (didMount) {
            if (planStart) {
                setStartDate(format(parseISO(planStart), 'dd-MMM-yyyy hh:mm'))
            }

            if (planFinish) {
                setEndDate(format(parseISO(planFinish), 'dd-MMM-yyyy hh:mm'))
            }



        }
    }, [item])

    const getStatus = () => {
        let statusStr = pendingStatus

        if (pendingStatus === 'Rework') {
            statusStr = 'In Progress'
        } else if (pendingStatus === 'Wcs Approval') {
            statusStr = 'Awaiting WCS Approval'
        }
        return statusStr
    }


    const getStatusIcon = () => {
        let containerStyles = pendingStatus === 'Completed' ? styles.bgCardCompleted : styles.bgCardInProgress
        if (!pendingStatus) return <View />

        let Icon

        if (pendingStatus === 'Completed') {
            Icon = CheckIcon
        } else if (pendingStatus === 'In Progress') {
            Icon = UpdateIcon
        } else if (pendingStatus === 'Rework') {
            Icon = ReworkIcon
        } else if (pendingStatus === 'Wcs Approval') {
            Icon = HourglassIcon
        } else {
            return <View />
        }

        return <View style={containerStyles}>
            <Icon width={15} height={15} />
        </View>
    }

    return (
        <Card
            containerStyle={styles.cardContainer}
            touchable={true}
            onPress={() => {
                dispatch(Actions.storeTask(item))
                navigation.navigate('TasklistDetail', { update: true })
            }}>
            <View style={Styles.col}>
                <View style={[Styles.row, Styles.spaceBetween]}>
                    <View style={Styles.col}>
                        <Text>Task {taskNo}</Text>
                        <Spacer size="xxs" />
                        {group ? <Text style={[Styles.roundedBoxPurple, Styles.textCenter, Styles.textBold, Styles.textSm, Styles.textWhite, { width: scale(30) }]}>{group}</Text> : <View />}
                    </View>
                    <View style={[Styles.col]}>
                        <Text style={[Styles.textBold, Styles.textSecondary]}>{activityName}</Text>
                        <Spacer size="xxs" />
                        <View style={[Styles.row]}>
                            <Text style={[Styles.textSecondary, Styles.textBold, Styles.textMd]}>Plan Start   : </Text>
                            {startDate ? <Text style={[Styles.textSecondary, Styles.roundedBoxLight, Styles.textMd]}>{startDate}</Text> : <View />}
                        </View>
                        <Spacer size="xxxs" />
                        <View style={[Styles.row]}>
                            <Text style={[Styles.textSecondary, Styles.textBold, Styles.textMd]}>Plan Finish : </Text>
                            {endDate ? <Text style={[Styles.textSecondary, Styles.roundedBoxLight, Styles.textMd]}>{endDate}</Text> : <View />}
                        </View>
                    </View>
                    <View style={Styles.paddingXs}>
                        <ChevronRightIcon fill={Colors.greyLighter} />
                    </View>
                </View>
                <Spacer size="xs" />
                <View style={[Styles.row, Styles.alignEnd, Styles.spaceBetween]}>
                    <View style={[Styles.col, Styles.flex]}>
                        <View style={[Styles.row, Styles.alignCenter]}>
                            <Spacer size="xxs" />
                            <Text style={[Styles.textBold, Styles.textXl]}>{`${progressPercent}% `}</Text>
                            <Text style={Styles.textMd}>{getStatus()}</Text>
                        </View>
                        {progressPercent ?
                            <View style={[Styles.row, Styles.alignCenter]}>
                                <ProgressBar progress={progressPercent / 100} height={8} width={Helpers.ScreenWidth * 0.7} unfilledColor={'#E7E7F0'} borderColor={'#E7E7F0'}>
                                    {progressPercent > 0 && progressPercent <= 50 ?
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A81616', '#EB5757']}>
                                            <Spacer size="xs" />
                                        </LinearGradient> : <View />}
                                    {progressPercent > 50 && progressPercent <= 70 ?
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FDE724', '#FFB535']}>
                                            <Spacer size="xs" />
                                        </LinearGradient> : <View />}
                                    {progressPercent > 71 && progressPercent <= 100 ?
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#00A19C', '#72CB96']}>
                                            <Spacer size="xs" />
                                        </LinearGradient> : <View />}
                                </ProgressBar>
                            </View> : <View />}
                    </View>
                    <Spacer size="xs" />
                    {getStatusIcon()}
                </View>
            </View>
        </Card >
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: 5,
        alignSelf: 'center',
        width: Helpers.ScreenWidth - scale(20),
        padding: 10
    },
    locationText: {
        paddingHorizontal: 5
    },
    bgCardCompleted: {
        borderRadius: 5,
        backgroundColor: 'rgba(38, 175, 171, 0.3)',
        padding: 10
    },
    bgCardInProgress: {
        borderRadius: 5,
        backgroundColor: '#FFF7E5',
        padding: 10
    },
    progressBar: {
        height: 10,
        borderRadius: 20,
        backgroundColor: Colors.green,
        flex: 1
    }
})