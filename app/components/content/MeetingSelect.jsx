import React from 'react';
import DateSelect from './DateSelect';

const MeetingSelect = ({ selectedMeeting, handleMeetingChange, meetings, selectedDate, setSelectedDate }) => {
  return (
    <div className="bg-gray-100 shadow-md mb-8 rounded-lg p-4">
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <div className="flex-1 flex items-center gap-4">
          <select
            id="meeting-select"
            className="p-2 border border-gray-300 rounded flex-grow"
            value={selectedMeeting}
            onChange={handleMeetingChange}
            aria-label="Select a meeting"
          >
            {meetings?.map((meeting) => (
              <option key={meeting.event_name} value={meeting.selection_id}>
                {meeting.event_name}
              </option>
            ))}
          </select>
          {/* Pass the selectedDate and setSelectedDate to DateSelect */}
          <DateSelect selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
      </div>
    </div>
  );
};

export default MeetingSelect;
