import React from 'react';

const DateSelect = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    console.log('Selected date:', date);
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="date"
        className="p-2 border border-gray-300 rounded"
        value={selectedDate}
        onChange={handleDateChange}
        aria-label="Select a date"
      />
    </div>
  );
};

export default DateSelect;
