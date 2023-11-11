import { Dashboard } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../Store";

function Dashroute() {
  const isloggedin = useSelector((state: RootState) => state.login.value);
  return isloggedin ? <Dashboard /> : <Navigate to="/" />;
}

export default Dashroute;
