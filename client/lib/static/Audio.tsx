import * as React from 'react';
import {View} from 'react-native';
import {Audio} from 'expo-av';
import {faPlay, faStop} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import BtnPrimary from "../buttons/BtnPrimary";
import BtnSecondary from "../buttons/BtnSecondary";
import Slider from "@react-native-community/slider";
import {
    bgSecondaryLight,
    border, fixWidth,
    flex1,
    fRow, mh1,
    secondary,
    stickLeft,
    stickRight
} from "../../const";
import {Flex} from "../markup/markup";


export default function ({url, style = null, visible = false, autoPlay = false}) {
    if (!visible) return null
    const [state, setState] = useState({isPlaying: false, sound: null, duration: 0, progress: 0, url: null})

    async function play() {
        const {sound} = await Audio.Sound.createAsync(url)
        updateState({sound, isPlaying: true})
        await sound.playAsync()
    }

    function updateState(args) {
        setState({...state, ...args})
    }

    async function stop() {
        await state.sound.stopAsync()
        updateState({progress: 0, isPlaying: false})
    }

    useEffect(() => {

        let timer = setInterval(async () => {
            const status = await state.sound?.getStatusAsync()
            if (status) {
                const progress = Math.ceil(status.positionMillis * 100 / status.durationMillis)
                if (progress < 100) updateState({progress, duration: status.durationMillis})
                else {
                    updateState({progress: 0, isPlaying: false})
                    clearInterval(timer)
                }
            }
        }, 100)

        return state.sound
            ? () => {
                clearInterval(timer)
                if (state.sound) state.sound.unloadAsync();
            }
            : undefined;
    }, [state.sound, url]);

    return <View style={[fRow, style]}>
        {
            state.isPlaying ?
                <BtnPrimary title={faStop} style={[fixWidth(40), stickRight]} onPress={stop}/>
                :
                <BtnSecondary title={faPlay} style={[fixWidth(40), stickRight]} onPress={play}/>
        }
        <Flex style={[border, stickLeft, bgSecondaryLight]}>
            <Slider
                thumbTintColor={secondary.color}
                onLayout={autoPlay ? play : null}
                style={[flex1, mh1]}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#aaa"
                maximumTrackTintColor="#FFF"
                value={state.progress}
            />
        </Flex>
    </View>
}
