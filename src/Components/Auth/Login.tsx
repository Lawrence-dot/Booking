import React, { useContext, useEffect, useState } from "react";
import { HomeContext } from "./Home";
import { HomeType } from "../../Interfaces/interfaces";
import { useDispatch } from "react-redux";
import { loguser } from "../../LoginSlice";
import { NavigateFunction, useNavigate } from "react-router";
import {
  Facebook,
  Instagram,
  Twitter,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { savetoken } from "../Auth/TokenSlice";
import { TbLoaderQuarter, TbLock, TbMail } from "react-icons/tb";
import { AppContext } from "../../Container/App";

function Login() {
  const navigate: NavigateFunction = useNavigate();
  const login = useContext<HomeType | null>(HomeContext);
  const [loading, setloading] = useState<boolean>(false);
  const [mail, setmail] = useState<HTMLInputElement>();
  const [pass, setpass] = useState<HTMLInputElement>();
  const appcontext = useContext(AppContext);
  // var token: any;
  const dispatch = useDispatch();
  const logusers = () => {
    dispatch(loguser());
  };

  useEffect(() => {
    setpass(document.getElementById("pass-ref") as HTMLInputElement);
    setmail(document.querySelector("#email-ref") as HTMLInputElement);
  }, []);

  useEffect(() => {
    // axios({
    //   method: "post",
    //   url: "https://vistior-booking.onrender.com/api",
    //   data: {
    //   }
    // })
    // .get("https://vistior-booking.onrender.com/api")
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   alert(err.message);
    // });
  }, []);

  const signin = async () => {
    if (mail?.value && pass?.value) {
      setloading(true);
      (async () => {
        await fetch("https://vistor-booking.onrender.com/api/login/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: mail.value,
            password: pass.value,
          }),
        })
          .then(async (res) => {
            const ress = await res.json();
            if (ress.non_field_errors) {
              alert("Invalid Credentials Provided");
            } else {
              appcontext?.showPreloader();
              logusers();
              navigate("/dashBoard", {
                state: {
                  data: ress,
                },
              });
              dispatch(savetoken(ress.token));
            }
            setloading(false);
          })
          .catch((err) => {
            alert(err);
            setloading(false);
          });
      })();
    } else {
      alert("Please Fill all input fields");
    }
  };

  const register = () => {
    login?.setlogin(false);
  };

  return (
    <div className="loginform shadow-black px-7 rounded-md py-5 flex flex-col justify-center">
      <h3 className="font-bold text-left text-xl mb-2 loginwelcome">
        {" "}
        Sign in to your Account{" "}
      </h3>
      <span className="text-left mb-5 welb">
        {" "}
        Welcome back! please enter your details
      </span>

      <div className="flex lhgform flex-col">
        <FormControl>
          <InputLabel className="flex flex-row" htmlFor="email-ref">
            <div className="flex">
              {" "}
              <TbMail className="mr-1" size={"22px"} />
              Username
            </div>
          </InputLabel>
          <OutlinedInput
            id="email-ref"
            type={"text"}
            label="Usernameee"
            className="rounded-md mb-5"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                ></IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl>
          <InputLabel className="flex flex-row" htmlFor="email-ref">
            <div className="flex">
              {" "}
              <TbLock className="mr-1" size={"22px"} />
              Password
            </div>
          </InputLabel>
          <OutlinedInput
            id="pass-ref"
            type={"text"}
            label="Passworddd"
            className="rounded-md mb-5"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                ></IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {loading ? (
          <span className="block mx-auto MY-2">
            <TbLoaderQuarter />{" "}
          </span>
        ) : (
          <button
            className="bg-blue-700 my-3 rounded-md text-white p-2 hover:bg-blue-600"
            onClick={signin}
          >
            {" "}
            Log in{" "}
          </button>
        )}
      </div>

      <div className="loginsocials mt-3 mb-5">
        <div className="flex">
          <div className="w-1/3">
            <hr className="mt-2" />
          </div>
          <div className="w-1/3 connectus">connect with us</div>
          <div className="w-1/3">
            <hr className="mt-2" />
          </div>
        </div>
        <div className="flex login-socialicons">
          <Facebook />
          <Twitter />
          <Instagram />
          <WhatsApp />
          <YouTube />
        </div>
      </div>

      <div className="flex justify-center text-sm">
        <span>
          {" "}
          Don't have an account? <strong onClick={register}>Sign Up </strong>
        </span>
      </div>
    </div>
  );
}

export default Login;
