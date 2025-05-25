import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserRegister from "./pages/UserRegister.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainRegister from "./pages/CaptainRegister.jsx";
import Profile from "./pages/Profile.jsx";
import UserProtectedWrapper from "./components/UserProtectedComponent.jsx";
import UserLogout from "./pages/UserLogout.jsx";
import CaptainHome from "./pages/CaptainProfile.jsx";
import CaptainLogout from "./pages/CaptainLogout.jsx";
import CaptainProtectedWrapper from "./components/CaptainProtectedComponent.jsx";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/profile" element={
          <UserProtectedWrapper> 
            <Profile /> 
          </UserProtectedWrapper> } 
         />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/register" element={<UserRegister/>} />
        <Route path="/captain-login" element={<CaptainLogin/>} />
        <Route path="/captain-register" element={<CaptainRegister/>} />
        <Route path="/logout" element={<UserLogout/>}/>
        
        <Route path="/captain-profile" element={ 
          <CaptainProtectedWrapper> 
            <CaptainHome/> 
          </CaptainProtectedWrapper>
          }/>
        <Route path="/captain-logout" element={<CaptainLogout/>}/>
        
      </Routes>
    </div>
  )
}
