import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { View, TouchableOpacity, StyleSheet, Animated, FlatList } from 'react-native'
import { scale } from 'react-native-size-matters'
import Swiper from 'react-native-swiper';
import { LazyPagerView } from 'react-native-pager-view';
import StepIndicator from 'react-native-step-indicator';
import { useDispatch, useSelector } from 'react-redux';
import { Styles, Colors } from 'themes'
import { useDidMount } from 'utils/Helpers'
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
    const [sort, setSort] = useState();
    const [isSearch, setIsSearch] = useState(false)
    const dispatch = useDispatch()
    const didMount = useDidMount()
    const worklist = useSelector(state => state.saved.data)
    const { phases = [] } = worklist
    const onPageSelectedPosition = useRef(new Animated.Value(0)).current
    const ref = useRef(null);
    const eventId = '700BDC54-324A-42B6-9A88-BB1AD6942579'

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

    const setPage = useCallback(
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

    const onPageSelectedCallback = (position) => {
        // console.log("##POSITION:", position)
    }

    useEffect(() => {
        // if (didMount) {
        //     dispatch(Api.fetchWorklistPhasesEvent(eventId))
        // }
    }, [])

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

    const handleSortSelected = (item, sortBy) => {
        // console.log("##ITEM:", item, sortBy)
        if (item) {
            setIsSearch(true)
            setSort([{ name: "sortField", key: item.value }, { name: "sortBy", key: sortBy ? sortBy : 'asc' }])
        }
    }



    // console.log("##PHASES: ", phases)

    // if (!phases || !phases?.length) {
    //     return (
    //         <View style={Styles.flex}>
    //             <View style={[Styles.container, Styles.col]}>
    //                 <Navbar
    //                     title="SAVED"
    //                     navigation={navigation} />
    //                 <Loading handleReload={() => dispatch(Api.fetchWorklistPhasesEvent(eventId))} />
    //             </View>
    //         </View>
    //     )
    // }

    const renderPage = (item) => {
        return (
            <View key={item.id}>
                <List navigation={navigation} index={index} queryParams={sort} isSearch={isSearch} />
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
                // onPageScroll={onPageScroll}
                // onPageSelected={onPageSelected}
                // onPageScrollStateChanged={pageScroll}
                pageMargin={10}
                // Lib does not support dynamically orientation change
                orientation="horizontal"
                // Lib does not support dynamically transitionStyle change
                transitionStyle="scroll"
                showPageIndicator={false}
                data={worklist}
                keyExtractor={({ id }) => id}
                renderItem={renderPage}
            />
        )
    }

    return (
        <View style={Styles.flex}>
            <View style={[Styles.container, Styles.col]}>
                <Navbar
                    title="SAVED"
                    navigation={navigation}
                    rightComponent={
                        <TouchableOpacity style={Styles.paddingSm} onPress={() => navigation.navigate('SavedWorklistSearch')}>
                            <SearchIcon />
                        </TouchableOpacity>} />

                <Spacer size="sm" />
                {renderLazyPager()}
                {/* {phases ?
                    <Swiper
                        style={{ flexGrow: 1 }}
                        loop={false}
                        index={index}
                        autoplay={false}
                        scrollEnabled={false}
                        // scrollsToTop
                        showsPagination={false}
                        onIndexChanged={(index) => {
                            setIndex(index);
                        }}
                    >
                        {phases.map((pg) => renderPage(pg))}
                    </Swiper> : <View />} */}
            </View>
            <SortModal navigation={navigation}
                toggleSortModal={handleToggleSortModal}
                isModalOpen={toggleSortModal}
                handleSortSelected={handleSortSelected} />
        </View>
    )
}

const stepIndicatorStyle = {
    stepStrokeCurrentColor: '#beeae9',
    // stepStrokeUnFinishedColor: '#aaaaaa',
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


