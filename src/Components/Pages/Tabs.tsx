import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";

interface Props {
  title: string;
  content: number | string | undefined;
  color?: string;
  balance?: boolean;
  normal?: boolean;
}

function Tabs(props: Props) {
  return (
    <div
      className={`flex border w-full sm:w-1/2 ${
        props.color === "red" ? "border-b-red-700" : "border-b-green-700"
      }  flex-col my-5 py-2`}
    >
      <h2 className="font-bold">{props.title}:</h2>

      <p className="text-sm flex text-center justify-center">
        {" "}
        {props.balance && !props.normal && (
          <TbCurrencyNaira className="mt-1" />
        )}{" "}
        {props.content}{" "}
      </p>
      <span
        className={`${
          props.color === "red"
            ? "bg-red-200 text-red-600"
            : "bg-green-200  text-green-600"
        } w-fit px-2 text-sm sm:text-md rounded-md mx-auto flex flex-row`}
      >
        {!props.balance && (
          <div className="flex">
            {" "}
            <BsGraphUp className="mt-1" /> 15%
          </div>
        )}
      </span>
    </div>
  );
}

export default Tabs;
