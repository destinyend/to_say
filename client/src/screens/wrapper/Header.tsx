import {Image} from "react-native";
import {
    bgWhite,
    fCenter,
    headerHeight,
    jCenter,
    jEnd,
    lessDesktop, lessTablet,
    mr1, ph1,
    screenWidth
} from "../../../const";
import {FlexRow, PressRow, Row} from "../../../lib/markup/markup";
import Btn from "../../../lib/buttons/Btn";
import {useAppDispatch, useAppSelector} from "../../store/app";
import React, {useContext} from "react";
import {AppContext} from "../../../contexts";
import {esc} from "./Alert";
import FA from "../../../lib/static/FA";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";


export const Header = () => {
    const {data: user} = useAppSelector(state => state.user)
    const currentScreen = useAppSelector(state => state.navigation.current)


    return <Row style={[headerHeight, bgWhite, jCenter]}>
        <Row style={[screenWidth, lessDesktop() ? ph1 : null]}>
            <Logo/>
            <FlexRow style={[jEnd, fCenter]} visible={Boolean(user)}>
                <Edit/>
                <MyDesks currentScreen={currentScreen}/>
                <Logout/>
            </FlexRow>
        </Row>
    </Row>
}

const Logo = () => {
    const {navigation} = useContext(AppContext)
    const canGoBack = useAppSelector(state => state.navigation.canGoBack)
    return <PressRow style={[fCenter]} onPress={() => {
        navigation.goBack()
    }}>
        <FA icon={faArrowLeft} visible={canGoBack}/>
        <Image style={{height: 34, width: 35, marginVertical: 3}} source={require('../../../assets/icon.png')}/>
    </PressRow>
}

const Logout = () => {
    const dispatch = useAppDispatch()
    const {setAlert} = useContext(AppContext)

    return <Btn
        title={'выйти'}
        onPress={() => {
            setAlert({
                title: 'выйти из программы?',
                buttons: [
                    {
                        title: 'выйти',
                        primary: true,
                        onPress: () => {
                            dispatch({type: 'logout'})
                        }
                    },
                    esc
                ]
            })
        }}
    />
}

const Edit = () => {
    const {setAddCardMode} = useContext(AppContext)
    return <Btn
        style={mr1}
        title={'добавить'}
        onPress={setAddCardMode}
    />
}

function MyDesks({currentScreen}) {
    const {navigation} = useContext(AppContext)
    return <Btn
        visible={currentScreen !== 'Main' && !lessTablet()}
        style={mr1}
        title={'колоды'}
        onPress={() => navigation.navigate('Main')}
    />
}
