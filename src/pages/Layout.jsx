import React from "react";
import { Outlet, Link, useLocation } from "react-router";
import { Menu, Building2, ChevronRight } from "lucide-react";

export default function Layout() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="drawer lg:drawer-open">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          <div className="navbar bg-base-100 shadow-sm lg:hidden">
            <div className="flex-none">
              <label htmlFor="main-drawer" className="btn btn-square btn-ghost">
                <Menu className="w-6 h-6" />
              </label>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-primary">Blur Admin Panel</h1>
            </div>
          </div>

          <main className="flex-1 p-4 lg:p-6">
            <Outlet />
          </main>
        </div>

        <div className="drawer-side">
          <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

          <div className="menu p-4 w-80 min-h-full bg-base-100 text-base-content shadow-xl">
            <div className="flex items-center gap-3 mb-8 p-4 bg-primary text-primary-content rounded-lg">
              <div className="avatar avatar-placeholder">
                <div className="bg-primary-content text-primary rounded-full w-10">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold">Blur Admin</h1>
                <p className="text-sm opacity-80">Yönetim Paneli</p>
              </div>
            </div>

            <ul className="menu menu-lg">
              <li className="menu-title mt-6">
                <span>Genel</span>
              </li>

              <li>
                <Link to="/enterprises" className={`${isActive("/enterprises") ? "active" : ""}`}>
                  <Building2 className="w-5 h-5" />
                  Şirketler
                  {isActive("/enterprises") && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
