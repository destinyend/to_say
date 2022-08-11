import Login from "../login/Login";
import Main from "../main/Main";
import Learning from "../learning/Learning";
import Library from "../library/Library";

export const screens = [
    {
        options: {title: '2say: вход'},
        name: 'Login',
        Component: Login
    },
    {
        options: {title: '2say: мои колоды'},
        name: 'Main',
        Component: Main
    },
    {
        options: {title: '2say: изучение'},
        name: 'Learning',
        Component: Learning
    },
    {
        options: {title: '2say: библиотека'},
        name: 'Library',
        Component: Library
    },
]
