import {
    bgSecondary, bgSecondaryLight,
} from "../../const";
import BtnPrimary, {BtnInterface} from "./BtnPrimary";


export default function (props: BtnInterface) {
    return <BtnPrimary
        {...props}
        bgColors={[bgSecondaryLight.backgroundColor, bgSecondary.backgroundColor, bgSecondaryLight.backgroundColor]}
    />
}


