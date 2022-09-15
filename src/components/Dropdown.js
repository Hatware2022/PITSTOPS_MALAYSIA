import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import SelectDropdown from "react-native-select-dropdown";
import { Styles, Colors } from 'themes'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import * as Helpers from 'utils/Helpers'
import ChevronDownIcon from 'assets/icons/chevron-down.svg'
import ExitIcon from 'assets/icons/exit.svg'
const DROPDOWN_ICON_SIZE = 13

export default function (props) {
    const { placeholder, dropdownRef, data, selectedVal, name, onDropdownSelected, onDropdownReset, containerStyle = {}, style = {} } = props

    return (
        <SelectDropdown
            defaultButtonText={placeholder ? placeholder : 'Select'}
            data={data}
            // defaultValueByIndex={1} // use default value by index or default value
            onSelect={(selItem, index) => {
                // console.log(selItem, index);
                onDropdownSelected(name, selItem)
            }}
            buttonStyle={[styles.dropdownBtn, { ...containerStyle }]}
            dropdownStyle={[styles.dropdown, { ...style }]}
            ref={dropdownRef}
            renderCustomizedButtonChild={(selItem, index) => {
                // console.log('selItem: ', selItem)
                let val = selItem

                if (selItem) {
                    if (typeof selItem === 'string') {
                        val = selItem
                    } else {
                        val = selItem.value
                    }
                }

                return (
                    <View style={styles.dropdownBtnContainer}>
                        <Text style={selItem ? styles.dropdownBtnTextActive : styles.dropdownBtnText}>
                            {val ? val : "Select"}
                        </Text>
                        {selItem ?
                            <TouchableOpacity
                                style={Styles.paddingXs}
                                onPress={() => {
                                    onDropdownReset(name)
                                }}>
                                <ExitIcon height={DROPDOWN_ICON_SIZE} width={DROPDOWN_ICON_SIZE} />
                            </TouchableOpacity> :
                            <ChevronDownIcon height={DROPDOWN_ICON_SIZE} width={DROPDOWN_ICON_SIZE} />}
                    </View>
                );
            }}
            renderCustomizedRowChild={(item, index) => {
                // console.log(typeof item)
                let val = item
                if (typeof item === 'string') {
                    val = item
                } else {
                    val = item.value
                }
                return (
                    <View style={styles.dropdownRowContainer}>
                        <Text style={styles.dropdownRowText}>{val}</Text>
                    </View>
                );
            }}
        />
    )
}

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: Colors.white,
    },
    dropdownBtnContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: 'relative'
        // paddingLeft: 0,
        // paddingRight: 0,
    },
    dropdownBtn: {
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: Colors.border,
        width: Helpers.ScreenSize
    },
    dropdownBtnText: {
        color: '#9F9EAE'
    },
    dropdownBtnTextActive: {
        color: Colors.secondary
    }
})