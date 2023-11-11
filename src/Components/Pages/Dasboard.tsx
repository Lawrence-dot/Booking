import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { dataType } from "../../Interfaces/interfaces";
import { useState } from "react";
import Navbar from "./Navbar";
import { navtype } from "../../Interfaces/interfaces";
import Main, { MainContext, mainType } from "./Main";
import { Apps, DashboardCustomize } from "@mui/icons-material";
import { BsBellFill } from "react-icons/bs";

export const navContext = createContext<navtype | null>(null);

function Dasboard() {
  const location = useLocation();
  const [datas, setdatas] = useState<dataType | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const maincontext = useContext<mainType | null>(MainContext);

  useEffect(() => {
    setdatas(location?.state?.data);
  }, [location]);

  return (
    <navContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      <div className="dashBoard dark:bg-black md:flex">
        <div className="navs w-60 md:w-72">
          <Navbar
            Pending={maincontext?.pendingtrans}
            datas={datas}
            type="security"
            admin={true}
            token={datas?.token}
            is_admin={datas?.is_admin}
            is_staff={datas?.is_staff}
            is_security={datas?.is_admin}
          />
        </div>

        <div
          className="dasboardbody grow"
          onClick={() => {
            open && window.innerWidth < 640 && setOpen(false);
          }}
        >
          <div className="dashboardbdy pt-2 pb-10 w-full">
            <div className="flex hometop sticky top-0 z-40 bg-white dark:text-white dark:bg-black">
              <div className="text-blue justify-center text-center sm:text-left flex flex-row font-bold font-serif">
                <DashboardCustomize className="mr-2" />
                <p className="text-xl mdtext">My Dashboard</p>
              </div>

              <span
                onClick={() => {
                  setOpen(!open);
                }}
                className=" sm:hidden ml-auto transition-all navtoggler w-12 flex justify-end"
              >
                <Apps />
              </span>

              <span className="bell">
                <BsBellFill />{" "}
              </span>
            </div>

            <div className="container-d">
              <Main datas={datas as dataType} />
            </div>
          </div>
        </div>
      </div>
    </navContext.Provider>
  );
}

export default Dasboard;
