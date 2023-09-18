import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <section className="w-full min-h-screenWHeader flex flex-col items-start px-12 py-2 bg-[#0e0e10]">
      <nav className="flex w-full items-center gap-3 py-2 text-white">
        <NavLink
          to={"."}
          end
          className={({ isActive }) =>
            isActive ? "border-b-2 border-white" : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to={"profile"}
          className={({ isActive }) =>
            isActive ? "border-b-2 border-white" : ""
          }
        >
          Profile
        </NavLink>

        <NavLink
          to={"livestream"}
          className={({ isActive }) =>
            isActive ? "border-b-2 border-white" : ""
          }
        >
          Live Stream
        </NavLink>
      </nav>

      <Outlet />
    </section>
  );
};

export default DashboardLayout;
