import React, { useState, useRef, useCallback } from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { Styles, Colors } from 'themes'
import { Text } from 'components/Text'
import Spacer from 'components/Spacer'
import SubmitButton from 'components/Forms/SubmitButton';
import * as Helpers from 'utils/Helpers'
import Api from 'api'
import Dropdown from 'components/Dropdown'
import Navbar from 'components/Navbar'
import FilterIcon from 'assets/icons/filter.svg'
import ExitIcon from 'assets/icons/exit.svg'
import SearchIcon from 'assets/icons/search.svg'

export default function body({ navigation }) {
    const [discipline, setDiscipline] = useState(null)
    const [workCategory, setWorkCategory] = useState(null)
    const [location, setLocation] = useState(null)
    const [subLocation1, setSubLocation1] = useState(null)
    const [subLocation2, setSubLocation2] = useState(null)
    const discipleRef = useRef({})
    const workCategoryRef = useRef({})
    const locationRef = useRef({})
    const subLoc1Ref = useRef({})
    const subLoc2Ref = useRef({})
    const [loading, setLoading] = useState(false)
    const [remoteDataSet, setRemoteDataSet] = useState(null)
    const worklist = useSelector(state => state.worklist)
    const { phases = [] } = worklist
    const [phase, setPhase] = useState(phases[0])
    const user = useSelector(state => state.root.user)
    const [keyword, setKeyword] = useState(null)
    const dispatch = useDispatch()
    const worklistFilter = useSelector(state => state.worklistFilter)
    const { disciplines = [], workCategories = [], locations = [], subLocation1s = [],
        subLocation2s = [] } = worklistFilter

    const handleDropdownSelected = (name, item) => {
        let val = item

        if (typeof item === 'string') {
            val = { key: item, value: item }
        }
        // console.log("ITEM:", item)
        if (name == 'Disciple') {
            setDiscipline({ ...val, name: 'disciplineId' })
        } else if (name == 'WorkCategory') {
            setWorkCategory({ ...val, name: 'workCategory' })
        } else if (name == 'Location') {
            setLocation({ ...val, name: 'locationId' })
        } else if (name == 'SubLoc1') {
            setSubLocation1({ ...val, name: 'subLocation1Id' })
        } else if (name == 'SubLoc2') {
            setSubLocation2({ ...val, name: 'subLocation2Id' })
        }
    }

    const handleDropdownReset = (name) => {
        if (name == 'Disciple') {
            discipleRef.current.reset()
            setDiscipline(null)
        } else if (name == 'WorkCategory') {
            workCategoryRef.current.reset()
            setWorkCategory(null)
        } else if (name == 'Location') {
            locationRef.current.reset()
            setLocation(null)
        } else if (name == 'SubLoc1') {
            subLoc1Ref.current.reset()
            setSubLocation1(null)
        } else if (name == 'SubLoc2') {
            subLoc2Ref.current.reset()
            setSubLocation2(null)
        }
    }

    const handleSearch = () => {
        let params = [
            keyword && { ...keyword },
            discipline && { ...discipline },
            workCategory && { ...workCategory },
            location && { ...location },
            subLocation1 && { ...subLocation1 },
            subLocation2 && { ...subLocation2 }
        ]
        params = params.filter(item => item != null)

        // console.log('handleSearch PARAMS:', params)
        navigation.navigate('WorklistSearchResult', {
            queryParams: params
        })
    }

    fetchWorklist = async () => {
        const { selectedEventId } = user

        let params = {
            // eventId: '700BDC54-324A-42B6-9A88-BB1AD6942579',
            phaseId: phase.phaseId,
            eventId: selectedEventId,
            pageIndex: 1,
            pageSize: Helpers.PAGE_SIZE
        }

        // console.log("##SEARCH PARAMS: ", params)

        dispatch(Api.fetchWorklistEvent(params))

        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            console.log('Previous screen does not exist')
        }
    }

    const resetAll = () => {
        discipleRef.current.reset()
        setDiscipline(null)
        workCategoryRef.current.reset()
        setWorkCategory(null)
        locationRef.current.reset()
        setLocation(null)
        subLoc1Ref.current.reset()
        setSubLocation1(null)
        subLoc2Ref.current.reset()
        setSubLocation2(null)
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
                // onSelectItem={setKeyword}
                loading={loading}
                onChangeText={(val) => {
                    setKeyword({ name: 'keyword', key: val, value: val })
                }}
                ChevronIconComponent={
                    <SearchIcon height={20} width={20} />
                }
                ClearIconComponent={
                    <ExitIcon height={13} width={13} />
                }
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
                <TouchableOpacity onPress={resetAll}>
                    <Text style={styles.resetText}>Reset All</Text>
                </TouchableOpacity>
            </View>
        )
    }


    const renderForm = () => {
        // console.log('FILTERS:', discipline)
        return (
            <View style={Styles.flex}>
                <View style={Styles.col}>
                    <Text>by Disciple1</Text>
                    <Spacer size="xs" />
                    <Dropdown
                        dropdownRef={discipleRef}
                        placeholder="Select Disciple"
                        name="Disciple"
                        data={disciplines}
                        // selectedVal={disciple}
                        onDropdownReset={handleDropdownReset}
                        onDropdownSelected={handleDropdownSelected} />
                </View>
                <Spacer size="sm" />
                <View style={Styles.col}>
                    <Text>by Work Category</Text>
                    <Spacer size="xs" />
                    <Dropdown
                        dropdownRef={workCategoryRef}
                        placeholder="Select Work Category"
                        name="WorkCategory"
                        data={workCategories}
                        onDropdownReset={handleDropdownReset}
                        onDropdownSelected={handleDropdownSelected} />
                </View>
                <Spacer size="sm" />
                <View style={Styles.col}>
                    <Text>by Area ( Location )</Text>
                    <Spacer size="xs" />
                    <Dropdown
                        dropdownRef={locationRef}
                        placeholder="Select Area"
                        name="Location"
                        data={locations}
                        onDropdownReset={handleDropdownReset}
                        onDropdownSelected={handleDropdownSelected} />
                </View>
                <Spacer size="sm" />
                <View style={Styles.col}>
                    <Text>by Unit ( Sub Loc 1 )</Text>
                    <Spacer size="xs" />
                    <Dropdown
                        dropdownRef={subLoc1Ref}
                        placeholder="Select Unit"
                        name="SubLoc1"
                        data={subLocation1s}
                        onDropdownReset={handleDropdownReset}
                        onDropdownSelected={handleDropdownSelected} />
                </View>
                <Spacer size="sm" />
                <View style={Styles.col}>
                    <Text>by Unit ( Sub Loc 2)</Text>
                    <Spacer size="xs" />
                    <Dropdown
                        dropdownRef={subLoc2Ref}
                        placeholder="Select Zone"
                        name="SubLoc2"
                        data={subLocation2s}
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
                    handleGoBack={() => fetchWorklist()} />
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