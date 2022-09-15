import React, { useEffect, useRef } from 'react'
import { FlatList, View, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux';
import { Text } from 'components/Text'
import { Colors, Styles } from 'themes'
import ListItem from './ListItem'

export default function body({ navigation, fetchListByPagination }) {
    const ref = useRef()
    const tasklist = useSelector(state => state.tasklist)

    const renderItem = ({ item }) => {
        return <ListItem navigation={navigation} item={item} />
    }

    const renderHeader = () => {
        const { metadata = {} } = tasklist
        return (
            <View style={[Styles.paddingVerticalSm, Styles.paddingHorizontalLg]}>
                <Text style={[Styles.textSecondary, Styles.textNormal]}>{metadata.totalCount} tasklists available</Text>
            </View>
        )
    }

    const renderFooter = () => {
        const { loading = false } = tasklist
        if (loading) {
            return <View >
                <ActivityIndicator size="small" color={Colors.black} />
            </View>
        }
        return <View />
    }

    const renderList = () => {
        const { data = [], isOnEndReached = false, loading = false } = tasklist

        return (
            <FlatList
                ref={ref}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                data={data}
                keyExtractor={(item, idx) => `tasklist-${idx.toString()}`}
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
