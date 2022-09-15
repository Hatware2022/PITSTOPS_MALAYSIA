import React from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from 'screens/Login/Login';
import LoginSelection from 'screens/Login/LoginSelection';
import Home from 'screens/Home/Home/Home';
import Dashboard from 'screens/Home/Dashboard/Dashboard';
import Profile from 'screens/Home/Profile';
import WorklistIndex from 'screens/Home/Worklist';
import WorklistSearch from 'screens/Home/Worklist/Search';
import WorklistSearchResult from 'screens/Home/Worklist/SearchResult';
import TasklistIndex from 'screens/Home/Tasklist';
import TasklistSearch from 'screens/Home/Tasklist/Search';
import TasklistSearchResult from 'screens/Home/Tasklist/SearchResult';
import TasklistDetail from 'screens/Home/Tasklist/Detail';
import Workshop from 'screens/Home/Workshop';
import Saved from 'screens/Home/Saved/Saved';
import MyTask from 'screens/Home/MyTask/MyTask';
import SearchMyTask from 'screens/Home/MyTask/SearchMyTask';
import SearchMyTaskResult from 'screens/Home/MyTask/SearchMyTaskResult';
import Notification from 'screens/Home/Notification/Notification';
import { Styles, Colors } from 'themes';
import * as Images from 'utils/Images';
import { useSelector, useDispatch } from 'react-redux'
import { Image } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import SavedIndex from 'screens/Home/Saved';
import SavedWorklistSearch from 'screens/Home/Saved/Search';
import SavedWorklistSearchResult from 'screens/Home/Saved/SearchResult';
import { internetStatusChanged } from '../store/actions/UserAction';
import { offlineModeChanged } from '../store/actions/OfflineAction';

const RootStack = createStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SavedStack = createNativeStackNavigator();
const MyTaskStack = createNativeStackNavigator();
const NotificationStack = createNativeStackNavigator();
const WorklistStack = createStackNavigator();
const TasklistStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator screenOptions={{ headerShown: false }} >
        <HomeStack.Screen name="Homes" component={Home} />
        <HomeStack.Screen name="Dashboard" component={Dashboard} />
        <HomeStack.Screen name="Worklist" component={WorklistStackScreen} />
        <HomeStack.Screen name="Workshop" component={Workshop} />
    </HomeStack.Navigator>
)

const SavedStackScreen = () => (
    <SavedStack.Navigator screenOptions={{ headerShown: false }}>
        <SavedStack.Screen name="SavedIndex" component={SavedIndex} />
        <SavedStack.Screen name="SavedWorklistSearch" component={SavedWorklistSearch} />
        <SavedStack.Screen name="SavedWorklistSearchResult" component={SavedWorklistSearchResult} />
    </SavedStack.Navigator>
)

const MyTaskStackScreen = () => (
    <MyTaskStack.Navigator screenOptions={{ headerShown: false }}>
        <MyTaskStack.Screen name="MyTask" component={MyTask} />
        <MyTaskStack.Screen name="SearchMyTask" component={SearchMyTask} />
        <MyTaskStack.Screen name="SearchMyTaskResult" component={SearchMyTaskResult} />
    </MyTaskStack.Navigator>
)

const NotificationStackScreen = () => (
    <NotificationStack.Navigator screenOptions={{ headerShown: false }}>
        <NotificationStack.Screen name="Notifications" component={Notification} />
    </NotificationStack.Navigator>
)

const WorklistStackScreen = () => {
    return (
        <WorklistStack.Navigator initialRouteName="WorklistIndex" screenOptions={{ headerShown: false }} >
            <WorklistStack.Screen name="WorklistIndex" component={WorklistIndex} />
            <WorklistStack.Screen name="WorklistSearch" component={WorklistSearch} />
            <WorklistStack.Screen name="WorklistSearchResult" component={WorklistSearchResult} />
        </WorklistStack.Navigator>
    )
}

const TasklistStackScreen = () => {
    return (
        <TasklistStack.Navigator initialRouteName="TasklistIndex" screenOptions={{ headerShown: false }} >
            <TasklistStack.Screen name="TasklistIndex" component={TasklistIndex} />
            <TasklistStack.Screen name="TasklistSearch" component={TasklistSearch} />
            <TasklistStack.Screen name="TasklistSearchResult" component={TasklistSearchResult} />
            <TasklistStack.Screen name="TasklistDetail" component={TasklistDetail} />
        </TasklistStack.Navigator>
    )
}

const TabNavigator = () => {
    return (
        <Tabs.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#80D0CE',
            tabBarStyle: { backgroundColor: Colors.primary, height: 60, paddingBottom: 10 },
            tabBarItemStyle: { fontFamily: 'Inter-Regular' },
            tabBarIcon: ({ focused, color, size }) => {
                let homeIcon = focused ? Images.images.homeTabSelected : Images.images.homeTab;
                let savedIcon = focused ? Images.images.savedTabSelected : Images.images.savedTab;
                let myTaskIcon = focused ? Images.images.myTaskTabSelected : Images.images.myTaskTab;
                let notificationIcon = focused ? Images.images.notificationTab : Images.images.notificationTab;
                if (route.name === 'Home') {
                    return <Image source={homeIcon} />
                } else if (route.name === 'Saved') {
                    return <Image source={savedIcon} />
                } else if (route.name === 'MyTasks') {
                    return <Image source={myTaskIcon} />
                } else if (route.name === 'Notification') {
                    return <Image source={notificationIcon} />
                }
            }
        })}>
            <Tabs.Screen name="Home" component={HomeStackScreen} />
            <Tabs.Screen name="Saved" component={SavedStackScreen} />
            <Tabs.Screen name="MyTasks" component={MyTaskStackScreen} />
            <Tabs.Screen name="Notification" component={NotificationStackScreen} />
        </ Tabs.Navigator>
    )
}

export default Routes = () => {

    const dispatch = useDispatch();
    const internetChanged = flag => dispatch(internetStatusChanged(flag));
    const offlineChanged = flag => dispatch(offlineModeChanged(flag));

    function checkInternetConnectivity() {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            internetChanged(state.isConnected);
            offlineChanged(state.isConnected);
        });
    }

    // Unsubscribe

    React.useEffect(() => {
        checkInternetConnectivity();
    })
    const isLogged = useSelector(state => state.root.user.isLogged);

    if (!isLogged) {
        return (
            <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                <AuthStack.Screen name="Login" component={Login} />
                <AuthStack.Screen name="LoginSelection" component={LoginSelection} />
            </AuthStack.Navigator>
        )
    } else {
        return (
            <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="App" >
                <RootStack.Screen name="App" component={TabNavigator} />
                <RootStack.Screen name="Profile" component={Profile} />
                <RootStack.Screen name="Tasklist" component={TasklistStackScreen} />
                {/* <RootStack.Screen name="SearchMyTask" component={SearchMyTask} /> */}
            </RootStack.Navigator>
        )
    }

}
