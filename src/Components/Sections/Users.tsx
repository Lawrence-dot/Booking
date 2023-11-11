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
  slug: string;
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
      .catch((response) => {
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
    }
  };

  const editUser = (slug: string) => {
    axios({
      method: "patch",
      url: `https://vistor-booking.onrender.com/api/${slug}/user/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        first_name: "string12",
        last_name: "22",
        middle_name: "string",
        username: "strijjjng",
        email: "usker@example.com",
        password: "string",
        password2: "string",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((response) => {
        console.log(response.message);
      });
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
                          <span
                            className="mr-2 text-blue-700"
                            onClick={() => editUser(each.slug)}
                          >
                            Edit
                          </span>
                          <span className="text-red-700">Delete</span>
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
