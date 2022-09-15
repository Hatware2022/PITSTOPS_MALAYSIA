import React from 'react'
import { Platform } from 'react-native'
import Colors from 'themes/colors'
import * as Helpers from 'utils/Helpers'

export default {
    container: {
        backgroundColor: "white",
        flex: 1
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.greyLight,
        padding: 10,
        flex: 1
    },
    primaryBtn: {
        backgroundColor: Colors.blueDarker,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    scrollWrapper: {
        flex: 1
    },
    avatarXxs: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: Colors.grey
    },
    avatarXs: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.grey
    },
    avatarSm: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: Colors.grey
    },
    avatarMd: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: Colors.grey
    },
    avatarLg: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: Colors.grey
    },
    bottomModalContainer: {
        justifyContent: 'flex-end',
        margin: 0
    },
    bottomModal: {
        backgroundColor: Colors.white,
        height: Helpers.ScreenHeight / 2
    },
    navbarContainer: {
        borderBottomWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        ...Platform.select({
            ios: {
                shadowColor: Colors.grey,
                shadowOffset: {
                    backgroundColor: Colors.white,
                    height: 3,
                    width: 3,
                    shadowOpacity: 0.4,
                    shadowRadius: 4
                }
            },
            android: {
                elevation: 2,
                backgroundColor: Colors.white,
                borderColor: Colors.greyLight
            }
        })
    },
    navbarPlainContainer: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 5
    },
    roundedBox: {
        // backgroundColor: Colors.card,
        backgroundColor: Colors.box,
        borderRadius: 5,
        padding: 2
    },
    roundedBoxLight: {
        backgroundColor: Colors.card,
        borderRadius: 5,
        padding: 2
    },
    roundedBoxPurple: {
        backgroundColor: Colors.purpleLight,
        borderRadius: 10,
        paddingVertical: 2,
    },
    horDivider: {
        height: 1,
        backgroundColor: Colors.box,
        width: Helpers.ScreenWidth * 0.85
    }
};
