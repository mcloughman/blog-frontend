// We're going to use the useEffect hook to check localstorage for a user. Because, at this point, without it, when we refresh our front end app,the user in react is reset to null
import {createContext, useReducer, useEffect } from "react"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
           return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    console.log('Auth context state: ', state)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch({
                type: 'LOGIN',
                payload: user
            })
        }
    }, [])

return (
    <AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>
    )
}