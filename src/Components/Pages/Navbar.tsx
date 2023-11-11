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
  Person2,
  Person3,
  PlusOneTwoTone,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../LoginSlice";
import axios from "axios";
import { RootState } from "../../Store";

export const classNames: string[] = ["bookings", "dashboard", "withdraw"];

interface Props {
  type: "security" | "user";
  datas: dataType | undefined;
  Pending?: Number;
  admin?: boolean;
  token?: any;
  is_admin?: boolean;
  is_staff?: boolean;
  is_security?: boolean;
}

export const NavbarContext = createContext<bartype | null>(null);

function Navbar(props: Props) {
  const navcontext = useContext<navtype | null>(navContext);
  const token = useSelector((state: RootState) => state.token.value);
  const Login = useContext<Apptype | null>(AppContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const lgout = (token: any) => {
    axios
      .post(
        "https://vistor-booking.onrender.com/api/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const signout = () => {
    ShowModal({
      title: "Are you sure you want to logout ?",
      type: "yesno",
      function: () => {
        lgout(token);
        dispatch(logout());
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

          <div className="text-black dark:text-white mt-2 text-white">
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

              {props.is_staff && (
                <div
                  id="bookings"
                  onClick={() => switchNav("bookings")}
                  className="navli text-black dark:text-white  cursor-pointer hover:border-white  py-2  text-md font-thin font-sans rounded-md flex"
                >
                  <span>
                    <Person3 />
                  </span>
                  <span className="ml-3  navtext"> View Bookings </span>
                </div>
              )}

              {props.is_staff && (
                <div
                  id="addbooking"
                  onClick={() => switchNav("addbooking")}
                  className="navli text-black dark:text-white  cursor-pointer hover:border-white  py-2  text-md font-thin font-sans rounded-md flex"
                >
                  <span>
                    <PlusOneTwoTone />
                  </span>
                  <span className="ml-3  navtext"> Add a new Booking </span>
                </div>
              )}

              {props.is_admin && (
                <div
                  id="createuser"
                  onClick={() => switchNav("createuser")}
                  className="navli text-black dark:text-white  cursor-pointer hover:border-white  py-2  text-md font-thin font-sans rounded-md flex"
                >
                  <span>
                    <PlusOneTwoTone />
                  </span>
                  <span className="ml-3  navtext"> Create a User </span>
                </div>
              )}

              {props.is_admin && (
                <div
                  id="users"
                  onClick={() => switchNav("users")}
                  className="navli text-black dark:text-white  cursor-pointer hover:border-white  py-2  text-md font-thin font-sans rounded-md flex"
                >
                  <span>
                    <Person2 />
                  </span>
                  <span className="ml-3  navtext"> View Users </span>
                </div>
              )}

              {props.is_security && (
                <div
                  id="logs"
                  onClick={() => switchNav("logs")}
                  className="navli text-black dark:text-white  cursor-pointer hover:border-white  py-2  text-md font-thin font-sans rounded-md flex"
                >
                  <span>
                    <AutoAwesomeMosaic />
                  </span>
                  <span className="ml-3  navtext"> View Logs</span>
                </div>
              )}
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
