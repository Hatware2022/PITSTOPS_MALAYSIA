import React, { useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Styles, Colors } from 'themes'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import Navbar from 'components/Navbar'
import * as Helpers from 'utils/Helpers'
import List from './List'
import json from './sample.json'

export default function ({ route, navigation }) {
    const { params = [] } = route.params
    const worklist = useSelector(state => state.worklist)

    // useEffect(() => {
    //     if (didMount) {
    //         console.log("QUERY PARAMS:", params)
    //     }
    // }, [])

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
        if (params && params?.length) {
            const newParams = params.filter(item => {
                return item.value
            }).map(item => item.value)
            // console.log('NEWPARAM:', newParams);
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
                {/* {renderTitle()} */}
                <Navbar
                    titleComponent={renderTitle() ? renderTitle() : <View />}
                    // titleComponent={params.map((item) => <View>)}
                    navigation={navigation} />
                <Spacer size="xs" />
                <List headerComponent={renderHeader} isSearch={true} queryParams={params} navigation={navigation} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        color: Colors.tertiery
    },
    titleContainer: {
        width: Helpers.ScreenWidth * 0.8
    }
})
