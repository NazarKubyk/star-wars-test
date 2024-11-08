import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharactersList from "./pages/CharactersList";
import CharacterInfo from "./pages/CharacterInfo";
import Favourites from "./pages/Favourites";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./layout/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<CharactersList />} />
            <Route path="/character/:id" element={<CharacterInfo />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
