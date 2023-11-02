import React, { useEffect, createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dasboard from "../Components/Pages/Dasboard";
import Home from "../Components/Auth/Home";
import { Apptype } from "../Interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

export const AppContext = createContext<Apptype | null>(null);

function App() {
  const [theme, setTheme] = useState(window.localStorage.theme);
  const isloggedin = useSelector((state: RootState) => state.login.value);

  const showPreloader = () => {
    document.querySelector(".preloader")?.classList.remove("hidden");
    setTimeout(() => {
      document.querySelector(".preloader")?.classList.add("hidden");
    }, 1200);
  };

  useEffect(() => {
    showPreloader();
  }, []);

  useEffect(() => {
    !(theme in window.localStorage) && setTheme("light");
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    let headDoc = document.documentElement;
    if (window.localStorage.theme === "light") {
      window.localStorage.setItem("theme", "dark");
      headDoc.className = "dark";
    } else {
      window.localStorage.setItem("theme", "light");
      headDoc.className = "light";
    }
  };

  return (
    <AppContext.Provider
      value={{ showPreloader, isloggedin, theme, toggleTheme }}
    >
      <div className="App" id="app">
        <div className="modalwrapper"></div>
        <div className="preloader bg-dark hidden">
          <div className="preloader-content">
            <p className="text-white text-5xl">
              {" "}
              <img
                className="preloaderimg"
                src={require("../Assets/nnpc.png")}
                alt="Logo"
              />{" "}
            </p>
          </div>
        </div>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashBoard"
              element={isloggedin ? <Dasboard /> : <Home />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
