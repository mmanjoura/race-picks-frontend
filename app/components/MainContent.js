import React from "react";
import { useState } from "react";

const [selectedMeeting, setSelectedMeeting] = useState("Ascot Racecourse - July 25th, 2024");

const MainContent = ({meetings}) => (
  <div className="bg-gray-100 shadow-md mb-8 rounded-lg p-4" >
  <div className="flex items-center mb-4">
    <label htmlFor="meeting-select" className="mr-2">Selected Meeting</label>
    <select
      id="meeting-select"
      className="p-2 border border-gray-300 rounded"
      value={selectedMeeting}
      onChange={(e) => setSelectedMeeting(e.target.value)}
    >
      {meetings.map((meeting) => (
        <option key={meeting} value={meeting}>
          {meeting}
        </option>
      ))}
    </select>
  </div>
  <div className="px-4 py-2">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Time</th>
          <th className="py-2 px-4 border-b">Price</th>
          <th className="py-2 px-4 border-b">Event</th>
        </tr>
      </thead>
      <tbody>
        {horses?.map((horse, id) => (
          <tr key={id}>
            <td className="py-2 px-4 border-b">{horse?.horse_name}</td>
            <td className="py-2 px-4 border-b">{horse?.event_time}</td>
            <td className="py-2 px-4 border-b">{horse?.price}</td>
            <td className="py-2 px-4 border-b">{horse?.event_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
);

export default MainContent;
