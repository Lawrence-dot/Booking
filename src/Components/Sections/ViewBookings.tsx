import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

function ViewBookings() {
  const token = useSelector((state: RootState) => state.token.value);

  useEffect(() => {
    (async () => {
      await axios
        .get("https://vistor-booking.onrender.com/api/list-all-booking/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          alert(res.message);
        });
    })();
  });
  return (
    <div className="tablediv">
      <h2 className="mb-5 font-bold"> Bookings </h2>
      <table className="visitor">
        <thead>
          <tr>
            {" "}
            <td>S/N</td>
            <td>Visitors Name</td>
            <td>Booking Date </td>
            <td>Booking Time</td>
            <td></td>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default ViewBookings;
