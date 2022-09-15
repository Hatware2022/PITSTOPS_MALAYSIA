import React, { useState, useRef, useCallback } from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView, Touchable } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { useSelector, useDispatch } from 'react-redux'
import { Styles, Colors } from 'themes'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import SubmitButton from 'components/Forms/SubmitButton'
import * as Helpers from 'utils/Helpers'
import Api from 'api'
import Dropdown from 'components/Dropdown'
import Navbar from 'components/Navbar'
import FilterIcon from 'assets/icons/filter.svg'
import ExitIcon from 'assets/icons/exit.svg'
import SearchIcon from 'assets/icons/search.svg'

export default function body({ navigation }) {
    const statusRef = useRef({})
    const groupRef = useRef({})
    const [keyword, setKeyword] = useState(null)
    const [status, setStatus] = useState(null)
    const [group, setGroup] = useState(null)
    const [loading, setLoading] = useState(false)
    const [remoteDataSet, setRemoteDataSet] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const dispatch = useDispatch()
    const worklistStore = useSelector(state => state.worklist)
    const tasklistFilter = useSelector(state => state.tasklistFilter)

    const handleDropdownSelected = (name, item) => {
        let val = item

        if (typeof item === 'string') {
            val = { key: item, value: item }
        }
        if (name == 'Group') {
            setGroup({ ...val, name: 'group' })
        } else {
            setStatus({ ...val, name: 'status' })
        }
    }

    const handleDropdownReset = (name) => {
        if (name == 'Status') {
            statusRef.current.reset()
            setStatus(null)
        } else {
            groupRef.current.reset()
            setGroup(null)
        }
    }

    const handleSearch = () => {
        let params = [
            keyword && { ...keyword },
            group && { ...group },
            status && { ...status }
        ]
        params = params.filter(item => item != null)

        navigation.navigate('TasklistSearchResult', {
            queryParams: params
        })
    }

    fetchTasklist = async () => {
        const { worklist } = worklistStore

        let params = {
            // phaseId: firstPhase.key,
            worklistId: worklist?.id,
            pageIndex: 1,
            pageSize: Helpers.PAGE_SIZE
        }

        // console.log("##SEARCH PARAMS: ", params)

        dispatch(Api.fetchTasklistEvent(params))

        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            console.log('Previous screen does not exist')
        }
    }

    const renderSearchBox = () => {
        return (
            <AutocompleteDropdown
                // dataSet={remoteDataSet}
                // closeOnBlur={true}
                clearOnFocus={false}
                useFilter={false}
                textInputProps={{
                    placeholder: "Start typing..."
                }}
                onSelectItem={setSelectedItem}
                loading={loading}
                // onChangeText={getSuggestions}
                ChevronIconComponent={
                    <SearchIcon height={20} width={20} />
                }
                ClearIconComponent={
                    <ExitIcon height={13} width={13} />
                }
                onChangeText={(val) => {
                    setKeyword({ name: 'keyword', key: val, value: val })
                }}
                onClear={() => setKeyword(null)}
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
        const { groups = [], status = [] } = tasklistFilter

        return (
            <View style={Styles.flex}>
                <View style={Styles.col}>
                    <Text>by Status</Text>
                    <Spacer size="xs" />
                    <Dropdown
                        dropdownRef={statusRef}
                        placeholder="Select Status"
                        name="Status"
                        data={status}
                        // selectedVal={disciple}
                        onDropdownReset={handleDropdownReset}
                        onDropdownSelected={handleDropdownSelected} />
                </View>
                <Spacer size="sm" />
                <View style={Styles.col}>
                    <Text>by Group</Text>
                    <Spacer size="xs" />
                    <Dropdown
                        dropdownRef={groupRef}
                        placeholder="Select Group"
                        name="Group"
                        data={groups}
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
                    navigation={navigation}
                    handleGoBack={() => fetchTasklist()} />
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