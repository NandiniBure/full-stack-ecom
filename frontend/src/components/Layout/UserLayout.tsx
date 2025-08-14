import React from "react";
import Topbar from "./Topbar";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return <div>
     <Header></Header>
     {/* Main content */}
     <main>
      <Outlet></Outlet>
     </main>
     <Footer></Footer>
  </div>;
};

export default UserLayout;
