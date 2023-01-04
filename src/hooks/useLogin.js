import {useState} from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()


    const login = async(email, password) => {
        setIsLoading(true)
        setError(null)

        
        const response = await fetch('https://hockey-blog.herokuapp.com/api/user/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password})}
        )
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error)
        }
        if (response.ok) {
            // save user to localstorage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context - we don't need separate signup, we just log them in when they signup
            dispatch({
                type: "LOGIN",
                payload: json
            })
            setIsLoading(false)
            
        }
    }
    return {login, isLoading, error}
}