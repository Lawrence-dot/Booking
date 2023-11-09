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
import { TbLock, TbMail } from "react-icons/tb";

function Login() {
  const navigate: NavigateFunction = useNavigate();
  const login = useContext<HomeType | null>(HomeContext);
  const [mail, setmail] = useState<HTMLInputElement>();
  const [pass, setpass] = useState<HTMLInputElement>();
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
    logusers();
    if (mail?.value && pass?.value) {
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
            console.log(ress);
            navigate("/dashBoard", {
              state: {
                data: ress,
              },
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      })();
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

        <button
          className="bg-blue-700 my-3 rounded-md text-white p-2"
          onClick={signin}
        >
          {" "}
          Log in{" "}
        </button>
      </div>

      {/* <form
        method="post"
        action="https://vistor-booking.onrender.com/api/login/"
      >
        <div className="login-box my-3">
          <FormControl>
            <InputLabel className="flex flex-row" htmlFor="email-ref">
              <div className="flex">
                {" "}
                <TbMail className="mr-1" size={"22px"} />
                Email
              </div>
            </InputLabel>
            <OutlinedInput
              error={mailerror ? true : false}
              id="email-ref"
              type={"text"}
              label="Emailedd"
              className="rounded-md"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  ></IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div className="login-box my-3">
          <FormControl variant="outlined">
            <InputLabel
              className="flex flex-row"
              htmlFor="outlined-adornment-password"
            >
              <div className="flex">
                {" "}
                <TbLock className="mr-1" size={"22px"} />
                Password
              </div>
            </InputLabel>
            <OutlinedInput
              error={passerror ? true : false}
              id="pass-ref"
              type={showPassword ? "text" : "password"}
              className="rounded-md"
              label="Paswordddd."
              onClick={() => setpasserror(false)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div className="flex flex-row mt-2 mb-3">
          <input type="checkbox" name="" id="" />
          <p className="ml-1 cursor-pointer"> Remember Me </p>
          <p className="ml-auto cursor-pointer"> Forgot Password </p>
        </div>

        <div className="flex signinc my-3">
          <button
            onClick={signin}
            className={`bg-black w-full flex justify-center ${
              loaded && "bg-white"
            } signinbtn rounded-md mb-3 text-sm text-white py-2 hover:bg-white border-2 hover:text-black border-black`}
          >
            Sign In
            <span className="signarrow">
              {" "}
              <BsArrowRight className="mt-1 ml-1 font-bold" />{" "}
            </span>
          </button>
          <hr />
        </div>

        <div className="loginsocials mb-5">
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
      </form> */}

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
