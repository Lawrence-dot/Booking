import axios from "axios";
import React, { RefObject, useEffect, useRef, useState } from "react";

export interface userinfo {
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  username: string;
}

function Users() {
  const [users, setusers] = useState<userinfo[]>([]);
  const userref: RefObject<HTMLInputElement> | null = useRef(null);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://vistor-booking.onrender.com/api/user/",
    })
      .then((res) => {
        setusers(res.data);
      })
      .catch(function (response) {
        console.log(response.message);
      });
  });

  var filtered: userinfo[] = [];

  const searchusers = () => {
    if (userref!.current!.value.replace(/[ ]/g, "").length > 0) {
      filtered = users.filter((each) => {
        return (
          userref!.current!.value === each.email ||
          userref!.current!.value === each.last_name ||
          userref!.current!.value === each.first_name ||
          userref!.current!.value === each.middle_name
        );
      });
    }
  };

  return (
    <div
      className="contentmain hidden dark:bg-blk transition-all rounded-d"
      id="users"
    >
      <div className="tablediv">
        <h2 className="mb-5 font-bold"> User Information </h2>
        <input
          placeholder="Search Users"
          className="my-3 border p-1"
          type="text"
          ref={userref}
          onChange={searchusers}
        />
        <table className="visitor">
          <thead>
            <th>S/N</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Middle Name </th>
            <th>Last Name</th>
            <th>Username </th>
          </thead>
          <tbody>
            {filtered.length > 0
              ? filtered.map((each, index) => {
                  return (
                    <tr>
                      <td> {index + 1} </td>
                      <td>{each.email}</td>
                      <td>{each.first_name}</td>
                      <td>{each.middle_name}</td>
                      <td>{each.last_name}</td>
                      <td>{each.username}</td>
                    </tr>
                  );
                })
              : users.map((each, index) => {
                  return (
                    <tr>
                      <td> {index + 1} </td>
                      <td>{each.email}</td>
                      <td>{each.first_name}</td>
                      <td>{each.middle_name}</td>
                      <td>{each.last_name}</td>
                      <td>{each.username}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
