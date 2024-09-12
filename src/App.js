import logo from "./logo.svg";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";

// import LoginHalaman from "./pages/loginpages/LoginHalaman";
// import RegisterPages from "./pages/registerPages/RegisterPage";
import { Link, Outlet } from "react-router-dom";
// import ShowDetailPage from "./pages/ShowDetailPage/ShowDetailPage";
import Card from "./component/card";
import NavbarComponent from "./component/NavbarComponent";
import TrailerMovie from "./component/TrailerMovie";
// import UserDatailPage from "./pages/useredetail/UserDetailPage";
import Informasi from "./component/Informasi";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Informasi />
      <Routes>
        <Route path="/trailer/:id" element={<TrailerMovie />} />
        <Route path="/" element={<Card />} />
      </Routes>
    </div>
  );
}

export default App;
