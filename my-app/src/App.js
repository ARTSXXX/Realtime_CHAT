  import Home from "./pages/Home";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import "./style.scss";
  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  import { useContext } from "react";
  import { AuthContext } from "./context/AuthContext";
  import Game_1 from "./components/Game_1";
import Profile from "./pages/Profile";

  function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
      if (!currentUser) {
        return <Navigate to="/login" />;
      }

      return children
    };
  


    return (
    
        <div>
  <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home/>
                  </ProtectedRoute>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path ="Game_1" element = {<Game_1/>}/>
              <Route path ="/Profile/:id" element = {<Profile/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        
        <div>
        <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  <div className="snowflake"></div>
  </div>
        </div>

        
          

    );
  }

  export default App;