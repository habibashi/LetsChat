import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login"
import Home from "./Pages/Home";
import NotFound from "./Components/NotFound";
import { Navigate } from "react-router-dom";
import Group from "./Components/Group";
import People from "./Components/People";
import Chat from "./Components/Chat";
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Navigate to="/people/:id" />} />
          <Route path="/people/:id" element={<People />} />
          <Route path="/group/:id" element={<Group />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
