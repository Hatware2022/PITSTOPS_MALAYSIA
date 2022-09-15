import React, { useRef } from 'react'
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux';
import { Colors } from 'themes'
import Empty from 'components/Empty'
import ListItem from './ListItem'

export default function body({ navigation, headerComponent, fetchListByPagination }) {
    const ref = useRef()
    const worklist = useSelector(state => state.worklist)

    const renderItem = ({ item }) => {
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
                ListEmptyComponent={<Empty msg="There's no worklist records" />}
                data={data}
                keyExtractor={(item, idx) => `worklist-${idx.toString()}`}
                renderItem={renderItem}
                onRefresh={() => {
                    fetchListByPagination(false, true)
                }}
                refreshing={loading || false}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!isOnEndReached) {
                        fetchListByPagination(true)
                    }
                }}
            />
        )
    }

    return renderList()
}
