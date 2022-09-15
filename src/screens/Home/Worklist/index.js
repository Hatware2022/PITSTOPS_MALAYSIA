import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { scale } from 'react-native-size-matters'
import Swiper from 'react-native-swiper';
import { LazyPagerView } from 'react-native-pager-view';
import StepIndicator from 'react-native-step-indicator';
import { useDispatch, useSelector } from 'react-redux';
import { Styles, Colors } from 'themes'
import { useDidMount, PAGE_SIZE } from 'utils/Helpers'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import Navbar from 'components/Navbar'
import Loading from 'components/Loading';
import SortModal from './SortModal'
import List from './List'
import Api from 'api'
import SearchIcon from 'assets/icons/search.svg'
import SortIcon from 'assets/icons/sort.svg'
import CheckIcon from 'assets/icons/check.svg'
import CheckGreyIcon from 'assets/icons/check-grey.svg'
import SyncIcon from 'assets/icons/sync.svg'

const AnimatedPagerView = Animated.createAnimatedComponent(LazyPagerView)

export default function ({ navigation }) {
    const [index, setIndex] = useState(0)
    const [toggleSortModal, setToggleSortModal] = useState(false)
    const [isAnimated, setIsAnimated] = useState(true);
    const dispatch = useDispatch()
    const [sortField, setSortField] = useState()
    const [sortBy, setSortBy] = useState('asc')
    const [page, setPage] = useState(1)
    const worklist = useSelector(state => state.worklist)
    const { phases = [] } = worklist
    const [phase, setPhase] = useState(phases[0])
    const onPageSelectedPosition = useRef(new Animated.Value(0)).current
    const ref = useRef(null);
    const user = useSelector(state => state.root.user)

    useEffect(() => {
        fetchListByPagination(false)
    }, [phase])

    useEffect(() => {
        fetchListByPagination(false)
    }, [sortField])

    fetchListByPagination = async (loadMore = false, refresh = false) => {
        const { selectedEventId } = user
        let newPage = page
        let params = {}
        let customParams = {}
        // console.log("#PHASE: ", phases, phase)

        if (loadMore) {
            customParams = { pageIndex: page + 1 }
            if (phase) {
                customParams = { ...customParams, phaseId: phase.phaseId }
            }
            setPage(newPage)
        } else {
            customParams = { pageIndex: 1, phaseId: phase.phaseId }
        }

        if (sortField && !refresh) {
            customParams = { ...customParams, sortField: sortField, sortBy: sortBy }
        }

        params = {
            eventId: selectedEventId,
            pageSize: PAGE_SIZE,
            ...customParams
        }
        // console.log('#FetchListByPagination :', params)

        dispatch(Api.fetchWorklistEvent(params))
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

    const setIndicatorPage = useCallback(
        (page) => {
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
    }

    const renderSortFilter = () => {
        const { metadata } = worklist
        return (
            <View style={[Styles.row, Styles.alignCenter, Styles.spaceBetween, Styles.paddingHorizontalLg, Styles.paddingTopSm]}>
                {metadata?.totalCount ? <Text style={[Styles.textSecondary, Styles.textNormal]}>{metadata.totalCount} worklists available</Text> : <View />}
                <TouchableOpacity style={Styles.paddingXs} onPress={handleToggleSortModal}>
                    <SortIcon />
                </TouchableOpacity>
            </View>
        )
    }

    const handleToggleSortModal = () => {
        setToggleSortModal(!toggleSortModal)
    }

    const handleSortBySelected = (sortByField) => {
        setSortBy(sortByField)
    }

    const handleSortSelected = (item) => {
        if (item) {
            setSortField(item.value)
        }
    }

    const renderStepIndicator = ({ position }) => {
        const phase = phases[position]
        const { phaseStatus } = phase

        let color = { backgroundColor: Colors.white }
        let borderColor = { borderColor: Colors.white }

        if (phaseStatus === 'In Progress') {
            color = { backgroundColor: Colors.yellowDark }
        } else if (phaseStatus === 'Completed') {
            color = { backgroundColor: Colors.primary }
        } else {
            borderColor = { borderColor: Colors.grey }
        }

        return <View
            style={[index == position ? styles.wrapperIndicator : styles.shadowIndicator, Styles.itemCenter, { ...color }]}>
            {index == position ? <View
                style={[styles.indicator, Styles.itemCenter, { ...color, ...borderColor }]}
            >
                {phaseStatus === 'In Progress' ? <SyncIcon /> : phaseStatus === 'Completed' ? <CheckIcon /> : <CheckGreyIcon />}
            </View> : <View />}
            {index != position ? (phaseStatus === 'In Progress') ? <SyncIcon /> : phaseStatus === 'Completed' ? <CheckIcon /> : <CheckGreyIcon /> : <View />}
        </View>

    }

    if (!phases || !phases?.length) {
        return (
            <View style={Styles.flex}>
                <View style={[Styles.container, Styles.col]}>
                    <Navbar
                        title="WORKLIST"
                        navigation={navigation} />
                    <Loading handleReload={() => dispatch(Api.fetchWorklistPhasesEvent(selectedEventId))} />
                </View>
            </View>
        )
    }

    const renderPage = (item) => {
        return (
            <View key={item.id}>
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
                data={phases}
                keyExtractor={(prop) => prop.phaseId}
                renderItem={renderPage}
            />
        )
    }

    return (
        <View style={Styles.flex}>
            <View style={[Styles.container, Styles.col]}>
                <Navbar
                    title="WORKLIST"
                    navigation={navigation}
                    rightComponent={
                        <TouchableOpacity style={Styles.paddingSm} onPress={() => navigation.navigate('WorklistSearch')}>
                            <SearchIcon />
                        </TouchableOpacity>} />
                {renderSortFilter()}
                <Spacer size="sm" />
                <StepIndicator
                    currentPosition={index}
                    onPress={(val) => {
                        setIndicatorPage(val)
                        if (phases && phases.length > 0) {
                            setPhase(phases[val])
                            fetchListByPagination(false)
                        }
                    }}
                    renderStepIndicator={renderStepIndicator}
                    labels={phases.map((item) => item.phaseName)}
                    customStyles={stepIndicatorStyle}
                />
                <Spacer size="sm" />
                {renderLazyPager()}
            </View>
            <SortModal navigation={navigation}
                toggleSortModal={handleToggleSortModal}
                isModalOpen={toggleSortModal}
                sortBy={sortBy}
                handleSortSelected={handleSortSelected}
                handleSortBySelected={handleSortBySelected} />
        </View>
    )
}

const stepIndicatorStyle = {
    stepStrokeCurrentColor: '#beeae9',
    stepStrokeWidth: 0.3,
    separatorStrokeWidth: 8,
    stepStrokeFinishedColor: Colors.primary,
    stepStrokeUnFinishedColor: Colors.greyLighter,
    separatorFinishedColor: Colors.primary,
    separatorUnFinishedColor: Colors.greyLightest,
    labelColor: Colors.greyLighter,
    labelSize: 13,
    currentStepLabelColor: Colors.tertiery
}

const styles = StyleSheet.create({
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


