import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Styles, Colors } from 'themes'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import Navbar from 'components/Navbar'
import { ScreenWidth, PAGE_SIZE } from 'utils/Helpers'
import List from './List'
import Api from 'api'

export default function ({ route, navigation }) {
    const dispatch = useDispatch()
    const { queryParams = [] } = route.params
    const [page, setPage] = useState(1)
    const worklist = useSelector(state => state.worklist)
    const user = useSelector(state => state.root.user)

    useEffect(() => {
        fetchListByPagination(false)
    }, [JSON.stringify(queryParams)])

    fetchListByPagination = async (loadMore = false, refresh = false) => {
        const { selectedEventId } = user
        let newPage = page
        let params = {}
        let customParams = {}

        if (loadMore) {
            customParams = { pageIndex: page + 1 }
            setPage(newPage)
        } else {
            customParams = { pageIndex: 1 }
        }

        if (queryParams && queryParams.length > 0 && !refresh) {
            queryParams.forEach(item => {
                customParams = { ...customParams, [item.name]: item.key }
            })
        }

        params = {
            eventId: selectedEventId,
            pageSize: PAGE_SIZE,
            ...customParams
        }
        // console.log('#FetchListByPagination :', params)

        dispatch(Api.fetchWorklistEvent(params))
    }

    const renderHeader = () => {
        const { metadata } = worklist

        if (!metadata && !metadata.totalCount) return <View />
        return (
            <View style={[Styles.flex, Styles.paddingHorizontalLg, Styles.paddingBottomSm]}>
                <Text style={Styles.textSecondary}>{metadata.totalCount} worklist found</Text>
            </View>
        )
    }

    const renderTitle = () => {
        if (queryParams && queryParams?.length) {
            const newParams = queryParams.filter(item => {
                return item.value
            }).map(item => item.value)

            return (
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1}
                        ellipsizeMode='tail'
                        style={[Styles.textBold, Styles.textXl, Styles.textTitle]}>{newParams.toString()}</Text>
                </View>
            )
        }
        return []
    }

    return (
        <View style={Styles.flex}>
            <View style={[Styles.container, Styles.col]}>
                <Navbar
                    titleComponent={renderTitle() ? renderTitle() : <View />}
                    navigation={navigation} />
                <Spacer size="xs" />
                <List headerComponent={renderHeader} navigation={navigation} fetchListByPagination={fetchListByPagination} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        color: Colors.tertiery
    },
    titleContainer: {
        width: ScreenWidth * 0.8
    }
})
