import logo from "./logo.svg";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";

import { Link, Outlet } from "react-router-dom";
import Card from "./component/card";
import NavbarComponent from "./component/NavbarComponent";
import TrailerMovie from "./component/TrailerMovie";
import Informasi from "./component/Informasi";
import Rekomendasi from "./component/Recomendation";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Informasi />
      <Rekomendasi />
      <Routes>
        <Route path="/trailer/:id" element={<TrailerMovie />} />
        <Route path="/" element={<Card />} />
      </Routes>
      <Routes>
        <Route path="/<Informasi />" element={<Informasi />} />
      </Routes>
    </div>
  );
}

export default App;
