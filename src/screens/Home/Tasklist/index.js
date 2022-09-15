import React, { useMemo, useRef, useCallback, useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Animated, ActivityIndicator, Image, TouchableWithoutFeedback } from 'react-native'
import { LazyPagerView } from 'react-native-pager-view';
import { Styles, Colors } from 'themes'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from 'components/Navbar'
import { ScreenWidth, PAGE_SIZE } from 'utils/Helpers'
import List from './List'
import Api from 'api'
import SearchIcon from 'assets/icons/search.svg'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import * as Images from 'utils/Images';
import { offlineProgressChanged, offlineDataChanged } from '../../../store/actions/OfflineAction';

const AnimatedPagerView = Animated.createAnimatedComponent(LazyPagerView)

export default function body({ navigation }) {
    const dispatch = useDispatch();
    const [index, setIndex] = useState(0)
    const [tabLoading, setTabLoading] = useState(false)
    const [tabs] = useState([
        { key: 'all', title: 'All Task' },
        { key: 'wcs', title: 'WCS' },
        { key: 'eis', title: 'EIS' },
        { key: 'mcs', title: 'MCS' },
        { key: 'general', title: 'General' }
    ]);
    const [isAnimated, setIsAnimated] = useState(true)
    const [group, setGroup] = useState()
    const [page, setPage] = useState(1)
    const ref = useRef(null);
    const onPageSelectedPosition = useRef(new Animated.Value(0)).current
    const worklistStore = useSelector(state => state.worklist)
    const { worklist = {} } = worklistStore
    const offlineMode = useSelector(state => state.offline.offline_mode)
    const offlineData = useSelector(state => state.offline.offline_data)
    const offline_progress = useSelector(state => state.offline.offline_progress)
    const offlineprogresschanged = status => dispatch(offlineProgressChanged(status))
    const offlinedatachanged = data => dispatch(offlineDataChanged(data))

    useEffect(() => {
        fetchListByPagination(false)
    }, [worklist])

    useEffect(() => {
        fetchListByPagination(false)
    }, [group])

    fetchListByPagination = async (loadMore = false, refresh = false) => {
        const { worklist } = worklistStore

        let newPage = page
        let params = {}
        let customParams = {}

        if (loadMore) {
            customParams = { pageIndex: page + 1, worklistId: worklist.id }
            setPage(newPage)
        } else {
            customParams = { pageIndex: 1, worklistId: worklist.id }
        }

        if (group && !refresh) {
            customParams = { ...customParams, group: group }
        }

        params = {
            pageSize: PAGE_SIZE,
            ...customParams
        }

        // console.log('#FetchListByPagination :', params)

        dispatch(Api.fetchTasklistEvent(params))
    }

    const onPageSelected = useMemo(
        () => Animated.event(
            [{ nativeEvent: { position: onPageSelectedPosition } }],
            {
                listener: ({ nativeEvent: { position } }) => {
                    setIndex(position);
                    onPageSelectedCallback(position);
                },
                useNativeDriver: true,
            }
        ),
        []
    );

    const setTabPage = useCallback(
        (page) => {
            setTabLoading(true)
            if (isAnimated) {
                ref.current?.setPage(page)
                setIndex(page)
            } else {
                ref.current?.setPageWithoutAnimation(page)
                setIndex(page)
            }

        },
        [isAnimated]
    );

    const onPageSelectedCallback = (pos) => {
        setTabLoading(false)
    }

    const renderPage = (item) => {
        return (
            <View key={item.key}>
                <List navigation={navigation} fetchListByPagination={fetchListByPagination} />
            </View>
        )
    }

    const renderLazyPager = () => {
        return (
            <AnimatedPagerView
                ref={ref}
                style={Styles.flex}
                initialPage={index}
                buffer={2}
                maxRenderWindow={20}
                scrollEnabled={false}
                onPageSelected={onPageSelected}
                pageMargin={10}
                orientation="horizontal"
                transitionStyle="scroll"
                showPageIndicator={false}
                data={tabs}
                keyExtractor={(prop) => prop.key}
                renderItem={renderPage}
            />
        )
    }

    const renderTab = () => {
        return (
            <View style={[styles.tabBar, Styles.paddingHorizontalXs, Styles.row, Styles.justifyCenter]}>
                {tabs.map((item, idx) => {
                    const { key, title } = item
                    return (
                        <TouchableOpacity
                            key={key}
                            disabled={tabLoading}
                            style={[{ width: ScreenWidth / 5.5 }]}
                            onPress={() => {
                                // console.log("###ITEM", item)
                                setTabPage(idx)
                                if (idx == 0) {
                                    setGroup(null)
                                } else {
                                    setGroup(item.key)
                                }

                            }}>
                            <View style={[Styles.row, Styles.itemCenter]}>
                                {tabLoading && index === idx ? <ActivityIndicator
                                    size="small"
                                    color={Colors.primary}
                                    style={styles.spinner} /> : <View />}
                                <Spacer size="xxs" />
                                <Text style={[Styles.textCenter, Styles.textTertiery, index === idx ? Styles.textBold : {}, tabLoading ? { color: Colors.greyLight } : {}]}>{title}</Text>
                            </View>
                            <Spacer size="sm" />
                            {index === idx ? <View style={styles.activeTab} /> : <View />}
                        </TouchableOpacity>
                    )
                })}
            </View >
        )
    }

    const offlineUI = () => {
        if (!offlineMode) {
            return (
                <View style={styles.offlineContainer}>
                    <Text style={{ color: 'white', marginLeft: 5 }}>Working in offline mode</Text>
                </View>
            )
        } else if (offlineMode && offlineData.length > 0 && offline_progress == null) {
            return (
                <TouchableWithoutFeedback onPress={syncOfflineData}>
                    <View style={styles.offlineContainer}>
                        <Image source={Images.images.offlineSync} />
                        <Text style={{ color: 'white', marginLeft: 5 }}>Tap to sync back</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        } else if (offline_progress == "progress") {
            return (
                <View style={styles.offlineContainer}>
                    <Image source={Images.images.offlineSync} />
                    <Text style={{ color: 'white', marginLeft: 5 }}>Syncing...</Text>
                </View>
            )
        } else if (offline_progress == "failed") {
            return (
                <View style={styles.offlineContainer}>
                    <Image source={Images.images.offlineSync} />
                    <Text style={{ color: 'white', marginLeft: 5 }}>Sync isn't working</Text>
                </View>
            )
        } else if (offline_progress == "completed") {
            return (
                <View style={styles.offlineCompletedContainer}>
                    <Image source={Images.images.offlineSuccess} />
                    <Text style={{ color: '#4DBDBA', marginLeft: 5 }}>Syncing completed</Text>
                </View>
            )
        }
        else {
            return null;
        }
    }

    const syncOfflineData = async () => {
        offlineprogresschanged("progress");
        let offData, offlineD = offlineData;
        for (let i = 0; i < offData.length; i++) {
            await dispatch(Api.updateTaskEvent(offData[i])).then(() => {
                offlineD = offlineD.shift()
                console.log("LATEST OFFLINE DATA:" + offlineD);
                if (i == offData.length - 1) {
                    offlinedatachanged(offData)
                    offlineprogresschanged("completed");
                    setTimeout(() => offlineprogresschanged(null), 2000)
                }
            }).catch(() => {
                offlineprogresschanged("failed");
                setTimeout(() => offlineprogresschanged(null), 2000);
            })
        }

    }

    return (
        <View style={Styles.flex}>
            <View style={[Styles.container, Styles.col]}>
                <Navbar
                    title={worklist?.equipmentNo ?? ''}
                    navigation={navigation}
                    containerStyles={Styles.navbarPlainContainer}
                    rightComponent={
                        <TouchableOpacity style={Styles.paddingSm} onPress={() => navigation.navigate('TasklistSearch')}>
                            <SearchIcon />
                        </TouchableOpacity>} />
                {renderTab()}
                {offlineUI()}
                {renderLazyPager()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: Colors.white,
        borderBottomColor: Colors.grey,
        borderBottomWidth: 0.5
    },
    tabBarBorder: {
        flex: 1,
        borderBottomColor: Colors.grey,
        borderBottomWidth: 1
    },
    tabIndicator: {
        backgroundColor: Colors.primary
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    activeTab: {
        backgroundColor: Colors.primary,
        height: 2,
        borderRadius: 20
    },
    offlineContainer: {
        marginBottom: 5,
        width: '100%',
        height: moderateScale(30),
        backgroundColor: '#C4C3D1',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        paddingTop: moderateScale(5)
    },
    offlineCompletedContainer: {
        marginBottom: 5,
        width: '100%',
        height: moderateScale(30),
        backgroundColor: '#E0F4F3',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        paddingTop: moderateScale(5)
    }
})
