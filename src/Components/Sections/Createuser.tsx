import axios from "axios";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

function Createuser() {
  const token = useSelector((state: RootState) => state.token.value);
  const mailref = useRef<HTMLInputElement>(null);
  const nameref = useRef<HTMLInputElement>(null);
  const firstref = useRef<HTMLInputElement>(null);
  const middleref = useRef<HTMLInputElement>(null);
  const lastref = useRef<HTMLInputElement>(null);
  const passref = useRef<HTMLInputElement>(null);
  const cpassref = useRef<HTMLInputElement>(null);

  const createUser = () => {
    axios({
      method: "post",
      url: "https://vistor-booking.onrender.com/api/user/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: mailref.current!.value,
        first_name: firstref.current!.value,
        last_name: lastref.current!.value,
        middle_name: middleref.current!.value,
        username: nameref.current!.value,
        password: passref.current!.value,
        password2: cpassref.current!.value,
      },
    })
      .then(() => {
        mailref!.current!.value = "";
        firstref!.current!.value = "";
        lastref!.current!.value = "";
        middleref!.current!.value = "";
        nameref!.current!.value = "";
        passref!.current!.value = "";
        cpassref!.current!.value = "";
      })
      .catch((response) => {
        alert(response.message);
      });
  };

  return (
    <div
      className="Addnew contentmain hidden dark:bg-blk transition-all rounded-d"
      id="createuser"
    >
      <div className="userinfo flex flex-col">
        <input
          className="my-2 p-2 border"
          type="text"
          placeholder="Username"
          id="username"
          ref={nameref}
        />
        <input
          className="my-2 p-2 border"
          type="text"
          placeholder="Email"
          id="email"
          ref={mailref}
        />
        <input
          className="my-2 p-2 border"
          type="text"
          placeholder="First Name"
          id="first_name"
          ref={firstref}
        />
        <input
          className="my-2 p-2 border"
          type="text"
          placeholder="Middle Name"
          id="middle_name"
          ref={middleref}
        />
        <input
          className="my-2 p-2 border"
          type="text"
          placeholder="Last Name"
          id="last__name"
          ref={lastref}
        />
        <input
          className="my-2 p-2 border"
          type="text"
          placeholder="Password"
          id="password"
          ref={passref}
        />
        <input
          className="my-2 p-2 border"
          type="text"
          placeholder="Confirm Password"
          id="password2"
          ref={cpassref}
        />
      </div>
      <button className="rounded-sm p-2 cbooking" onClick={createUser}>
        Add New User
      </button>
    </div>
  );
}

export default Createuser;
