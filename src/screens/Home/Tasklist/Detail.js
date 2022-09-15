import React, { useEffect, useState } from 'react'
import { View, TextInput, Image, StyleSheet, FlatList, Animated, Alert, TouchableOpacity, Pressable } from 'react-native'
import { scale, moderateScale } from 'react-native-size-matters';
import { connect, useDispatch, useSelector } from 'react-redux';
import Slider from '@react-native-community/slider';
// import { Slider } from '@miblanchard/react-native-slider';
import LinearGradient from 'react-native-linear-gradient'
import { parseISO, format } from 'date-fns'
import SubmitButton from 'components/Forms/SubmitButton'
import CancelButton from 'components/Forms/CancelButton'
import { Styles, Colors } from 'themes'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import Navbar from 'components/Navbar'
import Card from 'components/Card'
import Loading from 'components/Loading'
import DetailItem from './DetailItem'
import { useDidMount, PAGE_SIZE, convertStatus, convertEnumStatus, ScreenHeight, ScreenWidth } from 'utils/Helpers'
import CheckCircleIcon from 'assets/icons/check-circle.svg'
import ExitWhiteIcon from 'assets/icons/exit-white.svg'
import ExitIcon from 'assets/icons/exit.svg'
import Api from 'api'
import CustomAlert from 'components/CustomAlert'
import ChevronDownIcon from 'assets/icons/chevron-down.svg'
import ChevronUpIcon from 'assets/icons/chevron-up.svg'
import { addOfflineData } from '../../../store/actions/OfflineAction';
import SubTask from './SubTask';

