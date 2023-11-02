import React, { createContext, useContext } from "react";
import { bartype, dataType, navtype } from "../../Interfaces/interfaces";
import { AppContext } from "../../Container/App";
import { Apptype } from "../../Interfaces/interfaces";
import { navContext } from "./Dasboard";
import { ShowModal } from "./Modal";
import {
  AutoAwesomeMosaic,
  Close,
  DarkMode,
  Logout,
  Settings,
  Person,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

export const classNames: string[] = ["bookings", "dashboard", "withdraw"];

interface Props {
  type: string;
  datas: dataType;
  Pending?: Number;
}

export const NavbarContext = createContext<bartype | null>(null);

function Navbar(props: Props) {
  const navcontext = useContext<navtype | null>(navContext);

  const Login = useContext<Apptype | null>(AppContext);
  const navigate = useNavigate();

  const switchNav = (id: string) => {
    const docs: Element[] = Array.from(
      document.getElementsByClassName("contentmain")
    );

    const navs: Element[] = Array.from(
      document.getElementsByClassName("navli")
    );

    docs.forEach((each) => {
      each.classList.add("hidden");
      each.id === id && each.classList.remove("hidden");
    });

    navs.forEach((each) => {
      each.classList.remove("active");
      each.id === id && each.classList.add("active");
    });
    window.innerWidth < 640 && navcontext?.setOpen(false);
  };

  const signout = () => {
    ShowModal({
      title: "Are you sure you want to logout ?",
      type: "yesno",
      function: () => {
        navigate("/");
      },
    });
  };

  return (
    <NavbarContext.Provider value={{ signout }}>
      <div
        className={`navbar  ${
          navcontext?.open || window.innerWidth > 640 ? "show" : "hide"
        } fixed z-20 md:relative `}
      >
        <div
          className={`dashboardnav w-full md:w-72 md:pr-11 px-9 dark:text-white bg-white dark:bg-black fixed border border-none border-l-1 py-5 container-d transition-all`}
        >
          <div className="flex items-center rounded-sm flex-row nav-imagebg mt-2">
            <img
              className="navimg"
              src={require("../../Assets/nnpc.png")}
              height="50"
              alt=""
            />
            <span className="text-xl font-bold navtitle"> NETCO</span>
            <span
              className="ml-auto text-red sm:hidden"
              onClick={() => navcontext?.setOpen(false)}
            >
              <Close />
            </span>
          </div>

          <div className="flex my-4">
            <div className="w-full">
              <hr />
            </div>
          </div>

          <div className="flex mt-2">
            <h3>Menu</h3>
          </div>

          <div className="navli text-black dark:text-white mt-2 text-white">
            <div className="flex flex-col">
              <div
                id="dashboard"
                onClick={() => switchNav("dashboard")}
                className="navli text-black dark:text-white  cursor-pointer active hover:border-white  py-2  text-md font-thin font-sans rounded-md flex"
              >
                <span>
                  <AutoAwesomeMosaic />
                </span>
                <span className="ml-3  navtext"> My Dashboard</span>
              </div>

              <div
                id="bookings"
                onClick={() => switchNav("bookings")}
                className="navli text-black dark:text-white  cursor-pointer hover:border-white  py-2  text-md font-thin font-sans rounded-md flex"
              >
                <span>
                  <Person />
                </span>
                <span className="ml-3  navtext"> Check Bookings </span>
              </div>
            </div>
          </div>

          <div className="flex my-4">
            <div className="w-full">
              <hr />
            </div>
          </div>

          <div className="flex mt-2 mb-3">
            <h3>Profile Settings</h3>
          </div>

          <div className="settingstab flex  flex-col">
            <div className="flex navli text-black dark:text-white py-2">
              <span
                className={`av-theme-toggler cursor:pointer transition-all flex settings-icon`}
              >
                <Settings />
              </span>
              <span className="ml-3">Settings</span>
            </div>

            <div className="flex navli text-black dark:text-white py-2">
              <span
                className={`cursor:pointer transition-all flex`}
                onClick={() => Login!.toggleTheme()}
              >
                <DarkMode />
              </span>
              <span className="ml-3">Dark Mode</span>
            </div>

            <div className="logout navli text-black dark:text-white py-2">
              <span className="logout cursor-pointer flex" onClick={signout}>
                <Logout />
                <p className="ml-3 ">Log Out</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </NavbarContext.Provider>
  );
}

export default Navbar;
