import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AppContext } from "../../Container/App";
import { Apptype } from "../../Interfaces/interfaces";
import { auth } from "../../Firebase";
import { HomeContext } from "./Home";
import { HomeType } from "../../Interfaces/interfaces";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  Visibility,
  VisibilityOff,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import { GrCheckmark } from "react-icons/gr";
import { ShowModal } from "../Pages/Modal";
import { BsArrowRight } from "react-icons/bs";
import { TbLock, TbMail } from "react-icons/tb";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [passerror, setpasserror] = useState(false);
  const [mailerror, setmailerror] = useState(false);
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const login = useContext<HomeType | null>(HomeContext);
  const [mail, setmail] = useState<HTMLInputElement>();
  const [pass, setpass] = useState<HTMLInputElement>();
  const Login = useContext<Apptype | null>(AppContext);

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
    setLoading(true);
    setLoading(false);
    setLoaded(false);
    if (mail?.value && pass?.value) {
      signInWithEmailAndPassword(auth, mail.value, pass.value);
      Login!.setisloggedin(true);
      navigate("/dashBoard", {
        state: {
          data: {
            mail: `${mail.value.substring(0, mail.value.length - 10)}`,
            Username: "jfjf",
            Type: "user",
          },
        },
      });
    } else {
      if (!mail?.value && pass?.value) {
        setmailerror(true);
        ShowModal({
          title: "Please Fill In Your Email",
          type: "ok",
        });
      } else if (!pass?.value && mail?.value) {
        setpasserror(true);
        ShowModal({
          title: "Please Fill In Your Password",
          type: "ok",
        });
      } else {
        setmailerror(true);
        setpasserror(true);
        ShowModal({
          title: "Please Fill all input fields",
          type: "ok",
        });
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
            onClick={() => setmailerror(false)}
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
          {loading && !loaded ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 loadsvg w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : loaded ? (
            <div className="loaded">
              <GrCheckmark color="white" />
            </div>
          ) : (
            `Sign In`
          )}{" "}
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
