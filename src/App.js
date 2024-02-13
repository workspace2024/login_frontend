import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Nopage from "./Components/Nopage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </div>
  );
}

export default App;
