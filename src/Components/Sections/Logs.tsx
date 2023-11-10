import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

export interface listbookings {
  owner: {
    email: string;
    first_name: string;
    last_name: string;
  };
  visitor_name: string;
  booking_time: string;
  booking_date: string;
  gender: "Male" | "Female";
  contact: string;
  address: string;
  reason: string;
  status: string;
  slug: string;
  cancelled_date: string;
  check_in: string;
  check_out: string;
}

function Logs() {
  const token = useSelector((state: RootState) => state.token.value);
  // const login = useSelector((state: RootState) => state.login.value);
  const [bookings, setbookings] = useState<listbookings[]>([]);

  useEffect(() => {
    (async () => {
      await axios
        .get("https://vistor-booking.onrender.com/api/list-all-booking/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setbookings(res.data);
        })
        .catch((res) => {
          alert(res.message);
        });
    })();
  });
  return (
    <div
      className="contentmain hidden dark:bg-blk transition-all rounded-d"
      id="logs"
    >
      <div className="tablediv">
        <h2 className="mb-5 font-bold"> Booking Logs </h2>
        <table className="visitor">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Visitors Name</th>
              <th>Expected Date </th>
              <th>Expected Time</th>
              <th>Status </th>
              <th>Staff </th>
              <th>Reason </th>
              <th> Address </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((each, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{each.visitor_name}</td>
                  <td>{each.booking_time} </td>
                  <td>{each.booking_date}</td>
                  <td>{each.status} </td>
                  <td>{each.owner.first_name} </td>
                  <td> {each.reason} </td>
                  <td> {each.address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Logs;
