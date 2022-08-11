import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const storage = {
    async get(key, useJSON = true) {
        try {
            const jsonValue = await asyncStorage.getItem(key)
            if (!useJSON) return jsonValue
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log('local storage error:', e)
        }
    },

    async set(key, value, useJSON = true) {
        if (!useJSON) {
            await asyncStorage.setItem(key, value)
            return
        }
        try {
            const jsonValue = JSON.stringify(value)
            await asyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log('local storage error:', e)
        }
    },
    async remove(key) {
        await asyncStorage.removeItem(key)
    },
    async clear() {
        await asyncStorage.clear()
    }
}


