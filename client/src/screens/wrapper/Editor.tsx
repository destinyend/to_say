import EditCard from "./EditCard";
import EditDesk from "./EditDesk";
import {Dimensions, Modal, Pressable, View, StyleSheet, Keyboard} from "react-native";
import Btn from "../../../lib/buttons/Btn";
import {
    borderTable,
    fCenter,
    fixHeight,
    fixWidth,
    flex1, headerHeight,
    isDesktop,
    jEnd, lessTablet,
    m1,
    mt2,
    p2,
    shadow,
    white
} from "../../../const";
import {appSlice, editorState, useAppDispatch, useAppSelector} from "../../store/app";
import {Flex, Row} from "../../../lib/markup/markup";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Tab} from "../../../lib/markup/Tab";
import {AppContext} from "../../../contexts";
import React, {useContext, useEffect, useState} from "react";
import {Alert} from "./Alert";


export default function () {
    const user = useAppSelector(state => state.user.data)
    const dispatch = useAppDispatch()
    const {data: desks} = useAppSelector(state => state.desks)
    const {editor} = useAppSelector(state => state.app)
    const {setAddCardMode} = useContext(AppContext)
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        )
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        )
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    function closeEditor() {
        dispatch(appSlice.actions.editorClose())
    }

    function setAddDeskMode() {
        dispatch(appSlice.actions.addDesk())
    }

    if (!user) return null
    return <View>
        <Modal animationType={'fade'} visible={editor !== editorState.closed} transparent={true}>
            <Pressable
                // @ts-ignore
                style={StyleSheet.flatten([
                    flex1,
                    {
                        backgroundColor: 'rgba(0,0,0,0.25)',
                        paddingTop: lessTablet() ? headerHeight.height : headerHeight.height + 20
                    },
                    fCenter
                ])}
                onPress={closeEditor}
            >
                <Pressable style={[
                    isDesktop() ? fixWidth(600) : fixWidth(Dimensions.get('window').width),
                    fixHeight(
                        isDesktop() ?
                            500 :
                            Dimensions.get('window').height * (isKeyboardVisible ? 0.55 : 0.8))
                    ,
                    {backgroundColor: '#ccc'},
                    shadow
                ]}>
                    <Row style={[jEnd, m1]}>
                        <Btn title={faTimes} onPress={closeEditor}/>
                    </Row>
                    <Flex style={[p2, white]}>
                        <Row
                            style={mt2}
                            visible={[editorState.addCard, editorState.addDesk].includes(editor)}
                        >
                            <Tab
                                active={editor === editorState.addCard}
                                title={'карта'}
                                style={flex1}
                                onPress={setAddCardMode}
                                visible={desks?.length > 0}
                            />
                            <Tab
                                style={flex1}
                                active={editor === editorState.addDesk}
                                title={'колода'}
                                onPress={setAddDeskMode}
                            />
                        </Row>
                        <Flex style={[
                            [editorState.addCard, editorState.addDesk].includes(editor) ?
                                borderTable
                                :
                                null,
                            {borderTopColor: 'transparent'}
                        ]}>
                            {[editorState.addCard, editorState.editCard].includes(editor) ?
                                <EditCard/>
                                :
                                <EditDesk/>
                            }
                        </Flex>
                    </Flex>
                </Pressable>
            </Pressable>
        </Modal>
        <Alert/>
    </View>
}


