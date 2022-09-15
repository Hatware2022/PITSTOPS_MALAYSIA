import React, { useState, useCallback, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView, Image, Pressable } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import Modal from "react-native-modal"
import { useDispatch, useSelector } from 'react-redux'
import { Styles, Colors } from 'themes'
import { Text } from 'components/Text'
import * as Helpers from 'utils/Helpers'
import Api from 'api'
import Spacer from 'components/Spacer'
import Navbar from 'components/Navbar'
import ChevronDownIcon from 'assets/icons/chevron-down.svg'
import ChevronRightIcon from 'assets/icons/chevron-right.svg'
import MarkerIcon from 'assets/icons/marker.svg'
import UserIcon from 'assets/icons/user.svg'

export default function ({ navigation }) {
    const dispatch = useDispatch()
    const [collapseItems, setCollapseItems] = useState([])
    const [imgResponse, setImgResponse] = useState()
    const [isImgModalOpen, setImgModalOpen] = useState(false)
    const userStore = useSelector(state => state.root.user)
    const { user } = userStore
    const didMount = Helpers.useDidMount()
    // console.log("#USER: ", userStore, user)

    const handleImagePressed = useCallback((type, options) => {
        if (type === 'capture') {
            launchCamera(options, setImgResponse)
        } else {
            launchImageLibrary(options, setImgResponse)
        }
        setImgModalOpen(false)
    })

    // useEffect(() => {
    //     // Upload profile pic here
    //     if (imgResponse) {
    //         // console.log("imgResponse: ", imgResponse.assets[0].uri)
    //     }
    // }, [imgResponse])

    useEffect(() => {
        if (didMount) {
            // if (user && user.id) {
            //     dispatch(Api.fetchUserEvent(user.id))
            // }
            dispatch(Api.fetchUserEvent('415957c1-80af-4919-905c-b23353c74306'))
        }
    }, [])

    const actions = [
        {
            title: 'Take Picture',
            type: 'capture',
            options: {
                saveToPhotos: true,
                mediaType: 'photo',
                includeBase64: false
            }
        },
        {
            title: 'Select Image',
            type: 'library',
            options: {
                maxHeight: 200,
                maxWidth: 200,
                selectionLimit: 0,
                mediaType: 'photo',
                includeBase64: false
            }
        }
    ]

    const handleCollapsible = (role, idx) => {
        setCollapseItems(items => {
            let newItems = []
            let exist = items.find(elem => elem.roleID == role.roleID)
            if (exist) {
                newItems = items.filter(elem => elem.roleID != role.roleID)

                return newItems
            }
            return [...items, role]
        })
    }

    const renderImageModal = () => {
        return (
            <Modal isVisible={isImgModalOpen}
                onSwipeComplete={() => setImgModalOpen(!isImgModalOpen)}
                swipeDirection={['down']}
                style={Styles.bottomModalContainer}
                onBackdropPress={() => setImgModalOpen(false)}>
                <View style={[Styles.bottomModal, { height: Helpers.ScreenHeight / 4 }]}>
                    <View style={[Styles.col, Styles.justifyCenter, Styles.paddingMd]}>
                        <Spacer size="xs" />
                        {actions.map(({ title, type, options }, idx) => {

                            const fileName = type === 'capture' ? require('assets/icons/camera.png') :
                                require('assets/icons/gallery.png')
                            return (
                                <View key={idx}>
                                    <Pressable
                                        onPress={() => handleImagePressed(type, options)}
                                        style={({ pressed }) => [
                                            styles.button,
                                            Styles.row,
                                            {
                                                backgroundColor: pressed ? Colors.greyDark : Colors.greyLight,
                                            }
                                        ]}>
                                        <Image source={fileName} style={styles.icon} />
                                        <Spacer size="xs" />
                                        <Text>{title}</Text>
                                    </Pressable>
                                    {idx !== actions.length ? <Spacer size="md" /> : <View />}
                                </View>)
                        })}
                    </View>
                </View>
            </Modal>
        )
    }

    const renderProfile = () => {
        const { email, firstName, opuName, projectEvent, phoneNumber } = user

        return (
            <View style={Styles.col}>
                <View>
                    <Image source={require('assets/icons/avatar.png')} style={styles.avatar} />
                </View>
                {/* <Pressable onPress={() => setImgModalOpen(true)}>
                    {imgResponse && imgResponse.assets ?
                        <Image source={{ uri: imgResponse.assets[0].uri }} style={[styles.avatar, Styles.avatarMd]} /> :
                        <Image source={require('assets/icons/avatar.png')} style={styles.avatar} />}
                </Pressable> */}
                <Spacer size="sm" />
                {firstName ? <View>
                    <Text style={[Styles.textBold, Styles.textSecondary]}>Username</Text>
                    <Text style={Styles.text}>{firstName}</Text>
                </View> : <View />}
                {opuName ? <Spacer size="sm" /> : <View />}
                {opuName ?
                    <View>
                        <Text style={[Styles.textBold, Styles.textSecondary]}>OPU</Text>
                        <Text style={Styles.text}>{opuName}</Text>
                    </View> : <View />}
                {projectEvent ? <Spacer size="sm" /> : <View />}
                {projectEvent ?
                    <View>
                        <Text style={[Styles.textBold, Styles.textSecondary]}>Project Event</Text>
                        <Text style={Styles.text}>{projectEvent}</Text>
                    </View> : <View />}
                <Spacer size="sm" />
                {email ? <View>
                    <Text style={[Styles.textBold, Styles.textSecondary]}>Email</Text>
                    <Text style={Styles.text}>{email}</Text>
                </View> : <View />}
                {phoneNumber ? <Spacer size="sm" /> : <View />}
                {phoneNumber ?
                    <View>
                        <Text style={[Styles.textBold, Styles.textSecondary]}>Phone Number</Text>
                        <Text style={Styles.text}>{phoneNumber}</Text>
                    </View> : <View />}
            </View >
        )
    }

    const renderRoles = () => {
        const { userRoles } = user
        // console.log('#collapseItems: ', collapseItems)
        if (!userRoles || !userRoles.length) return <View />

        return (
            <View>
                <Text style={[Styles.textBold, Styles.textXl, Styles.textTitle]}>User Roles</Text>
                <Spacer size="xs" />
                {userRoles && userRoles.length > 0 && userRoles.map((role, idx) => {
                    let showItem = true
                    const findItem = collapseItems.find(item => item.roleID == role.roleID)

                    if (findItem) {
                        showItem = false
                    }

                    return (
                        <View key={idx}>
                            <View style={[Styles.row, Styles.alignCenter]}>
                                <Text style={[Styles.textMd, Styles.textBold, Styles.textSecondary]}>{role.phaseName}</Text>
                                <Spacer size="sm" />
                                <TouchableOpacity onPress={() => handleCollapsible(role, idx)} style={Styles.paddingSm}>
                                    <ChevronDownIcon />
                                </TouchableOpacity>
                            </View>
                            {showItem ?
                                <View style={[Styles.row]}>
                                    <View style={Styles.col}>
                                        <View style={[Styles.row, Styles.alignCenter]}>
                                            <UserIcon />
                                            <Spacer size="xs" />
                                            <Text style={[Styles.textSecondary, Styles.textMd, Styles.textGreyLighter]}>Role</Text>
                                        </View>
                                        <View>
                                            <Text style={[Styles.textSecondary, Styles.textMd]}>{role.roleName}</Text>
                                        </View>
                                    </View>
                                    <Spacer size="md" />
                                    <View style={[Styles.col]}>
                                        <View style={[Styles.row, Styles.alignCenter]}>
                                            <MarkerIcon />
                                            <Spacer size="xs" />
                                            <Text style={[Styles.textSecondary, Styles.textSm, Styles.textGreyLighter]}>Location</Text>
                                        </View>
                                        <View style={[Styles.row]}>
                                            {role.locations && role.locations.map((loc, locIdx) =>
                                                <View key={locIdx} style={[Styles.row, Styles.itemCenter]}>
                                                    {loc.location && loc.location.name ? <Text style={[Styles.textSecondary, Styles.textMd]}>{loc.location.name}</Text> : <View />}
                                                    {loc.subLocations ? <ChevronRightIcon width={8} height={8} /> : <View />}
                                                    {loc.subLocations && loc.subLocations.map((subLoc, subLocIdx) =>
                                                        <View key={subLocIdx} style={[Styles.row, Styles.itemCenter, Styles.textWrap]}>
                                                            {subLoc.subLocation1 ? <Text style={[Styles.textSecondary, Styles.textMd]}>{subLoc.subLocation1.name}</Text> : <View />}
                                                            {subLoc.subLocation2 ? <ChevronRightIcon width={8} height={8} /> : <View />}
                                                            {subLoc.subLocation2 ? <Text style={[Styles.textSecondary, Styles.textMd]}>{subLoc.subLocation2.name}</Text> : <View />}
                                                        </View>
                                                    )}
                                                </View>
                                            )}

                                        </View>
                                    </View>
                                </View> : <View />}
                            {((idx + 1) != userRoles.length) ? <Spacer size="sm" /> : <View />}
                        </View>
                    )
                })}
            </View>
        )
    }

    console.log("#USER: ", user)

    return (
        <ScrollView
            // scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={false}>
            <View style={[Styles.container, Styles.paddingMd, Styles.col]}>
                {renderImageModal()}
                <Navbar
                    title="User Profile"
                    navigation={navigation}
                    containerStyles={Styles.navbarPlainContainer} />
                <Spacer size="sm" />
                <View style={styles.section}>
                    {renderProfile()}
                    <Spacer size="Md" />
                    {renderRoles()}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    section: {
        paddingLeft: 30
    },
    avatar: {
        width: scale(100),
        height: scale(100)
    },
    icon: {
        width: scale(20),
        height: scale(20)
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10
    }
})
