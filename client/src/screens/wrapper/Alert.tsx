import {Dimensions, Modal, Pressable, Text} from "react-native";
import {
    fCenter,
    flex1,
    isDesktop,
    jCenter,
    mt1,
    mt3,
    mv1,
    p2,
    shadow,
    fixWidth,
    mr1
} from "../../../const";
import {Col, Row} from "../../../lib/markup/markup";
import {H3} from "../../../lib/text/H";
import BtnPrimary from "../../../lib/buttons/BtnPrimary";
import BtnSecondary from "../../../lib/buttons/BtnSecondary";
import {AppContext, IAlertButton, initialAlert} from "../../../contexts";
import {useContext} from "react";


export const esc: IAlertButton = {
    title: 'отмена',
    primary: false
}


export function Alert() {
    const {alert, setAlert} = useContext(AppContext)

    function hide() {
        setAlert(initialAlert)
    }

    // @ts-ignore
    return <Modal animationType={'fade'} visible={alert.show} transparent={true}>
        <Pressable
            // @ts-ignore
            style={[flex1, {backgroundColor: 'rgba(0,0,0,0.2)', paddingTop: 90}, fCenter]}
            onPress={hide}
        >
            <Pressable style={[
                isDesktop() ? fixWidth(300) : fixWidth(Dimensions.get('window').width),
                {backgroundColor: '#ccc', minHeight: 100},
                shadow,
                p2
            ]}>
                <Row visible={Boolean(alert.title)}>
                    <H3 style={[flex1, jCenter]}>{alert.title}</H3>
                </Row>
                <Col visible={Boolean(alert.body)} style={[mv1]}>
                    <Text style={[mt1, flex1]}>
                        {alert.body}
                    </Text>
                </Col>
                <Row
                    style={[mt3, jCenter]}
                >
                    {alert.buttons ?
                        alert.buttons.map((btn: IAlertButton, key) => {
                            const props = {
                                key,
                                style: [flex1, key ? null : mr1],
                                title: btn.title,
                                onPress: () => {
                                    if (btn.onPress) btn.onPress()
                                    hide()
                                }
                            }
                            if (btn.primary) return <BtnPrimary {...props}/>
                            else return <BtnSecondary {...props}/>
                        })
                        :
                        <BtnSecondary title={'OK'} onPress={hide}/>
                    }
                </Row>
            </Pressable>
        </Pressable>
    </Modal>
}

