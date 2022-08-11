import {
    bgDanger,
    bgDangerLight,
} from "../../const";
import BtnPrimary, {BtnInterface} from "./BtnPrimary";


export default function (props: BtnInterface) {
    return <BtnPrimary
        {...props}
        bgColors={[bgDangerLight.backgroundColor, bgDanger.backgroundColor, bgDangerLight.backgroundColor]}
    />
}

