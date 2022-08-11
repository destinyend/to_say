import React from 'react';
import {Provider} from "react-redux";
import {setupStore} from "./src/store/store";
import Wrapper from "./src/screens/wrapper/Wrapper";

const store = setupStore()

export default function App() {
    return <Provider store={store}>
        <Wrapper/>
    </Provider>
}
