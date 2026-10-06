import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function MainLayout() {
  return (
    <>
      <header>
        <div className="header-title">
          <h1 className="h1-title">Excel Analytics</h1>
        </div>
      </header>

      <main>
        <Sidebar title="Fast Access" />
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
