import {Header} from "./Header";
import {
    background,
    bodyHeight,
    fCenter,
    headerPaddingTop,  mt2,
    p2,
    screenWidth,
    shadow
} from "../../../const";
import React, {useState} from "react";
import {Flex, Row} from "../../../lib/markup/markup";
import {View} from "react-native";
import Editor from "./Editor";
import {appSlice, useAppDispatch, useAppSelector} from "../../store/app";
import {AppContext, initialAlert} from "../../../contexts";
import {screens} from "./screens";
import {desksSlice} from "../../store/desks";
import {navigationSlice} from "../../store/navigation";

export default function () {
    const {data: user} = useAppSelector(state => state.user)
    const [alert, setAlert] = useState(initialAlert)
    const dispatch = useAppDispatch()
    const {data: desks, currentDeskId, foundDesks} = useAppSelector(state => state.desks)
    const {data: cards, currentCardId} = useAppSelector(state => state.cards)
    const {current: currentScreen} = useAppSelector(state => state.navigation)

    function getObjectIndex(array, id) {
        if (!array) return -1
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) return i
        }
        return -1
    }

    function getCurrentDesk(useFoundDesks = false) {
        const array = useFoundDesks ? foundDesks : desks
        const index = getObjectIndex(array, currentDeskId)
        if (index !== -1) return array[index]
        return null
    }

    function getCurrentCard() {
        const index = getObjectIndex(cards, currentCardId)
        if (index !== -1) return cards[index]
        return null
    }

    function setAddCardMode() {
        const desk = getCurrentDesk()
        if (desk && desk.owner === user.id) {
            dispatch(appSlice.actions.addCard())
            return
        }
        for (let desk of desks) {
            if (desk.owner === user.id) {
                dispatch(desksSlice.actions.setCurrentDesk(desk.id))
                dispatch(appSlice.actions.addCard())
                return
            }
        }
        dispatch(appSlice.actions.addDesk())
    }

    const Screen = screens.filter(screen => screen.name === currentScreen)[0].Component

    return <AppContext.Provider
        value={{
        getCurrentDesk,
        getCurrentCard,
        alert,
        setAlert: (args) => setAlert({show: true, ...args}),
        setAddCardMode,
        navigation: {
            navigate: (url: string) => dispatch(navigationSlice.actions.navigate(url)),
            goBack: () => dispatch(navigationSlice.actions.goBack())
        }
    }}>
        <Flex>
            <Row style={headerPaddingTop}/>
            <Header/>

            <Flex style={[
                fCenter,
                mt2,
            ]}>
                <View style={[bodyHeight, screenWidth, shadow, p2, background.body]}>
                            <Screen/>
                </View>

            </Flex>
            <Editor/>
        </Flex>

    </AppContext.Provider>
}

