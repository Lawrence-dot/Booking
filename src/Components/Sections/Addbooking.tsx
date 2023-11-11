import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

function Addbooking() {
  const token = useSelector((state: RootState) => state.token.value);
  const createbooking = () => {
    (async () => {
      await axios({
        method: "post",
        url: "https://vistor-booking.onrender.com/api/list-create-booking/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          title: "me",
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
      className="Addbooking contentmain hidden dark:bg-blk transition-all rounded-d"
      id="addbooking"
    >
      <h2> Add A New Booking</h2>
      <div className="flex flex-col py-7 px-3">
        <input name="visitor_name" className="border my-2" type="text" />
        <input name="booking_time" className="border my-2" type="text" />
        <input name="booking_date" className="border my-2" type="date" />
        <select name="gender" id="">
          <option value="Male">Male</option>
        </select>
        <input name="contact" className="border my-2" type="text" />
        <input name="address" className="border my-2" type="text" />
        <input name="reason" className="border my-2" type="text" />
        <button
          onClick={createbooking}
          className="bg-blue-700 rounded-md py-2 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Addbooking;
