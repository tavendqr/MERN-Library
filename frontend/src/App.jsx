import LoginPage from "../access/LoginPage.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainPageAdmin from "../main/MainPageAdmin.jsx";
import MainPage from "../main/MainPage.jsx";
import SignUpPage from "../access/SignUpPage.jsx";

function App() {

  return (
    <>
    <Router>
      <Routes>

      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/main-admin" element={<MainPageAdmin />} />
        
     </Routes>
    </Router>   
    </>
  )
}

export default App
