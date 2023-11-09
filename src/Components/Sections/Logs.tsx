import React from "react";

function Logs() {
  return (
    <div
      className="contentmain hidden dark:bg-blk transition-all rounded-d"
      id="logs"
    >
      <div className="tablediv">
        <h2 className="mb-5 font-bold"> Booking Logs </h2>
        <table className="visitor">
          <thead>
            <th>S/N</th>
            <th>Visitors Name</th>
            <th>Expected Date </th>
            <th>Expected Time</th>
            <th>Status </th>
            <th>Staff </th>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default Logs;
