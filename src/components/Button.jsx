import React from "react";

export default function Button({ color, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-6 text-xl hover:scale-105 transform transition-transform rounded-md outline-none ${color}`}
    >
      {text}
    </button>
  );
}
