import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function Task({ task, onDelete }) {
  // Path to your audio file (update the path accordingly)
  // const alarmSound = new Audio("/sound/sound.wav");
  const alarmSound = new Audio(
    "https://dhananjaybhatia.github.io/TaskTracker/sound/sound.wav"
  );

  // const alarmSound = new Audio(`${process.env.PUBLIC_URL}/sound/sound.wav`);

  // Function to trigger an alarm based on task's reminder time
  const triggerAlarm = () => {
    const currentTime = new Date().getTime(); // Get current time in milliseconds
    const taskTime = new Date(task.date).getTime(); // Get task's date/time in milliseconds
    const reminderTime = task.reminder * 60000; // Convert reminder time from minutes to milliseconds

    // Calculate the exact time the reminder should trigger
    const reminderTriggerTime = taskTime - reminderTime;

    // Calculate the time difference between now and when the reminder should trigger
    const timeDifference = reminderTriggerTime - currentTime;

    if (timeDifference > 0) {
      // Reminder is in the future, set a timeout for it
      setTimeout(() => {
        alarmSound.play();
        alert(`Reminder: ${task.text}`);
        alarmSound.pause(); // Pause the alarm sound after the alert is closed
        alarmSound.currentTime = 0; // Reset sound to the beginning
      }, timeDifference);
    } else {
      console.log("Reminder time has already passed, no alarm will be set.");
    }
  };

  // Format the date using the custom format function
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Ensures AM/PM format
    };
    return new Intl.DateTimeFormat("en-AU", options).format(
      new Date(dateString)
    );
  };

  // Use effect to trigger the alarm when the task is loaded or the reminder changes
  useEffect(() => {
    if (task.reminder && task.date) {
      triggerAlarm(); // Trigger the alarm if a reminder is set and there's a valid date
    }
  }, [task.date, task.reminder]);

  return (
    <div className="mt-2 py-6 px-4 bg-slate-100">
      <h3 className="font-bold text-xl font-sans flex justify-between">
        {task.text}
        <FaTimes
          className="text-red-500 text-2xl cursor-pointer hover:scale-125 transform transition-transform"
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{formatDate(task.date)}</p> {/* Display the formatted date */}
    </div>
  );
}

// import { useEffect, useRef } from "react";
// import { FaTimes } from "react-icons/fa";

// export default function Task({ task, onDelete }) {
//   // Reference to the audio element
//   const audioRef = useRef(null);

//   // Function to trigger an alarm based on task's reminder time
//   const triggerAlarm = () => {
//     const currentTime = new Date().getTime(); // Get current time in milliseconds
//     const taskTime = new Date(task.date).getTime(); // Get task's date/time in milliseconds
//     const reminderTime = task.reminder * 60000; // Convert reminder time from minutes to milliseconds

//     // Calculate the exact time the reminder should trigger
//     const reminderTriggerTime = taskTime - reminderTime;

//     // Calculate the time difference between now and when the reminder should trigger
//     const timeDifference = reminderTriggerTime - currentTime;

//     if (timeDifference > 0) {
//       // Reminder is in the future, set a timeout for it
//       setTimeout(() => {
//         // Play the alarm sound when it's time for the reminder
//         if (audioRef.current) {
//           audioRef.current.play();
//         }
//         alert(`Reminder: ${task.text}`);
//         if (audioRef.current) {
//           audioRef.current.pause();
//           audioRef.current.currentTime = 0; // Reset sound to the beginning
//         }
//       }, timeDifference);
//     } else {
//       console.log("Reminder time has already passed, no alarm will be set.");
//     }
//   };

//   // Format the date using the custom format function
//   const formatDate = (dateString) => {
//     const options = {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true, // Ensures AM/PM format
//     };
//     return new Intl.DateTimeFormat("en-AU", options).format(
//       new Date(dateString)
//     );
//   };

//   // Use effect to trigger the alarm when the task is loaded or the reminder changes
//   useEffect(() => {
//     if (task.reminder && task.date) {
//       triggerAlarm(); // Trigger the alarm if a reminder is set and there's a valid date
//     }
//   }, [task.date, task.reminder]);

//   return (
//     <div className="mt-2 py-6 px-4 bg-slate-100">
//       <h3 className="font-bold text-xl font-sans flex justify-between">
//         {task.text}
//         <FaTimes
//           className="text-red-500 text-2xl cursor-pointer hover:scale-125 transform transition-transform"
//           onClick={() => onDelete(task.id)}
//         />
//       </h3>
//       <p>{formatDate(task.date)}</p> {/* Display the formatted date */}
//       {/* Audio element with a reference */}
//       <audio ref={audioRef} src="/sound/sound.mp3" type="audio/mp3" />
//     </div>
//   );
// }
