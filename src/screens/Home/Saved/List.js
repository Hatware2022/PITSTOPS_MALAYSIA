import React, { useState, useRef, useEffect } from 'react'
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from 'themes'
import Api from 'api'
import { useDidMount, PAGE_SIZE } from 'utils/Helpers'
import ListItem from './ListItem'

export default function body({ navigation, headerComponent, queryParams = null, isSearch = false }) {
    const ref = useRef()
    const dispatch = useDispatch()
    // const [sortParam, setSortParam] = useState()
    const worklist = useSelector(state => state.saved)
    const user = useSelector(state => state.root.user)
    const worklistFilter = useSelector(state => state.worklistFilter)
    const [page, setPage] = useState(1)
    const { phases = [] } = worklistFilter
    const didMount = useDidMount();
    const [stateQueryParams, setStateQueryParams] = useState()

    useEffect(() => {
        // if (didMount) {
        // setStateQueryParams(queryParams)
        // if (isSearch) {
        //     setPage(1)
        //     if (queryParams) {
        //         // console.log('###MASUK ISSEARCH22: ', queryParams, isSearch)
        //         fetchListByPagination(false, loadCustomParams(true, queryParams))
        //     } else {
        //         fetchListByPagination(false)
        //     }

        // } else {
        //     fetchListByPagination(false)
        //     // if (phases && phases.length) {
        //     //     // console.log("PHASES11:", firstPhase, firstPhase.key)
        //     //     fetchListByPagination(false)
        //     // }
        // }
        // }
    }, [])

    // loadCustomParams = (initial = false, params) => {
    //     const { selectedEvent } = user

    //     let query = {
    //         eventId: '700BDC54-324A-42B6-9A88-BB1AD6942579',
    //         // eventId: selectedEvent,
    //         pageIndex: initial ? 1 : page + 1,
    //         pageSize: PAGE_SIZE
    //     }

    //     // console.log("##QUERYPARAMS: ", params)
    //     if (params && params?.length) {
    //         params.forEach((item) => {
    //             query[item.name] = item.key
    //         })
    //     }

    //     return query
    // }

    // fetchListByPagination = async (loadMore = false, customParams = null) => {
    //     const { selectedEvent } = user
    //     // console.log("##SELEVENT: ", selectedEvent)
    //     var newPage = loadMore ? page + 1 : page
    //     let params = {}

    //     // const firstPhase = phases[0]

    //     if (customParams) {
    //         params = customParams
    //     } else {
    //         params = {
    //             // phaseId: firstPhase.key,
    //             eventId: '700BDC54-324A-42B6-9A88-BB1AD6942579',
    //             // eventId: selectedEvent,
    //             pageIndex: newPage,
    //             pageSize: PAGE_SIZE
    //         }
    //     }

    //     dispatch(Api.fetchWorklistEvent(params))
    // }

    const renderItem = ({ item, index }) => {
        // console.log('IDX:', index)
        return <ListItem navigation={navigation} item={item} />
    }

    const renderFooter = () => {
        const { loading = false } = worklist
        if (loading) {
            return <View >
                <ActivityIndicator size="small" color={Colors.black} />
            </View>
        }
        return <View />
    }

    const renderList = () => {
        const { data = [], isOnEndReached = false, loading = false } = worklist

        return (
            <FlatList
                ref={ref}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={headerComponent ? headerComponent : <View />}
                ListFooterComponent={renderFooter}
                data={data}
                keyExtractor={(item, idx) => `${idx.toString()}`}
                renderItem={renderItem}
                // onRefresh={() => fetchListByPagination(false)}
                refreshing={loading || false}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    // console.log('ISONENDREACHED: ', stateQueryParams, isOnEndReached)
                    // if (!isOnEndReached) {
                    //     if (stateQueryParams) {
                    //         fetchListByPagination(true, loadCustomParams(false, stateQueryParams))
                    //     } else {
                    //         fetchListByPagination(true)
                    //     }
                    // }
                }
                }
            />
        )
    }

    return renderList()
}

const styles = StyleSheet.create({
    container: {

    }
})