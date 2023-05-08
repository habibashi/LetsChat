import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login"
import Home from "./Pages/Home";
import CreateAccount from "./Components/CreateAccount";
import CreateCompany from "./Components/CreateCompany";
import Group from "./Components/Group";
import People from "./Components/People";
import Chat from "./Components/Chat";
import NotFound from "./Components/NotFound";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import ActiveCompany from "./Components/ActiveCompany";
import EditCompany from "./Components/EditCompany";
import Profile from "./Components/Profile";
import ActiveUsers from "./Components/ActiveUsers";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Navigate to="/people" />} />
          <Route path="/people" element={<People />} />
          <Route path="/group" element={<Group />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/createCompany" element={<CreateCompany />} />
          <Route path="/activeCompany" element={<ActiveCompany />} />
          <Route path="/editCompany" element={<EditCompany />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/activeUsers" element={<ActiveUsers />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
