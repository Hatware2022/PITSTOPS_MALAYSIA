import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import RNRadioButton from 'vendors/radio-button';
import { Styles, Colors } from 'themes'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import Modal from "react-native-modal"
import ExitButton from 'components/Buttons/ExitButton'

export default function body({ toggleSortModal, handleSortSelected, handleSortBySelected, sortBy, isModalOpen }) {
    const [sortActive, setSortActive] = useState(0)
    const [filters, setFilter] = useState([
        {
            id: 0,
            label: 'Area (Location)',
            value: 'location'
        },
        {
            id: 1,
            label: 'Unit (Sub Loc 1)',
            value: 'subLocation1'
        },
        {
            id: 2,
            label: 'Zone (Sub Loc 2)',
            value: 'subLocation2'
        },
        {
            id: 3,
            label: 'Work Category',
            value: 'workCategory'
        },
        {
            id: 4,
            label: 'Tag No',
            value: 'equipmentNo'
        },
        {
            id: 5,
            label: 'Progress',
            value: 'percentageUpdate'
        }
    ])
    const [activeFilter, setActiveFilter] = useState(0)

    const sortToggle = () => {
        return (
            <View style={[Styles.row, styles.toggleSortContainer]}>
                <TouchableOpacity
                    style={[styles.toggleSortLeftContainer, sortBy === 'asc' ? { backgroundColor: Colors.primary } : { backgroundColor: Colors.white }]}
                    onPress={() => handleSortBySelected('asc')}>
                    <Text style={[Styles.textMd, sortBy === 'asc' ? Styles.textWhite : Styles.textSecondary]}>A to Z</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleSortRightContainer, sortBy === 'desc' ? { backgroundColor: Colors.primary } : { backgroundColor: Colors.white }]}
                    onPress={() => handleSortBySelected('desc')}>
                    <Text style={[Styles.textMd, sortBy === 'desc' ? Styles.textWhite : Styles.textSecondary]}>Z to A</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderFilters = () => {
        // console.log(activeFilter)
        return (
            <View>
                <RNRadioButton
                    box={false}
                    activeBorderColor={Colors.greyLight}
                    boxStyle={{ paddingVertical: 5, borderColor: Colors.greyLight }}
                    activeColor={Colors.primary}
                    textColor={Colors.secondary}
                    circleSize={25}
                    data={filters}
                    spacerWidth={20}
                    selectedBtn={(e) => {
                        setActiveFilter(e)
                        if (handleSortSelected) {
                            handleSortSelected(e)
                        }
                        toggleSortModal(e)
                    }}
                />
            </View>
        )
    }

    const modalBody = () => {
        return (
            <View style={Styles.bottomModal}>
                <ScrollView>
                    <View style={[Styles.col, Styles.paddingMd]}>
                        <View style={Styles.alignEnd}>
                            <ExitButton handleBackPressed={() => toggleSortModal(false)} />
                        </View>
                        <Spacer size="sm" />
                        <View style={[Styles.col, Styles.paddingHorizontalLg]}>
                            <Text style={[Styles.textBold, Styles.textXl]}>Sort by</Text>
                            <Spacer size="sm" />
                            {sortToggle()}
                            <Spacer size="sm" />
                            {renderFilters()}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }


    return (
        <Modal isVisible={isModalOpen}
            onSwipeComplete={toggleSortModal}
            swipeDirection={['down']}
            style={Styles.bottomModalContainer}
            onBackdropPress={() => toggleSortModal(false)}>
            {modalBody()}
        </Modal>
    )
}

const toggleSortStyles = {
    borderColor: Colors.greyLight,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
}

const styles = StyleSheet.create({
    toggleSortContainer: {},
    toggleSortLeftContainer: {
        ...toggleSortStyles,
        borderLeftWidth: 0.5,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20
    },
    toggleSortRightContainer: {
        ...toggleSortStyles,
        borderRightWidth: 0.5,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20
    }
})