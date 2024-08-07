import React from "react";

const TopMenu = () => (
  <div className="flex items-center mb-4">
    <label htmlFor="meeting-select" className="mr-2">Selected Meeting:</label>
    <select
      id="meeting-select"
      className="p-2 border border-gray-300 rounded"
    >
      {/* Replace with dynamic list of meetings */}
      <option value="Ascot Racecourse - July 25th, 2024">Ascot Racecourse - July 25th, 2024</option>
      {/* Add more options here */}
    </select>
  </div>
);

export default TopMenu;
