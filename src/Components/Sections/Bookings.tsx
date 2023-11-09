import { Delete, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import { booking } from "../../Interfaces/interfaces";

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

  const editbooking = (id?: string) => {
    document.getElementById("editbooking")?.classList.toggle("hidden");
  };

  return (
    <div
      className="contentmain hidden dark:bg-blk transition-all rounded-d"
      id="bookings"
    >
      <div className="editbookings hidden" id="editbooking">
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
      </div>

      <div className="tablediv">
        <h2 className="mb-5 font-bold"> Bookings </h2>
        <table className="visitor">
          <thead>
            <td>S/N</td>
            <td>Visitors Name</td>
            <td>Booking Date </td>
            <td>Booking Time</td>
            <td></td>
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
