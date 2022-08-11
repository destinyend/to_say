import {Dimensions, Platform, StyleSheet} from "react-native";

export const textShadow = {
    textShadowColor: '#fff',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
}

export const primary = {
    color: '#980404'
}

export const primaryLight = {
    color: '#c90303'
}

export const secondary = {
    color: "#3a3a3a"
}

export const secondaryLight = {
    color: "#7a7a7a"
}

export const danger = {
    color: "#980404"
}

export const dangerLight = {
    color: "#ff0c0c"
}

export const success = {
    color: "#1e7502"
}

export const bgPrimary = {
    backgroundColor: primary.color
}

export const bgPrimaryLight = {
    backgroundColor: primaryLight.color
}

export const bgSecondary = {
    backgroundColor: secondary.color
}

export const bgSecondaryLight = {
    backgroundColor: secondaryLight.color
}

export const bgDanger = {
    backgroundColor: danger.color
}

export const bgDangerLight = {
    backgroundColor: dangerLight.color
}

export const bgWhite = {
    backgroundColor: '#fff'
}

export const bgTransparent = {
    backgroundColor: 'transparent'
}

export const shadow = {
    shadowColor: '#333',
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20,
    shadowOffset: {
        width: 0,
        height: 11,
    },

}

export const bold = {fontWeight: 'bold'}
export const italic = {fontStyle: 'italic'}

export const red = {color: 'red'}
export const darkred = {color: 'darkred'}
export const green = {color: 'green'}
export const white = {color: 'white'}
export const black = {color: 'black'}
export const blue = {color: 'blue'}
export const transparent = {color: 'transparent'}
export const background = {
    header: {backgroundColor: '#fff'},
    body: {backgroundColor: '#ddd'}
}



export const fontMain = {
    fontSize: 16,
    color: '#000'
}

export const fontTitle = {
    fontSize: 20,
    color: primary.color,
    ...textShadow,
    fontWeight: 'bold'
}

export const fontComment = {
    fontSize: 12,
    color: '#222',
    fontStyle: 'italic'
}

export const fontPlaceholder = {
    fontSize: 12,
    color: '#666'
}

export const absolute = {position: 'absolute'}

export const m0 = {margin: 0}
export const m1 = {margin: 5}
export const m2 = {margin: 10}
export const m3 = {margin: 15}
export const m4 = {margin: 20}
export const m5 = {margin: 25}

export const ml0 = {marginLeft: m0.margin}
export const ml1 = {marginLeft: m1.margin}
export const ml2 = {marginLeft: m2.margin}
export const ml3 = {marginLeft: m3.margin}
export const ml4 = {marginLeft: m4.margin}
export const ml5 = {marginLeft: m5.margin}

export const mr0 = {marginRight: m0.margin}
export const mr1 = {marginRight: m1.margin}
export const mr2 = {marginRight: m2.margin}
export const mr3 = {marginRight: m3.margin}
export const mr4 = {marginRight: m4.margin}
export const mr5 = {marginRight: m5.margin}

export const mb0 = {marginBottom: m0.margin}
export const mb1 = {marginBottom: m1.margin}
export const mb2 = {marginBottom: m2.margin}
export const mb3 = {marginBottom: m3.margin}
export const mb4 = {marginBottom: m4.margin}
export const mb5 = {marginBottom: m5.margin}

export const mt0 = {marginTop: m0.margin}
export const mt1 = {marginTop: m1.margin}
export const mt2 = {marginTop: m2.margin}
export const mt3 = {marginTop: m3.margin}
export const mt4 = {marginTop: m4.margin}
export const mt5 = {marginTop: m5.margin}

export const mv0 = {marginVertical: m0.margin}
export const mv1 = {marginVertical: m1.margin}
export const mv2 = {marginVertical: m2.margin}
export const mv3 = {marginVertical: m3.margin}
export const mv4 = {marginVertical: m4.margin}
export const mv5 = {marginVertical: m5.margin}

export const mh0 = {marginHorizontal: m0.margin}
export const mh1 = {marginHorizontal: m1.margin}
export const mh2 = {marginHorizontal: m2.margin}
export const mh3 = {marginHorizontal: m3.margin}
export const mh4 = {marginHorizontal: m4.margin}
export const mh5 = {marginHorizontal: m5.margin}

export const p0 = {padding: 0}
export const p1 = {padding: 5}
export const p2 = {padding: 10}
export const p3 = {padding: 15}

export const pt0 = {paddingTop: p0.padding}
export const pt1 = {paddingTop: p1.padding}
export const pt2 = {paddingTop: p2.padding}
export const pt3 = {paddingTop: p3.padding}

export const pb0 = {paddingBottom: p0.padding}
export const pb1 = {paddingBottom: p1.padding}
export const pb2 = {paddingBottom: p2.padding}
export const pb3 = {paddingBottom: p3.padding}

export const pr0 = {paddingRight: p0.padding}
export const pr1 = {paddingRight: p1.padding}
export const pr2 = {paddingRight: p2.padding}
export const pr3 = {paddingRight: p3.padding}

