import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Register() {
  const [error, seterror] = useState(false);

  const [Loading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // const register = () => {
  //   const auth = getAuth();
  //   if (
  //     mailref!.value.endsWith(".com") &&
  //     nameref!.value &&
  //     passref!.value.length >= 6 &&
  //     phoneref!.value.length === 11 &&
  //     passref!.value === confirmref!.value
  //   ) {
  //     const info: dataType = {
  //       Tel: Number(phoneref!.value),
  //       Balance: 0,
  //       Email: mailref!.value,
  //       Type: "User",
  //     };
  //     setLoading(true);
  //     try {
  //       createUserWithEmailAndPassword(auth, mailref!.value, passref!.value)
  //         .then(() => {
  //           setDoc(
  //             doc(
  //               db,
  //               "Users",
  //               `${mailref!.value.substring(0, mailref!.value.length - 10)}`
  //             ),
  //             info
  //           )
  //             .then(() => {
  //               ShowModal({
  //                 title: "User Created Succesfully",
  //                 type: "ok",
  //               });
  //               loader?.showPreloader();
  //               loginpage();
  //             })
  //             .finally(() => {
  //               setLoading(false);
  //             });
  //         })
  //         .catch((err) => {
  //           setLoading(false);
  //           if (
  //             err.message === "Firebase: Error (auth/email-already-in-use)."
  //           ) {
  //             alert("User Exists");
  //           } else {
  //             alert(err.message);
  //           }
  //         });
  //     } catch (error) {
  //       alert(error);
  //     }
  //   } else if (passref!.value.length < 6) {
  //     ShowModal({
  //       title: "Password Must be minimum of 6 characters",
  //       type: "ok",
  //     });
  //   } else if (passref!.value !== confirmref!.value) {
  //     ShowModal({
  //       title: "Password Mismatch",
  //       type: "ok",
  //     });
  //   } else if (!mailref!.value.endsWith(".com")) {
  //     ShowModal({
  //       title: "Enter a valid mail",
  //       type: "ok",
  //     });
  //   } else if (phoneref!.value.length !== 11) {
  //     ShowModal({
  //       title: "Enter a valid phone number",
  //       type: "ok",
  //     });
  //   } else {
  //     seterror(true);
  //     ShowModal({
  //       title: "Password Fill all blank fields correctly",
  //       type: "ok",
  //     });
  //   }
  // };

  return (
    <div className="register">
      {/* <div className="back cursor-pointer" onClick={loginpage}>
        <TbArrowLeft />
      </div> */}
      <div className="regform flex flex-col justify-center">
        <h1 className="text-left font-bold text-2xl sm:text-3xl">
          {" "}
          Sign up for an account{" "}
        </h1>
        <p className="text-left mb-2zzzzzzzzzzzz">
          Please Input your details correctly
        </p>

        <div className="register-box w-100 px-0 mx-0 my-3">
          <TextField
            error={error ? true : false}
            className="rounded-md w-100"
            id="mailref"
            label="Email"
            variant="outlined"
            onClick={() => seterror(false)}
          />
        </div>

        <div className="register-box w-100 px-0 mx-0 my-3">
          <TextField
            error={error ? true : false}
            className="rounded-md w-100"
            id="phoneref"
            label="Phone Number"
            variant="outlined"
            onClick={() => seterror(false)}
          />
        </div>

        <div className="register-box w-100 px-0 mx-0 my-3">
          <TextField
            error={error ? true : false}
            className="rounded-md w-100"
            id="regnameref"
            label="Enter Username"
            variant="outlined"
            onClick={() => seterror(false)}
          />
        </div>

        <div className="register-box my-3 mb-2">
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Enter Password
            </InputLabel>
            <OutlinedInput
              error={error ? true : false}
              type={showPassword ? "text" : "password"}
              className="rounded-md"
              id="confirmref"
              onClick={() => seterror(false)}
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
              label="Enter Password"
            />
          </FormControl>
        </div>

        <div className="register-box my-3 mb-5">
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              error={error ? true : false}
              id="passref"
              type={showPassword ? "text" : "password"}
              className="rounded-md"
              onClick={() => seterror(false)}
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
              label="Confirm Password"
            />
          </FormControl>
        </div>

        <button className="bg-black signinbtn rounded-md mb-3 text-sm text-white py-2 transition-all hover:bg-white border-2 hover:text-black border-black">
          {Loading ? (
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
          ) : (
            `Register`
          )}
        </button>
      </div>
    </div>
  );
}

export default Register;
