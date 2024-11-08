import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import "./style.scss"

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="layout-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