function TaskDetail({ route, navigation }) {
    const [progress, setProgress] = useState(0)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [page, setPage] = useState(1)
    const [progressError, setProgressError] = useState(null)
    const [showEmpty, setShowEmpty] = useState(false)
    const [showReworkModal, setShowReworkModal] = useState(false)
    const [showAcceptModal, setShowAcceptModal] = useState(false)
    const [remark, setRemark] = useState()
    const [showActivity, setShowActivity] = useState(true)
    const [showLog, setShowLog] = useState(true)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [taskId, setTaskId] = useState()
    const didMount = useDidMount()
    const dispatch = useDispatch()
    const tasklist = useSelector(state => state.tasklist)
    const activityLog = useSelector(state => state.activityLog)
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0))
    const { task: { activityName, taskNo, note, actualStart, actualFinish, remarks, progressPercent, modifiedDate, pendingStatus }, tempTask } = tasklist
    const { params = {} } = route
    const offlineMode = useSelector(state => state.offline.offline_mode);
    const addOffData = data => dispatch(addOfflineData(data));
    // const isWcs = false
    const userStore = useSelector(state => state.root.user)
    const { user } = userStore
    let isWcs = user && user?.isWcsVerifier ? true : false

    useEffect(() => {
        if (didMount) {
            if (tempTask && tempTask?.id) {
                setTaskId(tempTask?.id)
                loadTask(tempTask)
            } else {
                setShowEmpty(true)
            }
        }
    }, [tempTask])

    useEffect(() => {
        if (actualStart) {
            setStartDate(format(parseISO(actualStart), 'dd-MMM-yyyy hh:mm'))
        }

        if (actualFinish) {
            setEndDate(format(parseISO(actualFinish), 'dd-MMM-yyyy hh:mm'))
        }

        if (progressPercent) {
            setProgress(progressPercent)

            if (progressPercent == progress) {
                setProgressError(`* Value must be larger than Progress Percentage (${progressPercent}%)`)
            }
        }
    }, [tasklist.task])

    fetchListByPagination = async (loadMore = false, customParams = null) => {
        var newPage = loadMore ? page + 1 : page
        let params = {}
        // console.log("#TASK: ", taskId, tempTask)

        if (customParams) {
            params = customParams
        } else {
            params = {
                tasklistId: tempTask.id,
                pageIndex: newPage,
                pageSize: PAGE_SIZE
            }
        }
        dispatch(Api.fetchActivityLogsEvent(params))
    }

    const loadTask = async (task) => {
        if (task) {
            dispatch(Api.fetchTaskEvent(task.id))
            const params = {
                tasklistId: task.id,
                pageIndex: 1,
                pageSize: PAGE_SIZE
            }
            fetchListByPagination(false, params)
        }
    }

    const handleUpdateProgress = (isRework = false) => {
        let data = { tasklistID: tempTask.id, remarks: remark, animate: true, progressPercent: progress }

        if (isRework) {
            data.pendingStatus = 6
            data.progressPercent = 95
        } else {
            if (progressPercent < 100) {
                data.pendingStatus = 2
            } else {
                data.pendingStatus = 3
            }
        }

        if (!offlineMode) {
            addOffData(data);
        } else {
            if (isWcs) {
                dispatch(Api.updateTaskEvent(data)).then(() => {
                    if (isRework) {
                        setShowReworkModal(false)
                    } else {
                        setShowAcceptModal(false)
                    }

                    setShowSuccessAlert(true)
                })
            } else {
                dispatch(Api.updateTaskEvent(data)).then(() => {
                    setShowConfirmation(false)
                    setShowSuccessAlert(true)
                })
            }
        }
    }

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start()
    }

    const handleCollapsible = (name) => {
        if (name === 'activity') {
            setShowActivity(!showActivity)
        } else {
            setShowLog(!showLog)
        }
    }

    const renderEmpty = () => {
        return (
            <View style={[Styles.paddingSm, Styles.itemCenter, { height: ScreenHeight * 0.25 }]}>
                <Image source={require('assets/images/common/no-data.jpg')} style={{ resizeMode: 'contain', height: scale(ScreenWidth * 0.5) }} />
                <Spacer size="sm" />
            </View>
        )
    }

    const renderItem = ({ item, index }) => {
        return <DetailItem navigation={navigation} item={item} fadeAnim={fadeAnim} />
    }

    const renderLogs = () => {
        const { loading = false, data = [], isOnEndReached = false } = activityLog
        // console.log("#DATA:", data)
        if (!data.length) return renderEmpty()
        return (
            <View style={showLog ? params && params.update ? { height: ScreenHeight * 0.25 } : { height: ScreenHeight * 0.5 } : {}}>
                <FlatList
                    showsVerticalScrollIndicator={true}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item, idx) => `log-${idx.toString()}`}
                    renderItem={renderItem}
                    // renderEmpty={renderEmpty()}
                    onRefresh={() => fetchListByPagination(false)}
                    refreshing={loading || false}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (!isOnEndReached) {
                            fetchListByPagination(true)
                        }
                    }}
                />
            </View>
        )
    }

    const renderCard = () => {
        const { data = [] } = activityLog

        return (
            <View style={[Styles.col]}>
                <View style={[Styles.row, Styles.spaceBetween]}>
                    <Text style={[Styles.textBold, Styles.textSecondary]}>Activity Log</Text>
                    <TouchableOpacity onPress={() => handleCollapsible('logs')} style={Styles.paddingSm}>
                        {showLog ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </TouchableOpacity>
                </View>
                {showLog ? <Spacer size="xxs" /> : <View />}
                {showLog ?
                    <View style={[Styles.borderRoundSm, data.length > 0 ? Styles.backgroundCard : {}]}>
                        {renderLogs()}
                    </View> : <View />}
            </View>
        )
    }

    const renderActivity = () => {
        return (
            <Card containerStyle={[Styles.paddingMd, Styles.borderRoundSm]}>
                <View style={[Styles.row, Styles.spaceBetween]}>
                    <Text style={[Styles.textBold, Styles.textSecondary]}>{activityName}</Text>
                    <TouchableOpacity onPress={() => handleCollapsible('activity')} style={Styles.paddingSm}>
                        {showActivity ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </TouchableOpacity>
                </View>
                {showActivity ? <Spacer size="xxxs" /> : <View />}
                {showActivity ?
                    <View style={[Styles.col, Styles.paddingLeftSm]}>
                        <View style={[Styles.col]}>
                            <Text style={[Styles.textTertiery, Styles.textBold, Styles.textSm]}>Task Note : </Text>
                            <Spacer size="xxs" />
                            <View style={[Styles.paddingHorizontalXs, Styles.roundedBox]}>
                                {note ? <Text style={[Styles.textTertiery, Styles.textSm]}>{note}</Text> :
                                    <Text style={[Styles.textTertiery, Styles.textSm]}> - </Text>}
                            </View>
                        </View>
                        <Spacer size="xs" />
                        <View style={Styles.row}>
                            <View style={[Styles.col]}>
                                <Text style={[Styles.textBold, Styles.textTertiery, Styles.textSm, styles.dateLabel]}>Actual Start :</Text>
                                <Spacer size="xxs" />
                                <View style={[Styles.paddingHorizontalXs, Styles.roundedBox]}>
                                    {startDate ? <Text style={[Styles.textTertiery, Styles.textSm]}>{startDate}</Text> :
                                        <Text style={[Styles.textTertiery, Styles.textSm]}> - </Text>}
                                </View>
                            </View>
                            <Spacer size="xs" />
                            <View style={[Styles.col]}>
                                <Text style={[Styles.textBold, Styles.textTertiery, Styles.textSm, styles.dateLabel]}>Actual Finish :</Text>
                                <Spacer size="xxs" />
                                <View style={[Styles.paddingHorizontalXs, Styles.roundedBox]}>
                                    {endDate ? <Text style={[Styles.textTertiery, Styles.textSm]}>{endDate}</Text> :
                                        <Text style={[Styles.textTertiery, Styles.textSm]}> - </Text>}
                                </View>
                            </View>
                        </View>
                    </View> : <View />}
                <Spacer size="sm" />
                <View style={[Styles.horDivider]} />
                <Spacer size="xs" />
                {renderCard()}
            </Card>
        )
    }

    const renderUpdateCard = () => {
        let progressLbl = "In Progress"

        if (pendingStatus) {
            if (typeof pendingStatus === 'number') {
                progressLbl = convertStatus(pendingStatus)
            } else {
                progressLbl = convertEnumStatus(pendingStatus)
            }
        }
        // console.log("PENDINGSTATUS: ", pendingStatus)

        return (
            <Card containerStyle={[Styles.paddingMd, Styles.borderRoundSm]}>
                <Text style={[Styles.textSecondary, Styles.textBold]}>Task Progress</Text>
                {isWcs ?
                    <View /> :
                    <Text style={[Styles.textSm, Styles.textGreyLighter]}>* Update progress by tapping along the adjustable slider</Text>}
                <Spacer size="sm" />
                {isWcs ?
                    <View style={Styles.col}>
                        <Text style={[Styles.textSecondary, Styles.textLg]}> <Text style={[Styles.textBold, Styles.textXl]}>{progressPercent}%</Text> {progressLbl}</Text>
                        <Spacer size="xs" />
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.wcsProgressIndicator} colors={['#FDE724', '#FFB535']}>
                            <Spacer size="xs" />
                        </LinearGradient>
                    </View> :
                    <View style={[Styles.row, Styles.alignCenter]}>
                        <View style={[Styles.col, { marginLeft: -10, marginRight: -10 }]}>
                            <Slider
                                style={{ width: ScreenWidth * 0.7, height: 40, transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                                minimumValue={0}
                                maximumValue={100}
                                disabled={!isWcs && progressPercent == 100}
                                step={5}
                                value={progress}
                                minimumTrackTintColor={Colors.primary}
                                maximumTrackTintColor={Colors.grey}
                                renderThumbComponent={() =>
                                    <View style={{ backgroundColor: Colors.primaryLight, height: 20, width: 20, borderRadius: 10 }}>
                                        <View style={{ backgroundColor: Colors.primary, height: 15, width: 15, borderRadius: 7.5 }}>
                                        </View>
                                    </View>
                                }
                                onValueChange={(value) => {
                                    setProgress(value)
                                    if (modifiedDate) {
                                        if (value > progressPercent) {
                                            setProgressError(null)
                                        } else {
                                            setProgressError(`* Value must be larger than Progress Percentage (${progressPercent}%)`)
                                        }
                                    } else {
                                        setProgressError(null)
                                    }
                                }}
                            />
                            <Text style={styles.error}>{progressError}</Text>
                        </View>
                        <Spacer size="xxs" />
                        <View>
                            <View style={[Styles.row, Styles.alignCenter]}>
                                <View style={styles.percentageContainer}>
                                    <Text style={[Styles.textPrimary, Styles.textBold, Styles.textXl]}>{progress}</Text>
                                </View>
                                <Spacer size="xxs" />
                                <Text style={[Styles.textPrimary, Styles.textBold, Styles.textXl]}>%</Text>
                            </View>
                            <Spacer size="xs" />
                        </View>
                    </View>}
            </Card>
        )
    }

    const renderSubmitBtn = () => {
        return (
            <SubmitButton
                title="Update Progress"
                disabled={!progress || (progress <= progressPercent)}
                styles={!progress || (progress <= progressPercent) ? styles.buttonDisabled : {}}
                textStyles={!progress ? styles.textButtonDisabled : Styles.textWeight500}
                hasOpacity={true}
                onPress={() => {
                    if (progressError) {
                        Alert.alert('Validation error', `Task progress must be larger than current Progress Percentage (${progressPercent}%)`)
                    } else {
                        setShowConfirmation(true)
                    }
                }} />
        )
    }

    const renderUpdateButton = () => {
        // console.log('#TASK status: ', pendingStatus)
        const disabled = pendingStatus == 'Rework'

        return (
            <View style={[Styles.backgroundWhite, Styles.paddingHorizontalLg, Styles.paddingVerticalSm]}>
                {isWcs ?
                    <View style={Styles.col}>
                        <CancelButton
                            title="Rework"
                            disabled={disabled || progressPercent != 100}
                            styles={disabled || progressPercent != 100 ? styles.buttonDisabled : {}}
                            textStyles={disabled || progressPercent != 100 ? styles.textButtonDisabled : Styles.textWeight500}
                            hasOpacity={true}
                            onPress={() => {
                                setShowReworkModal(true)
                            }} />
                        <SubmitButton
                            title="Accept"
                            disabled={disabled || progressPercent != 100}
                            styles={disabled || progressPercent != 100 ? styles.buttonDisabled : {}}
                            textStyles={disabled || progressPercent != 100 ? styles.textButtonDisabled : Styles.textWeight500}
                            hasOpacity={true}
                            onPress={() => {
                                setShowAcceptModal(true)
                            }} />
                    </View> :
                    renderSubmitBtn()
                }
            </View>
        )
    }

    if (showEmpty) {
        return <Loading handleReload={loadTask} navigation={navigation} hasBack={true} />
    }

    const renderUpdaterModal = () => {
        return (
            <View>
                <CustomAlert
                    show={showConfirmation}
                    showProgress={false}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    animate={false}
                    contentContainerStyle={{ padding: 0, minWidth: '80%' }}
                    customView={
                        <View style={[Styles.col, Styles.paddingSm]}>
                            <View style={[Styles.row, Styles.spaceBetween]}>
                                <Text style={[Styles.textSecondary, Styles.textWeight500, { fontSize: 18 }]}>Update Progress</Text>
                                <TouchableOpacity onPress={() => setShowConfirmation(false)} style={styles.exitIcon}>
                                    <ExitIcon color={Colors.white} width={10} height={10} />
                                </TouchableOpacity>
                            </View>
                            <Spacer size="sm" />
                            <View style={Styles.col}>
                                <Text style={[Styles.textSecondary, Styles.textWeight500]}>REMARKS <Text style={Styles.textGreyLighter}>( Optional )</Text></Text>
                                <Spacer size="xs" />
                                <TextInput
                                    placeholder="Write your remarks here..."
                                    onChangeText={(val) => {
                                        setRemark(val)
                                    }}
                                    // value={remark}
                                    numberOfLines={2}
                                    multiline={true}
                                    style={styles.input} />
                            </View>
                            <Spacer size="sm" />
                            <CancelButton
                                title="Cancel"
                                textStyles={Styles.textWeight500}
                                hasOpacity={true}
                                onPress={() => {
                                    setShowConfirmation(false)
                                }} />
                            <SubmitButton
                                title="Submit"
                                textStyles={Styles.textWeight500}
                                hasOpacity={true}
                                onPress={() => {
                                    handleUpdateProgress()
                                }} />
                        </View>}
                />
                <CustomAlert
                    show={showSuccessAlert}
                    showProgress={false}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    confirmButtonColor={Colors.primary}
                    animate={false}
                    contentContainerStyle={{ padding: 0, minWidth: '80%' }}
                    customView={
                        <View style={[Styles.col]}>
                            <View style={[Styles.backgroundPrimary, Styles.borderTopLeftRadiusXs, Styles.borderTopRightRadiusXs, Styles.paddingSm, Styles.row, Styles.justifyCenter]}>
                                <CheckCircleIcon />
                                <TouchableOpacity onPress={() => setShowSuccessAlert(false)} style={styles.exitIcon}>
                                    <ExitWhiteIcon fill={Colors.white} color={Colors.white} width={10} height={10} />
                                </TouchableOpacity>
                            </View>
                            <Spacer size="xs" />
                            <View style={[Styles.paddingSm]}>
                                <View style={Styles.alignCenter}>
                                    <Text style={[Styles.textBold, Styles.textXl]}>Good job!</Text>
                                    <Spacer size="xxs" />
                                    <Text style={[Styles.textSecondary, Styles.textNormal]}>Your progress has been updated</Text>
                                </View>
                                <Spacer size="md" />
                                <SubmitButton
                                    title="OK"
                                    hasOpacity={true}
                                    textStyles={Styles.textWeight500}
                                    onPress={() => {
                                        fadeIn()
                                        setShowSuccessAlert(false)
                                    }} />
                            </View>
                        </View>}
                />
            </View>
        )
    }

    const renderWcsModal = () => {
        return (
            <View>
                <CustomAlert
                    show={showReworkModal}
                    showProgress={false}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    animate={false}
                    contentContainerStyle={{ padding: 0, minWidth: '80%' }}
                    customView={
                        <View style={[Styles.col, Styles.paddingSm]}>
                            <View style={[Styles.row, Styles.spaceBetween]}>
                                <Text style={[Styles.textSecondary, Styles.textWeight500, { fontSize: 18 }]}>Update Progress</Text>
                                <TouchableOpacity onPress={() => setShowReworkModal(false)} style={styles.exitIcon}>
                                    <ExitIcon color={Colors.white} width={10} height={10} />
                                </TouchableOpacity>
                            </View>
                            <Spacer size="sm" />
                            <View style={Styles.col}>
                                <Text style={[Styles.textSecondary, Styles.textWeight500]}>JUSTIFICATION FOR REWORKS <Text style={Styles.textDanger}>*</Text></Text>
                                <Spacer size="xs" />
                                <TextInput
                                    placeholder="Write your justification for reworks here..."
                                    onChangeText={(val) => {
                                        setRemark(val)
                                    }}
                                    // value={remark}
                                    numberOfLines={2}
                                    multiline={true}
                                    style={styles.input} />
                            </View>
                            <Spacer size="sm" />
                            <CancelButton
                                title="Cancel"
                                textStyles={Styles.textWeight500}
                                hasOpacity={true}
                                onPress={() => {
                                    setShowReworkModal(false)
                                }} />
                            <SubmitButton
                                title="Submit"
                                textStyles={Styles.textWeight500}
                                hasOpacity={true}
                                onPress={() => {
                                    handleUpdateProgress(true)
                                }} />
                        </View>}
                />
                <CustomAlert
                    show={showAcceptModal}
                    showProgress={false}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    animate={false}
                    contentContainerStyle={{ padding: 0, minWidth: '80%' }}
                    customView={
                        <View style={[Styles.col, Styles.paddingSm]}>
                            <View style={[Styles.row, Styles.spaceBetween]}>
                                <Text style={[Styles.textSecondary, Styles.textWeight500, { fontSize: 18 }]}>WCS Completion</Text>
                                <TouchableOpacity onPress={() => setShowAcceptModal(false)} style={styles.exitIcon}>
                                    <ExitIcon color={Colors.white} width={10} height={10} />
                                </TouchableOpacity>
                            </View>
                            <Spacer size="sm" />
                            <Text style={[Styles.textSecondary, Styles.textWeight400]}>The task has been completed. Do you want to accept the completion?</Text>
                            <Spacer size="sm" />
                            <CancelButton
                                title="No"
                                textStyles={Styles.textWeight500}
                                hasOpacity={true}
                                onPress={() => {
                                    setShowAcceptModal(false)
                                }} />
                            <SubmitButton
                                title="Yes"
                                textStyles={Styles.textWeight500}
                                hasOpacity={true}
                                onPress={() => {
                                    handleUpdateProgress()
                                }} />
                        </View>}
                />
                <CustomAlert
                    show={showSuccessAlert}
                    showProgress={false}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    confirmButtonColor={Colors.primary}
                    animate={false}
                    contentContainerStyle={{ padding: 0, minWidth: '80%' }}
                    customView={
                        <View style={[Styles.col]}>
                            <View style={[Styles.backgroundPrimary, Styles.borderTopLeftRadiusXs, Styles.borderTopRightRadiusXs, Styles.paddingSm, Styles.row, Styles.justifyCenter]}>
                                <CheckCircleIcon />
                                <TouchableOpacity onPress={() => setShowSuccessAlert(false)} style={styles.exitIcon}>
                                    <ExitWhiteIcon fill={Colors.white} color={Colors.white} width={10} height={10} />
                                </TouchableOpacity>
                            </View>
                            <Spacer size="xs" />
                            <View style={[Styles.paddingSm]}>
                                <View style={Styles.alignCenter}>
                                    <Text style={[Styles.textBold, Styles.textXl]}>Great!</Text>
                                    <Spacer size="xxs" />
                                    <Text style={[Styles.textSecondary, Styles.textNormal]}>The task has been completed</Text>
                                </View>
                                <Spacer size="md" />
                                <SubmitButton
                                    title="OK"
                                    hasOpacity={true}
                                    textStyles={Styles.textWeight500}
                                    onPress={() => {
                                        fadeIn()
                                        setShowSuccessAlert(false)
                                    }} />
                            </View>
                        </View>}
                />
            </View>
        )
    }

    return (
        <View style={Styles.flex}>
            {isWcs ? renderWcsModal() : renderUpdaterModal()}
            <Navbar
                title={taskNo}
                navigation={navigation} />
            <View style={[Styles.flex, Styles.paddingSm]}>
                {renderActivity()}
                {params.update ? <Spacer size="xs" /> : <View />}
                {params.update ? renderUpdateCard() : <View />}
                {params.update ? <Spacer size="xs" /> : <View />}
            </View>
            {params.update ? renderUpdateButton() : <View />}
        </View>
    )
}

export default TaskDetail

const styles = StyleSheet.create({
    dateLabel: {
        // width: scale(40)
    },
    avatar: {
        width: scale(20),
        height: scale(20),
    },
    verticalLine: {
        width: 1,
        backgroundColor: Colors.border,
        height: scale(40)
    },
    title: {
        color: '#9EA0A5',
        fontSize: 14
    },
    percentageContainer: {
        borderRadius: 4,
        backgroundColor: '#D9F2F7',
        paddingHorizontal: 7,
        paddingVertical: 2
    },
    input: {
        fontFamily: 'Inter-Regular',
        fontSize: moderateScale(14),
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: '#E0E0E0',
        textAlignVertical: 'top'
    },
    fadingContainer: {
        backgroundColor: '#D9F2F7',
        padding: 5,
        borderRadius: 10
    },
    buttonDisabled: {
        backgroundColor: Colors.disabled,
        borderColor: 'transparent'
    },
    textButtonDisabled: {
        color: Colors.greyLighter,
        fontWeight: '500'
    },
    error: {
        fontSize: 10,
        color: Colors.red
    },
    exitIcon: {
        position: 'absolute',
        right: 5,
        top: 5
    },
    wcsProgressIndicator: {
        borderRadius: 10
    }
})
