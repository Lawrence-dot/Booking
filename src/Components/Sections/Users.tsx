import axios from "axios";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

export interface userinfo {
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  username: string;
}

function Users() {
  const token = useSelector((state: RootState) => state.token.value);
  const [users, setusers] = useState<userinfo[]>([]);
  const userref: RefObject<HTMLInputElement> | null = useRef(null);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://vistor-booking.onrender.com/api/user/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setusers(res.data);
      })
      .catch(function (response) {
        alert(response.message);
      });
  });

  // const createUser = () => {
  //   axios({
  //     method: "get",
  //     url: "https://vistor-booking.onrender.com/api/user/",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       setusers(res.data);
  //     })
  //     .catch(function (response) {
  //       console.log(response.message);
  //     });
  // };

  const [filtered, setfiltered] = useState<userinfo[]>([]);

  const searchusers = () => {
    console.log(userref!.current!.value.replace(/[ ]/g, "").length);

    if (userref!.current!.value.replace(/[ ]/g, "").length > 0) {
      setfiltered(
        users.filter((each) => {
          console.log(
            userref!.current!.value.replace(/[ ]/g, "").toLowerCase(),
            each.email.toLowerCase()
          );
          return (
            each.email
              .toLowerCase()
              .includes(
                userref!.current!.value.replace(/[ ]/g, "").toLowerCase()
              ) ||
            each.last_name
              .toLowerCase()
              .includes(
                userref!.current!.value.replace(/[ ]/g, "").toLowerCase()
              ) ||
            each.first_name
              .toLowerCase()
              .includes(
                userref!.current!.value.replace(/[ ]/g, "").toLowerCase()
              ) ||
            each.middle_name
              .toLowerCase()
              .includes(
                userref!.current!.value.replace(/[ ]/g, "").toLowerCase()
              )
          );
        })
      );

      console.log(filtered);
    }
  };

  const editUser = (id: any) => {};

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
            <tr>
              <th>S/N</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Middle Name </th>
              <th>Last Name</th>
              <th>Username </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0
              ? filtered.map((each, index) => {
                  return (
                    <tr key={index}>
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
                    <tr key={index}>
                      <td> {index + 1} </td>
                      <td>{each.email}</td>
                      <td>{each.first_name}</td>
                      <td>{each.middle_name}</td>
                      <td>{each.last_name}</td>
                      <td>{each.username}</td>
                      <td>
                        <div className="flex flex-row">
                          <span onClick={() => editUser(1)}>Edit</span>
                          <span>Delete</span>
                        </div>
                      </td>
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
