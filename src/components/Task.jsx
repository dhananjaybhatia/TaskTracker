import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Task({ task, onDelete }) {
  // Initialize reminder (default to false if not set)
  const [reminder, setReminder] = useState(() => {
    const storedReminder = localStorage.getItem(task.id);
    return storedReminder ? JSON.parse(storedReminder) : task.reminder || false;
  });

  const alarmSound = new Audio("/TaskTracker/sound/sound.wav");

  // Warm up the audio for Chrome autoplay restrictions
  const warmUpAudio = () => {
    alarmSound.muted = true;
    alarmSound
      .play()
      .then(() => {
        alarmSound.pause(); // Stop the muted sound
        alarmSound.muted = false; // Unmute it for later use
      })
      .catch((error) => {
        console.error("Audio warm-up failed: ", error);
      });
  };

  // Function to trigger an alarm based on task's reminder time
  const triggerAlarm = () => {
    const currentTime = new Date().getTime();
    const taskTime = new Date(task.date).getTime();
    const reminderTime = reminder * 60000; // Convert reminder time from minutes to milliseconds

    const reminderTriggerTime = taskTime - reminderTime;
    const timeDifference = reminderTriggerTime - currentTime;

    if (timeDifference > 0) {
      // Set a timeout to trigger the alarm at the correct time
      setTimeout(() => {
        alarmSound
          .play()
          .catch((error) => console.error("Audio playback failed:", error));
        alert(`Reminder: ${task.text}`);
        alarmSound.pause();
        alarmSound.currentTime = 0;
      }, timeDifference);
    } else {
      console.log("Reminder time has already passed, no alarm will be set.");
    }
  };

  // Warm up audio after user interaction
  useEffect(() => {
    const enableAudioOnInteraction = () => {
      warmUpAudio();
      window.removeEventListener("click", enableAudioOnInteraction);
    };

    window.addEventListener("click", enableAudioOnInteraction);

    return () => {
      window.removeEventListener("click", enableAudioOnInteraction);
    };
  }, []);
  // Save reminder state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(task.id, JSON.stringify(reminder));
  }, [reminder, task.id]);

  // UseEffect to trigger the alarm when the reminder is set and task date exists
  useEffect(() => {
    if (reminder && task.date) {
      triggerAlarm(); // Set the alarm when reminder is true and date is valid
    }
  }, [reminder, task.date]);

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-AU", options).format(
      new Date(dateString)
    );
  };

  return (
    <div className="mt-2 py-6 px-4 bg-slate-100">
      <h3 className="font-bold text-xl font-sans flex justify-between">
        {task.text}
        <FaTimes
          className="text-red-500 text-2xl cursor-pointer hover:scale-125 transform transition-transform"
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{formatDate(task.date)}</p>
      {/* Conditionally render the reminder label with a red dot if reminder is set */}
      {reminder && (
        <div className="flex items-center">
          <span className="w-2 h-2 bg-red-600 rounded-full inline-block mr-2"></span>
          <span>Reminder</span>
        </div>
      )}
    </div>
  );
}
