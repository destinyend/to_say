import React from "react";
import {
    bgWhite,
    border,
    field, fieldWidth, heightNormal,
    p0
} from "../../const";
import {Picker} from '@react-native-picker/picker';
import {Platform, StyleSheet, View} from "react-native";

interface SelectInterface {
    value?: string | number,
    items?: { label: string, value: string | number }[],
    onChange?: (any) => void
    style?: object
    editable?: boolean
}

export default function ({style = null, value = null, items = [], onChange = null, editable = true}: SelectInterface) {
    if (Platform.OS === 'android') return <View style={[border, bgWhite, heightNormal, style]}>
        <Picker
            enabled={editable}
            style={[
                fieldWidth,
                heightNormal,
                {borderColor: 'transparent', marginTop: -15}
            ]}
            selectedValue={value}
            onValueChange={onChange}
        >
            {items.map((item, key) => <Picker.Item key={key} {...item}/>)}
        </Picker>
    </View>

    return <Picker
        enabled={editable}
        style={StyleSheet.flatten([field, p0, style])}
        selectedValue={value}
        onValueChange={onChange}
    >
        {items.map((item, key) => <Picker.Item key={key} {...item}/>)}
    </Picker>
}

