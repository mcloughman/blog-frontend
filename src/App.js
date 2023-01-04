import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";


// pages and components
import Home from "./pages/Home"
import Navbar from "./components/Navbar";

function App() {
  // const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"  
              // element={user ? <Home /> :  <Navigate to="/login" />} // don't need for this app
              element={<Home />} // don't need for this app
            />
            <Route 
              path="/login"  
              // element={!user ? <Login /> : <Navigate to="/" />} // don't need for this app
              element={<Login />} // don't need for this app
            />
            <Route 
              path="/signup"  
              // element={!user ? <Signup /> : <Navigate to="/" />} // don't need for this app
              element={<Signup />} // don't need for this app
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
