// import React from "react";
// import { useState } from "react";

// export default function AddTask({ onAdd }) {
//   const [text, setText] = useState("");
//   const [date, setDate] = useState("");
//   const [reminder, setReminder] = useState(false);

//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (!text) {
//       alert("Please add a task");
//       return;
//     }
//     if (!date) {
//       alert("Please add a date and time");
//       return;
//     }

//     const taskReminder = reminder === "" ? null : parseInt(reminder, 10); // Convert to integer, or null if no reminder

//     onAdd({ text, date, reminder: taskReminder });

//     setText("");
//     setDate("");
//     setReminder(""); // Reset reminder to no reminder after submit
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <div className="mt-8">
//         <label className="font-bold text-2xl">Add Task :</label>
//         <input
//           type="text"
//           placeholder="Add Task"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className=" py-4 px-2 border-2 border-slate-600 w-full h-12 mt-2 outline-none"
//         />
//       </div>
//       <div className="mt-6">
//         <label className="font-bold text-2xl">Date & Time :</label>
//         <input
//           type="datetime-local"
//           placeholder="Add Date & Time"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className=" py-4 px-2 border-2 border-slate-600 w-full h-12 mt-2 outline-none"
//         />
//       </div>
//       <div className="mt-4 flex justify-start gap-4 items-center">
//         <label className="font-bold text-2xl">Reminder :</label>
//         <select
//           value={reminder}
//           onChange={(e) => setReminder(e.target.value)}
//           className="py-2 px-4 border-2 border-gray-800 rounded-md"
//         >
//           <option value="">No Reminder</option>
//           <option value="15">15 minutes before</option>
//           <option value="30">30 minutes before</option>
//           <option value="60">1 hour before</option>
//           <option value="1440">1 day before</option>
//         </select>
//       </div>

//       <button
//         type="submit"
//         className="w-full text-center bg-orange-500 font-semibold h-12 rounded-md mt-4 mb-4 text-2xl text-white cursor-pointer"
//       >
//         Save Task
//       </button>
//     </form>
//   );
// }

import React, { useState, useEffect } from "react";

export default function AddTask({ onAdd }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState(false);
  const [minDateTime, setMinDateTime] = useState("");

  // Set the min date and time to the current date and time (for the datetime-local input)
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:MM' for datetime-local
    setMinDateTime(formattedDate);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }

    if (!date) {
      alert("Please add a date and time");
      return;
    }

    const selectedDateTime = new Date(date);
    const currentDateTime = new Date();

    // Check if the selected date is in the past
    if (selectedDateTime < currentDateTime) {
      alert("Please select a future date and time.");
      return;
    }

    const taskReminder = reminder === "" ? null : parseInt(reminder, 10); // Convert to integer, or null if no reminder

    onAdd({ text, date, reminder: taskReminder });

    setText("");
    setDate("");
    setReminder(""); // Reset reminder to no reminder after submit
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mt-8">
        <label className="font-bold text-2xl">Add Task :</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className=" py-4 px-2 border-2 border-slate-600 w-full h-12 mt-2 outline-none"
        />
      </div>
      <div className="mt-6">
        <label className="font-bold text-2xl">Date & Time :</label>
        <input
          type="datetime-local"
          placeholder="Add Date & Time"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className=" py-4 px-2 border-2 border-slate-600 w-full h-12 mt-2 outline-none"
          min={minDateTime} // Prevent selecting a past date
        />
      </div>
      <div className="mt-4 flex justify-start gap-4 items-center">
        <label className="font-bold text-2xl">Reminder :</label>
        <select
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          className="py-2 px-4 border-2 border-gray-800 rounded-md"
        >
          <option value="">No Reminder</option>
          <option value="15">15 minutes before</option>
          <option value="30">30 minutes before</option>
          <option value="60">1 hour before</option>
          <option value="1440">1 day before</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full text-center bg-orange-500 font-semibold h-12 rounded-md mt-4 mb-4 text-2xl text-white cursor-pointer"
      >
        Save Task
      </button>
    </form>
  );
}
