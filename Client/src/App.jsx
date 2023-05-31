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
import { GroupChat } from "./Components/GroupChat";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          {
            user?.role === "admin" && (
              <>
                <Route index element={<Navigate to="/createAccount" />} />
                <Route path="/createAccount" element={<CreateAccount />} />
                <Route path="/createCompany" element={<CreateCompany />} />
              </>

            )
          }
          {
            user?.role === "employee" && (
              <>
                <Route index element={<Navigate to="/people" />} />
              </>
            )
          }
          {
            user?.role === "manager" && (
              <>
                <Route index element={<Navigate to="/people" />} />
              </>
            )
          }
          <Route path="/people" element={<People />} />
          <Route path="/group" element={<Group />} />
          <Route path="/activeCompany" element={<ActiveCompany />} />
          <Route path="/editCompany" element={<EditCompany />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/activeUsers" element={<ActiveUsers />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/groupChat/:id" element={<GroupChat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
