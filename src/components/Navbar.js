import {Link} from 'react-router-dom'
import logo from "../images/hockey.png"
import nhlLogo from "../images/nhl.png"
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const handleClick = () => {
        logout()
    }

    return ( 
        
                
                <header className="nav">
                    <img src={nhlLogo} alt="nhl-logo"/>
                    <img src={logo} alt="hockey-sticks-money-bag" id="left-logo"/>
                    {user && (
                        <div className="logout">
                        <span className="links">{user.email}</span>
                        {console.log(user.email)}
                        <button className="logout-btn" onClick={handleClick}>Logout</button>
                    </div>
                    )}
                    <Link to="/">
                        <h1>Two Minutes for Degenerating</h1>
                    </Link>
                    
                    
                    {user && (
                        <div class="links">
                            <Link to="/login"><span className="links">Login</span></Link>
                            <Link to="/signup"><span className="links">Signup</span></Link>
                        </div>
                    )}
                    
                    <img src={logo} alt="hockey-sticks-money-bag" id="right-logo"/>
                    <img src={nhlLogo} alt="nhl-logo"/>
                    
                </header>
                
            
     );
}
 
export default Navbar;