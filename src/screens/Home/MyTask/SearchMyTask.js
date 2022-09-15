import React, { useState, useRef, useCallback } from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView, Touchable } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { Styles, Colors } from 'themes'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import SubmitButton from 'components/Forms/SubmitButton'
import * as Helpers from 'utils/Helpers'
import Dropdown from 'components/Dropdown'
import Navbar from 'components/Navbar'
import FilterIcon from 'assets/icons/filter.svg'
import ExitIcon from 'assets/icons/exit.svg'
import SearchIcon from 'assets/icons/search.svg'
import ChevronDownIcon from 'assets/icons/chevron-down.svg'

export default function SearchMyTask({ navigation }) {
    const list = [{ id: 0, name: 'Item 1 A-1020' }, { id: 1, name: 'Item 2 A-1020' }, { id: 2, name: 'Item 3 A-1020' }, { id: 3, name: 'Item 4 A-1020' }];

    const [status, setStatus] = useState(null)
    const [group, setGroup] = useState(null)
    const statusRef = useRef({})
    const groupRef = useRef({})
    const [loading, setLoading] = useState(false)
    const [remoteDataSet, setRemoteDataSet] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)

    const handleDropdownSelected = (name, item) => {
        if (name == 'Status') {
            setStatus(item.name)
        } else if (name == 'Group') {
            setGroup(item.name)
        }
    }

    const handleDropdownReset = (name) => {
        if (name == 'Status') {
            statusRef.current.reset()
        } else if (name == 'Group') {
            groupRef.current.reset()
        }
    }

    const handleSearch = () => {
        console.log('Search')
        // navigation.navigate('TasklistSearchResult', {
        //     params: [
        //         { name: status },
        //         { name: group },
        //     ]
        // })
        navigation.push('SearchMyTaskResult');
    }

    const getSuggestions = useCallback(async (q) => {
        console.log("getSuggestions", q)
        if (typeof q !== "string" || q.length < 2) {
            setRemoteDataSet(null)
            return
        }
        setLoading(true)
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const items = await response.json()
        const suggestions = items.map((item) => ({
            id: item.id,
            title: item.title
        }))
        setRemoteDataSet(suggestions)
        setLoading(false)
    }, [])


    const renderSearchBox = () => {
        return (
            <AutocompleteDropdown
                dataSet={remoteDataSet}
                // closeOnBlur={true}
                // clearOnFocus={false}
                textInputProps={{
                    placeholder: "Start typing..."
                }}
                onSelectItem={setSelectedItem}
                loading={loading}
                onChangeText={getSuggestions}
                ChevronIconComponent={
                    <SearchIcon height={20} width={20} />
                }
                ClearIconComponent={
                    <ExitIcon height={13} width={13} />
                }
                textInputProps={{
                    placeholder: "Search",
                    autoCorrect: false,
                    autoCapitalize: "none",
                    style: {
                        backgroundColor: Colors.white,
                    }
                }}
                // debounce={600}
                rightButtonsContainerStyle={{
                    right: 8,
                    top: 5,
                    alignSelfs: "center",
                    backgroundColor: Colors.white
                }}
                inputContainerStyle={{
                    backgroundColor: Colors.white,
                    paddingVertical: 6,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: Colors.greyDark
                }}
            // inputHeight={50}
            />
        )
    }


    const renderFilterHeader = () => {
        return (
            <View style={[Styles.row, Styles.spaceBetween, Styles.alignCenter, Styles.paddingHorizontalSm]}>
                <View style={[Styles.row, Styles.alignCenter]}>
                    <FilterIcon />
                    <Spacer size="xs" />
                    <Text style={[Styles.textSecondary, Styles.textBold, styles.textFilter]}>Filter</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.resetText}>Reset All</Text>
                </TouchableOpacity>
            </View>
        )
    }


    const renderForm = () => {
        return (
            <View style={Styles.flex}>
                <View style={Styles.col}>
                    <Text>by Module</Text>
                    <Spacer size="xs" />
                    <Dropdown
                        dropdownRef={statusRef}
                        placeholder="Select Module"
                        name="Status"
                        data={list}
                        // selectedVal={disciple}
                        onDropdownReset={handleDropdownReset}
                        onDropdownSelected={handleDropdownSelected} />
                </View>
                <Spacer size="sm" />
                <View style={Styles.col}>
                    <Text>by Status</Text>
                    <Spacer size="xs" />
                    <Dropdown
                        dropdownRef={groupRef}
                        placeholder="Select Status"
                        name="Group"
                        data={list}
                        onDropdownReset={handleDropdownReset}
                        onDropdownSelected={handleDropdownSelected} />
                </View>
                <Spacer size="sm" />
                <SubmitButton title="Show Result" hasOpacity={true} onPress={handleSearch} />
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewContainer}>
            <View style={[Styles.flex, styles.container]}>
                <Navbar
                    title="Search"
                    containerStyles={Styles.navbarPlainContainer}
                    navigation={navigation} />
                <Spacer size="xs" />
                <View style={Styles.paddingHorizontalSm}>
                    {renderSearchBox()}
                    <Spacer size="md" />
                    {renderFilterHeader()}
                    <Spacer size="sm" />
                    {renderForm()}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1
    },
    container: {
        backgroundColor: Colors.white
    },
    resetText: {
        color: '#6559AA',
        fontSize: 16
    },
    textFilter: {
        fontSize: 18
    },
    dropdown: {
        backgroundColor: Colors.white
    },
    dropdownBtnContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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