export const pl0 = {paddingLeft: p0.padding}
export const pl1 = {paddingLeft: p1.padding}
export const pl2 = {paddingLeft: p2.padding}
export const pl3 = {paddingLeft: p3.padding}

export const ph0 = {paddingHorizontal: p0.padding}
export const ph1 = {paddingHorizontal: p1.padding}
export const ph2 = {paddingHorizontal: p2.padding}
export const ph3 = {paddingHorizontal: p3.padding}

export const pv0 = {paddingVertical: p0.padding}
export const pv1 = {paddingVertical: p1.padding}
export const pv2 = {paddingVertical: p2.padding}
export const pv3 = {paddingVertical: p3.padding}

export const screenWidth = isDesktop() ? fixWidth(1200) : fixWidth(Dimensions.get('window').width)
export const headerPaddingTop = Platform.OS === 'android' ?  fixHeight(35) : fixHeight(5)
export const headerHeight = fixHeight(40)
export const bodyHeight = fixHeight(Dimensions.get('window').height
    - headerPaddingTop.height - headerHeight.height - (Platform.OS === 'web' ? 30: -30))
export const mainWidth = 200
export const minWidth = 40
export const maxWidth = 200

export const heightSmall = {
    height: fontComment.fontSize + p1.padding,
    maxHeight: fontComment.fontSize + p1.padding,
    minHeight: fontComment.fontSize + p1.padding
}

export const heightNormal = {
    height: fontMain.fontSize + p2.padding,
    maxHeight: fontMain.fontSize + p2.padding,
    minHeight: fontMain.fontSize + p2.padding
}

export const heightBig = {
    height: fontTitle.fontSize + p3.padding,
    maxHeight: fontTitle.fontSize + p3.padding,
    minHeight: fontTitle.fontSize + p3.padding
}

export const fRow = {flexDirection: 'row'}
export const fWrap = {flexWrap: 'wrap'}
export const noWrap = {flexWrap: 'nowrap'}
export const fStart = {alignItems: 'flex-start', textAlign: 'left'}
export const fEnd = {alignItems: 'flex-end', textAlign: 'right'}
export const fCenter = {alignItems: 'center', textAlign: 'center'}

export const jStart = {justifyContent: 'flex-start'}
export const jEnd = {justifyContent: 'flex-end'}
export const jCenter = {justifyContent: 'center'}
export const jAround = {justifyContent: 'space-around'}
export const jBetween = {justifyContent: 'space-between'}

export const flex1 = {flex: 1}
export const flex2 = {flex: 2}
export const flex3 = {flex: 3}
export const flex4 = {flex: 4}
export const flex5 = {flex: 5}
export const flex6 = {flex: 6}

export const stickRight = {
    marginRight: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
}

export const stickLeft = {
    marginLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
}

export const stickBottom = {
    marginBottom: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
}

export const stickTop = {
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
}

export const stick = {
    ...stickLeft,
    ...stickRight
}

export const borderRadius = {borderRadius: 5}
export const borderColor = {borderColor: '#777'}
export const borderWidth = {borderWidth: 1}
export const border = {...borderWidth, ...borderColor, ...borderRadius}

export const noBorder = {borderColor: 'transparent'}
export const noRadius = {borderRadius: 0}
export const borderTable = {...borderWidth, ...borderColor, ...noRadius}

export const fieldWidth = {
    minWidth: mainWidth,
    width: mainWidth,
    maxWidth: mainWidth
}

export const field = {
    backgroundColor: '#fff',
    ...fieldWidth,
    ...heightNormal,
    ...border,
    ...p1,
}

export const flexField = StyleSheet.flatten({
    backgroundColor: '#fff',
    ...flex1,
    ...heightNormal,
    ...border,
    ...ph1,
})

export const btnWidth = {
    minWidth,
    maxWidth
}

export const btnStyle = {
    ...heightNormal,
    ...btnWidth,
    zIndex: 3,
    elevation: 3,
}

export const esc = {title: 'отмена'}

export const emptyTime = '--:--'

export enum sides {
    one = 'вопрос',
    two = 'ответ'
}

let __screenSize = null

export function screenSize() {
    function define() {
        const width = Dimensions.get('window').width
        if (width < 360) return 'small'
        if (width < 576) return 'phone'
        if (width < 992) return 'tablet'
        return 'desktop'
    }

    if (!__screenSize) __screenSize = define()
    return __screenSize
}

export function fixHeight(height) {
    return {minHeight: height, height, maxHeight: height}
}

export function fixWidth(width) {
    return {minWidth: width, width, maxWidth: width}
}

export function isDesktop() {
    return screenSize() === 'desktop'
}

export function isTablet() {
    return screenSize() === 'tablet'
}

export function isPhone() {
    return screenSize() === 'phone'
}

export function isSmall() {
    return screenSize() === 'small'
}

export function lessDesktop() {
    return screenSize() !== 'desktop'
}

export function lessTablet() {
    return ['phone', 'small'].includes(screenSize())
}
