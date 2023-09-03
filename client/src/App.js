import "./App.css";

import LoginScreen from "./Screens/LoginScreen";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import HomeScreen from "./Screens/HomeScreen";
import ForgetPasswordMailScreen from "./Screens/ForgetPasswordMailScreen";
import ForgetPasswordResetPasswordScreen from "./Screens/ForgetPasswordResetPasswordScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";
import TokenScreen from "./Screens/TokenScreen";

import EditProfile from "./Screens/EditProfile";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/users/login" element={<LoginScreen />} />
          <Route
            path="/users/forgetmail"
            element={<ForgetPasswordMailScreen />}
          />
          <Route
            path="/users/reset-password/:id/:token"
            element={<ForgetPasswordResetPasswordScreen />}
          />
          <Route path="/users/token" element={<TokenScreen />} />
          <Route path="/users/home" element={<HomeScreen />} />
          <Route path="/users/editprofile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
