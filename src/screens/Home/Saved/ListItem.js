import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Touchable } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import LinearGradient from 'react-native-linear-gradient';
import ProgressBar from 'components/ProgressBar'
import { useDispatch } from 'react-redux';
import { Text } from 'components/Text'
import { Styles, Colors } from 'themes'
import Spacer from 'components/Spacer'
import * as Helpers from 'utils/Helpers'
import Api from 'api'
import Card from 'components/Card'
import Actions from 'actions'
import ChevronRightIcon from 'assets/icons/chevron-right.svg'
import MarkerDarkIcon from 'assets/icons/marker-dark.svg'
import StarIcon from 'assets/icons/star.svg'
import StarWhiteIcon from 'assets/icons/star-white.svg'
import TagIcon from 'assets/icons/tag.svg'
import BriefcaseIcon from 'assets/icons/briefcase.svg'
import ArchiveIcon from 'assets/icons/archive.svg'
import ChevronRightPrimaryIcon from 'assets/icons/chevron-right-primary.svg'

export default function body({ navigation, item, index }) {
    const dispatch = useDispatch()
    const { id, equipmentNo = '', disciplineName = '',
        locationName = '', subLocation1Name = '',
        subLocation2Name = '', note = '',
        workCategory = '', equipmentType = '', description = '',
        percentageUpdate, bookmark = false
    } = item
    const [isBookmark, setIsBookmark] = useState(true)

    // console.log('ISBOOKMARK', isBookmark)
    return (
        <Card containerStyle={styles.cardContainer}>
            <View style={Styles.col}>
                <View style={[Styles.row, Styles.spaceBetween, Styles.alignCenter]}>
                    <Text style={[Styles.textTertiery, Styles.textMd]}>{disciplineName}</Text>
                    {/* <Spacer size="xxxs" /> */}
                    <View style={[Styles.row, Styles.alignCenter]}>
                        <MarkerDarkIcon />
                        <Spacer size="xxs" />
                        <View style={Styles.roundedBox}>
                            <Text style={[Styles.textSecondary, Styles.textMd, Styles.textWeight500]}>{locationName}</Text>
                        </View>
                        <ChevronRightIcon fill={Colors.secondary} width={5} height={5} />
                        <View style={Styles.roundedBox}>
                            <Text style={[Styles.textSecondary, Styles.textMd, Styles.textWeight500]}>{subLocation1Name}</Text>
                        </View>
                        <ChevronRightIcon width={5} height={5} />
                        <View style={Styles.roundedBox}>
                            <Text style={[Styles.textSecondary, Styles.textMd, Styles.textWeight500]}>{subLocation2Name}</Text>
                        </View>
                        <Spacer size="xxs" />
                        <TouchableOpacity style={Styles.paddingSm} onPress={() => {
                            dispatch(Api.saveBookmarkEvent(item))
                            // setIsBookmark(!isBookmark)
                        }}>
                            {/* {bookmark ? <StarIcon /> : <StarWhiteIcon />} */}
                            {true ? <StarIcon /> : <StarWhiteIcon />}
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <Spacer size="xxxs" /> */}
                <View style={[Styles.row, Styles.alignCenter]}>
                    <Text style={[Styles.textBold, Styles.textXl]}>{equipmentNo}</Text>
                    <Spacer size="sm" />
                    <View style={[Styles.row, Styles.alignCenter]}>
                        <TagIcon />
                        <Spacer size="xxs" />
                        <Text style={Styles.textMd}>{note}</Text>
                    </View>
                </View>
                <Spacer size="xxs" />
                <View style={[Styles.row, Styles.alignCenter]}>
                    <View style={[Styles.row, Styles.alignCenter, Styles.roundedBox]}>
                        <BriefcaseIcon />
                        <Spacer size="xxs" />
                        <Text style={Styles.textMd}>{workCategory}</Text>
                    </View>
                    <Spacer size="sm" />
                    <View style={[Styles.row, Styles.alignCenter, Styles.roundedBox]}>
                        <ArchiveIcon />
                        <Spacer size="xxs" />
                        <Text style={Styles.textMd}>{equipmentType}</Text>
                    </View>
                </View>
                <View>
                    <Text style={Styles.textSm}>{description}</Text>
                </View>
                <Spacer size="xs" />
                <View style={[Styles.row, Styles.alignCenter, Styles.spaceBetween]}>
                    <View style={[Styles.col, Styles.flex]}>
                        <View style={[Styles.row, Styles.alignCenter]}>
                            <Spacer size="xxs" />
                            <Text style={[Styles.textBold, Styles.textXl]}>{`${percentageUpdate}% `}</Text>
                            <Text style={Styles.textMd}>Completed</Text>
                        </View>
                        {percentageUpdate ?
                            <View style={[Styles.row, Styles.alignCenter]}>
                                <ProgressBar progress={percentageUpdate / 100} height={8} width={Helpers.ScreenWidth * 0.4} unfilledColor={'#E7E7F0'} borderColor={'#E7E7F0'}>
                                    {percentageUpdate > 0 && percentageUpdate <= 50 ?
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A81616', '#EB5757']}>
                                            <Spacer size="xs" />
                                        </LinearGradient> : <View />}
                                    {percentageUpdate > 50 && percentageUpdate <= 70 ?
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FDE724', '#FFB535']}>
                                            <Spacer size="xs" />
                                        </LinearGradient> : <View />}
                                    {percentageUpdate > 71 && percentageUpdate <= 100 ?
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#00A19C', '#72CB96']}>
                                            <Spacer size="xs" />
                                        </LinearGradient> : <View />}
                                </ProgressBar>
                                <Spacer size="xxs" />
                                <Text style={[Styles.textSm, Styles.textSecondary]}>{`${percentageUpdate}/100`}</Text>
                            </View> : <View />}
                    </View>
                    <Spacer size="xs" />
                    <View>
                        <TouchableOpacity
                            style={[Styles.row, Styles.alignCenter, styles.showBtn]}
                            onPress={() => {
                                // console.log('ITEM:', item)
                                navigation.navigate('Tasklist')
                                // Tmmp id
                                // dispatch(Api.getTasklistFilterEvent('0bd17f43-cf81-42af-9dd8-647506f7f688'))
                                dispatch(Actions.storeWorklist(item))
                                dispatch(Api.getTasklistFilterEvent(item.id))
                            }}
                        >
                            <Text style={[Styles.textPrimary, Styles.textBold]}>Show Tasklist</Text>
                            <Spacer size="xxs" />
                            <ChevronRightPrimaryIcon width={10} height={10} fill={Colors.primary} />
                        </TouchableOpacity>
                    </View>
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
    showBtn: {
        borderRadius: 15,
        // backgroundColor: Colors.primary,
        backgroundColor: 'rgba(38, 175, 171, 0.3)',
        paddingVertical: 5,
        paddingHorizontal: 8
    },
    progressBar: {
        height: 10,
        // width:
        borderRadius: 20,
        backgroundColor: Colors.green,
        flex: 1
    }
})