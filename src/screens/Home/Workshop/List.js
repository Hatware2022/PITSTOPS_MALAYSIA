import React, { useState, useRef, useEffect } from 'react'
import { FlatList, View, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from 'themes'
import Api from 'api'
import { useDidMount, PAGE_SIZE } from 'utils/Helpers'
import ListItem from './ListItem'

export default function body({ navigation }) {
    const ref = useRef()
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const didMount = useDidMount();
    const workshop = useSelector(state => state.workshop)

    useEffect(() => {
        if (didMount) {
            fetchListByPagination(false)
        }
    }, [])

    fetchListByPagination = async (loadMore = false) => {
        let newPage = page

        if (loadMore) {
            newPage = page + 1
            setPage(newPage)
        }

        let params = {
            pageIndex: newPage,
            pageSize: PAGE_SIZE
        }

        dispatch(Api.fetchWorkshopEvent(params))
    }

    const renderItem = ({ item }) => {
        return <ListItem navigation={navigation} item={item} />
    }

    const renderFooter = () => {
        const { loading = false } = workshop
        if (loading) {
            return <View >
                <ActivityIndicator size="small" color={Colors.black} />
            </View>
        }
        return <View />
    }

    const renderList = () => {
        const { data = [], isOnEndReached = false, loading = false } = workshop

        return (
            <FlatList
                ref={ref}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={renderFooter}
                data={data}
                keyExtractor={(item, idx) => `workshop-${idx.toString()}`}
                renderItem={renderItem}
                onRefresh={() => {
                    fetchListByPagination(false)
                }}
                refreshing={loading || false}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    // console.log('ISONENDREACHED: ', stateQueryParams, isOnEndReached)
                    if (!isOnEndReached) {
                        fetchListByPagination(true)
                    }
                }}
            />
        )
    }

    return renderList()
}
