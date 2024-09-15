import Nav from "@/components/Nav";
import { Outlet } from "react-router-dom";

const NavLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default NavLayout;
