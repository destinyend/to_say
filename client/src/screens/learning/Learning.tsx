import {useContext, useEffect} from "react"
import {appSlice, teacherState, useAppDispatch, useAppSelector} from "../../store/app";
import {Flex} from "../../../lib/markup/markup";
import Loading from "../../../lib/static/Loading";
import {ph2} from "../../../const";
import Control from "./Control";
import {cardsLoad, cardsSlice} from "../../store/cards";
import {EDate, randInt} from "../../../lib/sugar";
import Sides from "./Sides";
import Answer from "./Answer";
import {AppContext} from "../../../contexts";


export default function () {
    const {teacher, learningPool, learningPoolSize} = useAppSelector(state => state.app)
    const {data: cards, isLoading: cardsIsLoading} = useAppSelector(state => state.cards)
    const {currentDeskId, data: desks} = useAppSelector(state => state.desks)
    const {getCurrentCard} = useContext(AppContext)
    const dispatch = useAppDispatch()

    function loadCards(): void {
        const deskIdes = currentDeskId ? [currentDeskId] : desks.map(desk => desk.id)
        dispatch(cardsLoad(deskIdes))
        dispatch(appSlice.actions.setTeacherState(teacherState.loading))
    }

    function getCardsToStudyIdes(): number[] {
        const cardsToStudyIdes = []
        const now = new EDate()
        for (let card of cards) {
            if (currentDeskId !== null && currentDeskId !== card.desk) continue
            if (!card.next_show_in || new EDate(card.next_show_in) <= now) {
                cardsToStudyIdes.push(card.id)
            }
        }
        return cardsToStudyIdes
    }

    function chooseCard(): number {
        if (learningPool.length >= learningPoolSize) {
            const index = randInt(0, learningPoolSize - 5)
            return learningPool[index]
        }
        if (learningPool.length > 5) {
            const index = randInt(0, learningPool.length - 6)
            return learningPool[index]
        }
        return learningPool[0]
    }

    function fillLearningPool(): void {
        const cardsToStudyIdes = getCardsToStudyIdes()
        dispatch(appSlice.actions.fillLearningPool(cardsToStudyIdes))
    }

    function selectCard(): void {
        const currentCardId = chooseCard()
        dispatch(cardsSlice.actions.setCurrentCard(currentCardId))
        dispatch(appSlice.actions.setTeacherState(teacherState.question))
    }

    useEffect(() => {
        switch (teacher) {
            case teacherState.initial:
                loadCards();
                break;
            case teacherState.loading:
                if (!cardsIsLoading) dispatch(appSlice.actions.setTeacherState(teacherState.fillingPool))
                break
            case teacherState.fillingPool:
                fillLearningPool()
                break
            case teacherState.next:
                fillLearningPool()
                break
            case teacherState.selectingCard:
                selectCard()
                break
        }
    }, [teacher, cards])

    if ([teacherState.loading, teacherState.initial].includes(teacher)) return <Loading/>
    return <Flex style={[ph2]}>
        <Control/>
        <Sides/>
        <Answer card={getCurrentCard()}/>
    </Flex>
}
