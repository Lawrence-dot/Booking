import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { booking } from "../../Interfaces/interfaces";
import { RootState } from "../../Store";

function Bookings() {
  const [bookings] = useState<booking[]>([
    {
      visitorname: "Lawrence",
      bookingdate: new Date().getDate().toString(),
      bookingtime: "9:10am",
      id: "everbv",
    },
    {
      visitorname: "Damilare",
      bookingdate: new Date().getDate().toString(),
      bookingtime: "10:10am",
      id: "eqqqv",
    },
    {
      visitorname: "Damilare",
      bookingdate: new Date().getDate().toString(),
      bookingtime: "10:10am",
      id: "jhfribv",
    },
  ]);

  const token = useSelector((state: RootState) => state.token.value);

  useEffect(() => {
    (async () => {
      await axios
        .get("https://vistor-booking.onrender.com/api/list-create-booking/", {
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

  const editbooking = (id?: string) => {
    document.getElementById("editbooking")?.classList.toggle("hidden");
  };

  const createbooking = () => {
    (async () => {
      await axios({
        method: "post",
        url: "https://vistor-booking.onrender.com/api/list-create-booking/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          visitor_name: "Hiyu",
          booking_time: "3:00pm",
          booking_date: "2023-04-20",
          gender: "Male",
          contact: "09063637373",
          address: "o5jho5khm5",
          reason: "to eat",
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          alert(res.message);
        });
    })();
  };

  return (
    <div
      className="contentmain hidden dark:bg-blk transition-all rounded-d"
      id="bookings"
    >
      {/* <div className="editbookings hidden" id="editbooking">
        <div className="editcontent py-3 px-4">
          <span
            className="w-8 block font-bold text-red-700 ml-auto"
            onClick={() => editbooking()}
          >
            X
          </span>
          <h2 className="text-xl font-bold rounded-md mb-3 text-blue-700">
            {" "}
            Edit Booking{" "}
          </h2>
          <form
            className="flex flex-col py-7 px-3"
            action="https://vistior-booking.onrender.com/api/register/"
            method="post"
          >
            <input name="First name" className="border my-2" type="text" />
            <input name="Middle name" className="border my-2" type="text" />
            <input name="Last name" className="border my-2" type="text" />
            <input name="Username" className="border my-2" type="text" />
            <input name="Email" className="border my-2" type="text" />
            <input name="Password" className="border my-2" type="text" />
            <input name="Password2" className="border my-2" type="text" />
            <button className="bg-blue-700 rounded-md py-2 text-white">
              Submit
            </button>
          </form>
        </div>
      </div> */}

      <button
        onClick={createbooking}
        className="p-2 cbooking ml-auto flex bg-blue-700"
      >
        +Create New Booking
      </button>

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
          <tbody>
            {bookings.map((each, index) => {
              return (
                <tr className="guesttd" key={index}>
                  <td className="mr-1"> {index + 1} </td>
                  <td> {each.visitorname} </td>
                  <td> {each.bookingdate} </td>
                  <td> {each.bookingtime} </td>
                  <td>
                    {" "}
                    <span onClick={() => editbooking(each.id)}>
                      {" "}
                      <Edit id={each.id} className="mr-2 text-blue-700" />
                    </span>
                    <span>
                      {" "}
                      <Delete className="ml-auto text-red-700" />
                    </span>
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

export default Bookings;
