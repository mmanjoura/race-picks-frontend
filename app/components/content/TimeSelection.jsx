// TimeSelection.jsx
import React from 'react';

export default function TimeSelection({ selectedTime, selectedMeetingTime, handleTimeClick }) {
  return (
    <div className="px-4 py-2">
      <div className="overflow-x-auto">
        <div className="max-h-[200px] overflow-y-auto">
          <table className="min-w-full bg-white">
            <tbody>
              <tr className="flex flex-col md:flex-row md:items-center">
                {[...new Set(selectedMeetingTime.split(','))].map((time, index) => (
                  <td key={index} className="px-2 py-1">
                    <a
                      href="#"
                      className={`block px-2 py-1 rounded ${time === selectedTime ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                      onClick={() => handleTimeClick(time)}
                    >
                      {time}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
