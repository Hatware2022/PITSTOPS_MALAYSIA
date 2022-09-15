import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Modal from "react-native-modal"
import Spacer from 'components/Spacer'
import * as Images from 'utils/Images';
import SettingIcon from 'assets/icons/settings.svg'
import { Styles, Colors } from 'themes';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux'
import ProgressBar from 'components/ProgressBar'
import LinearGradient from 'react-native-linear-gradient'
import * as Helpers from 'utils/Helpers'
import CheckboxSelected from 'assets/icons/checkboxSelected.svg'
import CheckboxUnselected from 'assets/icons/checkboxUnselected.svg'
import { updateSubTaskStatus } from '../../../store/actions/TasklistAction';
import SubmitButton from '../../../components/Forms/SubmitButton';



function SubTask(props) {
    const state = useSelector(state => state);
    let progressPercent = 90;
    const dispatch = useDispatch();
    const subTaskData = useSelector(state => state.tasklist.subTask)
    const updatesubtaskstatus = data => dispatch(updateSubTaskStatus(data));


    useEffect(() => {

    }, [])

    const selectAllHandler = () => {
        let subT = subTaskData
        subT.map((value, index) => {
            if (value.status == false) {
                value.status = true
                updatesubtaskstatus(subT);
            }
        })
    }

    const subTaskRender = () => {
        console.log("SUB TASK DATA : " + JSON.stringify(subTaskData));
        return subTaskData.map((value, index) => {
            return (
                <View style={{ flex: 1, flexDirection: 'row', paddingTop: 15, paddingBottom: 15, borderTopWidth: index == 0 ? 1 : 0, borderColor: 'lightgray', borderBottomWidth: 1 }}>
                    <TouchableOpacity onPress={() => {
                        let cstatus = subTaskData[index].status
                        let subTData = subTaskData
                        subTData[index].status = !cstatus
                        updatesubtaskstatus(subTData);
                    }
                    }>
                        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                            {value.status == true ?
                                <CheckboxSelected fill={value.submitted == false ? "#26AFAB" : "gray"} />
                                :
                                <CheckboxUnselected fill="gray" />
                            }
                            <Text style={{ marginLeft: 15, color: '#787587', fontFamily: 'Inter-Medium', fontSize: moderateScale(14), width: "45%" }}>{value.name}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity>
                                <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-start' }}>
                                    <Text style={{ color: '#26AFAB', fontFamily: 'Inter-Bold', fontSize: moderateScale(14) }}>Rework</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', backgroundColor: '#00A19C', fontFamily: 'Inter-Medium', width: moderateScale(70), fontSize: moderateScale(14), color: 'white', borderRadius: 5, padding: 5, paddingLeft: 10, paddingRight: 10 }}>Verify</Text>
                            </View>
                        </View>

                    </View>
                </View >)

        })
    }

    return (

        <View style={styles.container} >
            <Text style={{ fontFamily: "Inter-Bold", fontSize: moderateScale(16), color: '#535D70' }}>Task Progress</Text>
            <View style={[Styles.row, Styles.alignEnd, Styles.spaceBetween]}>
                <View style={[Styles.col, Styles.flex]}>
                    <View style={[Styles.row, Styles.alignCenter, { marginTop: 15 }]}>
                        <Spacer size="xxs" />
                        <Text style={{ fontFamily: "Inter-Bold", fontSize: moderateScale(16), color: '#535D70' }}>{`${progressPercent}% `}</Text>
                        <Text style={Styles.textMd}>in Progress</Text>
                    </View>

                    <View style={{ flex: 1, alignSelf: 'center', marginTop: 5 }}>
                        <ProgressBar progress={progressPercent / 100} height={8} width={Helpers.ScreenWidth - 40} unfilledColor={'#E7E7F0'} borderColor={'#E7E7F0'}>
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
                    </View>
                </View>

            </View>
            <View style={{ flex: 1, marginTop: 10 }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity>
                        <View>
                            <Image source={Images.images.dropDownArrow} width={moderateScale(10)} height={moderateScale(10)} style={{ marginTop: 3 }} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: moderateScale(14), color: '#535D70' }}>Task A </Text>
                            <Text style={{ fontFamily: 'Inter-Medium', fontSize: moderateScale(14), color: '#535D70' }}>: {subTaskData.length} SubTasks</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => selectAllHandler()}>
                                <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
                                    <Text style={{ color: '#26AFAB', fontFamily: 'Inter-Bold', fontSize: moderateScale(14) }}>Select All</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, marginLeft: 20, marginTop: 15 }}>
                    {subTaskRender()}
                </View>
            </View>
        </View >
    );
};

export default SubTask;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10
    },
    cardContainer: {
        marginVertical: 5,
        alignSelf: 'center',
        width: Helpers.ScreenWidth - scale(20),
        padding: 10
    },
    locationText: {
        paddingHorizontal: 5
    },
    editBtn: {
        borderRadius: 5,
        backgroundColor: 'rgba(38, 175, 171, 0.3)',
        padding: 10
    },
    progressBar: {
        height: 10,
        // width:
        borderRadius: 20,
        backgroundColor: Colors.green,
        flex: 1
    }
})