import {ScrollView} from "react-native"
import {Flex} from "../../../lib/markup/markup";
import Loading from "../../../lib/static/Loading";
import TextMain from "../../../lib/text/TextMain";
import DeskRow from "./DeskRow";
import {useAppDispatch, useAppSelector} from "../../store/app";
import {useEffect} from "react";
import {desksLoad, desksStatus} from "../../store/desks";


export default function () {
    const {status, data: desks} = useAppSelector(state => state.desks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (status === desksStatus.initial) {
            dispatch(desksLoad())
        }
    }, [])

    if (status !== desksStatus.ready) return <Loading/>

    return <Flex>
        <ScrollView>
            <TextMain visible={!desks.length}>"добавить" - создать свою колоду</TextMain>
            <TextMain visible={!desks.length}>"поиск" - выбрать из существующих</TextMain>
            {desks.map((desk, key) => <DeskRow desk={desk} key={key}/>)}
        </ScrollView>
    </Flex>
}
