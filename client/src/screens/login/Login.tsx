import {fCenter, fieldWidth, jCenter, mb4, mv1} from "../../../const";
import React, {useContext, useEffect, useState} from "react";
import Loading from "../../../lib/static/Loading";
import {Col, Flex} from "../../../lib/markup/markup";
import TextField from "../../../lib/fields/TextField";
import TextMain from "../../../lib/text/TextMain";
import BtnPrimary from "../../../lib/buttons/BtnPrimary";
import {BtnTimer} from "../../../lib/buttons/BtnTimer";
import {H3} from "../../../lib/text/H";
import {AppContext} from "../../../contexts";
import {AuthStatus, requestPassword, userLogin, userSelf} from "../../store/user";
import {useAppDispatch, useAppSelector} from "../../store/app";
import {LOGIN_REDIRECT} from "../../store/navigation";


export default function () {
    const {navigation} = useContext(AppContext)
    const {authStatus, emailMessage, codeMessage, canPasswordRequestInSeconds}
        = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [username, setUsername] = useState('')
    const [code, setCode] = useState('')

    function requestCode() {
        dispatch(requestPassword(username))
    }

    function login() {
        dispatch(userLogin({username, password: code}))
    }

    useEffect(() => {
        switch (authStatus) {
            case AuthStatus.initial:
                dispatch(userSelf())
                break;
            case AuthStatus.authorised:
                dispatch(userSelf())
                navigation.navigate(LOGIN_REDIRECT)
                break;
        }

    }, [authStatus])

    if ([AuthStatus.initial, AuthStatus.loading].includes(authStatus)) return <Loading/>

    return <Flex>
        <Flex style={[fCenter, jCenter]}>
        <H3 style={mb4}>автоматическая регистрация</H3>
        <TextField
            style={mv1}
            placeholder={'e-mail'}
            onChange={setUsername}
            value={username}
            onKey={{Enter: requestCode}}
        />
        <TextMain style={[emailMessage?.style, mv1]} visible={!!emailMessage}>{emailMessage?.text}</TextMain>
        <Col visible={authStatus === AuthStatus.codeRequesting}>
            <TextMain>запрос кода авторизации...</TextMain>
            <Loading/>
        </Col>
        <TextField
            style={mv1}
            visible={authStatus === AuthStatus.codeRequested}
            value={code}
            placeholder={'введите код здесь'}
            onChange={setCode}
            onKey={{Enter: requestCode}}
            keyBoardType={'numeric'}
        />
        <TextMain
            style={[codeMessage?.style, mv1]}
            visible={!!codeMessage}
        >
            {codeMessage?.text}
        </TextMain>
        <BtnPrimary
            visible={authStatus === AuthStatus.unauthorized}
            style={[fieldWidth, mv1]}
            title={'выслать код'}
            onPress={requestCode}
        />
        <BtnTimer
            startSeconds={canPasswordRequestInSeconds}
            visible={authStatus === AuthStatus.codeRequested}
            style={[fieldWidth, mv1]}
            onPress={requestCode}
            endMessage={'выслать повторно'}
        />
        <BtnPrimary
            style={mv1}
            visible={authStatus === AuthStatus.codeRequested}
            title={'войти'}
            onPress={login}
        />
        </Flex>
        <Flex>

        </Flex>
    </Flex>
}



