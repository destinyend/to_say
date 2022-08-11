import {ScrollView} from "react-native";
import {useContext, useEffect} from "react";
import {AppContext} from "../../../contexts";
import {PressRow} from "../../../lib/markup/markup";
import TextMain from "../../../lib/text/TextMain";
import {borderTable, flex1} from "../../../const";
import {appSlice, useAppDispatch, useAppSelector} from "../../store/app";
import Loading from "../../../lib/static/Loading";
import {cardsLoad, cardsSlice} from "../../store/cards";


export default function () {
    const {getCurrentDesk} = useContext(AppContext)
    const desk = getCurrentDesk(false)
    const {isLoading, data: cards} = useAppSelector(state => state.cards)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(cardsLoad([desk.id]))
    }, [])

    if (!desk || isLoading) return <Loading/>
    return <ScrollView>
        {
            cards.filter(card => card.desk === desk.id).map((card, key) => {
                return <CardInDesk key={key} card={card}/>
            })
        }
    </ScrollView>
}

function CardInDesk({card}) {
    const dispatch = useAppDispatch()
    const editCard = appSlice.actions.editCard

    function toTheCard() {
        dispatch(cardsSlice.actions.setCurrentCard(card.id))
        dispatch(editCard(card.id))
    }

    return <PressRow onPress={toTheCard}>
        <TextMain style={[flex1, borderTable]}>{card.side_one}</TextMain>
        <TextMain style={[flex1, borderTable]}>{card.side_two}</TextMain>
    </PressRow>
}
