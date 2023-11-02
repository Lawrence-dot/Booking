import React, { useState, createContext } from "react";
import { dataType, history } from "../../Interfaces/interfaces";

import Tabs from "../Pages/Tabs";
import Bookings from "../Sections/Bookings";

interface Props {
  datas: dataType;
}

export interface crdinfo {
  name?: string;
  type: string;
  need: string;
  rate: number;
}

export interface mainType {
  crddetails: crdinfo | null;
  setcrddetails: (c: crdinfo) => void;
  history?: history[];
  pendingtrans: Number;
  getdateinfo: () => string | undefined;
}

export const MainContext = createContext<mainType | null>(null);

function Main(props: Props) {
  const [history] = useState<history[]>([]);
  const [crddetails, setcrddetails] = useState<crdinfo | null>(null);
  const [pendingtrans] = useState<Number>(0);

  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var d = new Date();

  const getdateinfo = () => {
    let hour = new Date().getHours();
    let morning = (hour >= 4 && hour <= 11) || hour >= 21 || hour <= 3;
    let afternoon = hour >= 12 && hour <= 16;
    let evening = hour >= 17 && hour <= 20;
    if (morning) {
      return "morning";
    } else if (afternoon) {
      return "Afternoon";
    } else if (evening) {
      return "Evening";
    }
  };

  return (
    <MainContext.Provider
      value={{
        crddetails,
        setcrddetails,
        history,
        pendingtrans,
        getdateinfo,
      }}
    >
      <div className="dashcontent relative">
        <div
          className="contentmain dark:bg-blk transition-all rounded-d"
          id="dashboard"
        >
          <div className="welcome my-3">
            <p className="dark:text-white">
              {" "}
              Good {getdateinfo()} {props?.datas?.Username}!!!{" "}
            </p>
          </div>

          <div className="flex datetime my-3">
            <div className="datedivs p-3 w-1/2">
              <div className="date flex-col">
                <span className="text-4xl font-bold">{d.getDate()} </span>
                <span>
                  {months[d.getMonth()]} {d.getFullYear()}
                </span>
              </div>
              <div className=""></div>
            </div>
            <div className="w-1/2 time p-3 bg-white">
              <div className=" flex-col">
                <span className="text-4xl font-bold">{d.getHours()} </span>
                <span>
                  {d.getMinutes() < 10 && "0"}
                  {d.getMinutes()} {d.getHours() > 11 ? "PM" : "AM"}
                </span>
              </div>
              <div className=""></div>
            </div>
          </div>

          <div>
            <div className="flex dashflex flex-col flex-wrap sm:flex-row">
              <Tabs title="My Balance" content={`100`} balance />

              <Tabs title="Status" content={"Active"} />
              <Tabs title="Active rate" content={"10%"} color="red" />
              <Tabs title="Avg Click Rate" content={"30%"} />
            </div>
          </div>
        </div>

        <Bookings />
      </div>
    </MainContext.Provider>
  );
}

export default Main;
