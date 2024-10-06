import React from "react";
import Button from "./Button";

export default function Header({ onAdd, showAdd }) {
  const onClick = () => {
    console.log("Click");
  };

  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="font-bold text-4xl">Task Tracker</h1>
      <Button
        color={
          showAdd
            ? "bg-red-600 text-white font-semibold"
            : "bg-green-800 text-white font-semibold"
        }
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </div>
  );
}
