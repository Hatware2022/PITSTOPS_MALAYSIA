import React, { useState } from 'react';
import { Text, View, SafeAreaView, Alert, FlatList, Image } from 'react-native';
import * as Images from 'utils/Images';
import Header from 'components/Header/Header';
import HeaderTitle from 'components/Header/HeaderTitle';
import HeaderSearch from 'components/Header/HeaderSearch';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationContainer } from '@react-navigation/native';


const myTaskList = [
    {
        "id": 0,
        "name": "Equipment 01",
        "activity": "Task 2 - Activity name",
        "progress": "Pending",
        "date": "03-JUL-2021",
        "unread": true
    }, {
        "id": 1,
        "name": "Equipment 02",
        "activity": "Task 1 - Activity name",
        "progress": "In Progress",
        "date": "03-JUL-2021",
        "unread": true
    }, {
        "id": 2,
        "name": "Equipment 03",
        "activity": "Task 3 - Activity name",
        "progress": "Rework",
        "date": "03-JUL-2021",
        "unread": false
    }, {
        "id": 3,
        "name": "Equipment 04",
        "activity": "Task 2 - Activity name",
        "progress": "Pending",
        "date": "03-JUL-2021",
        "unread": false
    }, {
        "id": 4,
        "name": "Equipment 05",
        "activity": "Task 2 - Activity name",
        "progress": "In Progress",
        "date": "03-JUL-2021",
        "unread": false
    },

]

function MyTask({ navigation }) {

    const openSearch = () => {
        navigation.navigate('SearchMyTask');
    }

    const headerComponent = () => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', height: 50, backgroundColor: '#F9F8FF' }}>
                <View style={{ flex: 2, padding: 15, borderWidth: 1, borderColor: 'lightgray' }}>
                    <Text style={{ color: '#535D70' }}>Task 2 - Activity name asdfas</Text>
                </View>
                <View style={{ flex: 1, padding: 15, borderWidth: 1, borderColor: 'lightgray' }}>
                    <Text style={{ color: '#7365B1' }}>Status</Text>
                </View>
                <View style={{ flex: 1, padding: 15, borderWidth: 1, borderColor: 'lightgray' }}>
                    <Text style={{ color: '#7365B1' }}>Date</Text>
                </View>

            </View>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, height: moderateScale(100) }}>
                <View style={{ flex: 1, flexDirection: 'row', height: moderateScale(100) }}>
                    <View style={{ flex: 1.8, height: moderateScale(70) }}>
                        <View style={{ padding: 15 }}>
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: moderateScale(16), color: '#535D70' }}>{item.name}</Text>
                            <Text style={{ flexWrap: 'wrap', color: '#535D70', fontSize: moderateScale(10), fontFamily: 'Inter-Regular', marginTop: 5 }}>{item.activity}</Text>
                        </View>
                        {item.unread &&
                            <View style={{ marginLeft: 18, width: 50, height: 25, padding: 5, backgroundColor: '#F1F4FB', borderRadius: 5 }}>
                                <Text style={{ fontSize: moderateScale(10), color: '#637AB8', textAlign: 'center', fontFamily: 'Inter-Bold' }}>Unread</Text>
                            </View>
                        }
                    </View>
                    {item.progress == "Pending" &&
                        <View style={{ flex: 1, paddingTop: 20, alignItems: 'center' }}>
                            <View style={{ padding: 5, flexDirection: 'row', backgroundColor: '#FFF2F2', width: moderateScale(70), borderRadius: 5 }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#D50000', borderRadius: 3, marginTop: 5 }}></View>
                                <Text style={{ paddingLeft: 5, color: '#D50000', fontSize: moderateScale(10), fontWeight: '500', fontFamily: 'Inter-Regular' }}>Pending</Text>
                            </View>
                        </View>
                    }
                    {item.progress == "In Progress" &&
                        <View style={{ flex: 1, paddingTop: 20, alignItems: 'center' }}>
                            <View style={{ padding: 5, flexDirection: 'row', backgroundColor: '#FFF7E5', width: moderateScale(70), borderRadius: 5 }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#FC930D', borderRadius: 3, marginTop: 5 }}></View>
                                <Text style={{ paddingLeft: 5, color: '#FC930D', fontSize: moderateScale(10), fontWeight: '500', fontFamily: 'Inter-Regular' }}>In Progress</Text>
                            </View>
                        </View>
                    }
                    {item.progress == "Rework" &&
                        <View style={{ flex: 1, paddingTop: 20, alignItems: 'center' }}>
                            <View style={{ padding: 5, flexDirection: 'row', backgroundColor: '#FFF7E5', width: moderateScale(70), borderRadius: 5 }}>
                                <View style={{ width: 5, height: 5, backgroundColor: 'FC930D', borderRadius: 3, marginTop: 5 }}></View>
                                <Text style={{ paddingLeft: 5, color: '#FC930D', fontSize: moderateScale(10), fontWeight: '500', fontFamily: 'Inter-Regular' }}>Rework</Text>
                            </View>
                        </View>
                    }
                    <View style={{ flex: 1, paddingTop: 20, alignItems: 'center' }}>
                        <Text style={{ color: '#535D70', fontSize: moderateScale(10), fontFamily: 'Inter-Regular', marginTop: 5 }}>{item.date}</Text>
                    </View>
                </View>

                <View style={{ width: '100%', marginLeft: 20, marginRight: 20, borderBottomWidth: 1, borderBottomColor: 'lightgray', height: 2 }}></View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Header left={<HeaderTitle title="MyTASK" />} right={<HeaderSearch onPress={openSearch} />} />
            <View style={{ flex: 1, marginTop: 60, marginLeft: 20, marginRight: 20 }}>
                <View style={{ width: '100%', height: 30, marginTop: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text> {myTaskList.length} tasks available</Text>
                    </View>
                    <Image source={Images.images.sortAZ} style={{ alignSelf: 'flex-end' }} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', marginBottom: 5, padding: 10, marginTop: 10, borderRadius: 10 }}>
                    <FlatList
                        ListHeaderComponent={headerComponent}
                        data={myTaskList}
                        keyExtractor={({ id }) => `worklist-${id}`}
                        renderItem={renderItem}
                    />
                </View>

            </View>
        </SafeAreaView >
    );
};



export default MyTask;