import {useState} from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }
    return ( 
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Signup</h3>
            <label htmlFor="">Email</label>
            <input 
                type="email" 
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
            <label htmlFor="">Password</label>
            <input 
                type="password" 
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
            
            <button disabled={isLoading}>Submit</button>
            {error && <div className="error-div"><span  className="error">{error}</span></div>}

        </form>
     );
}
 
export default Signup;