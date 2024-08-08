// RunnersTable.jsx
import React from 'react';

export default function RunnersTable({
  runners,
  hiddenRows,
  handleCheckboxChange,
  totalFurlongs
}) {

  if (!runners) {
    return null;
  }

  return (
    <div className="px-4 py-2">
      <div className="overflow-x-auto">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="min-w-full bg-white">
            <caption className="sr-only">List of runners</caption>
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b text-left">Hide</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Recovery Days</th>
                <th className="py-2 px-4 border-b text-left">No Runs</th>
                <th className="py-2 px-4 border-b text-left">Duration</th>
                <th className="py-2 px-4 border-b text-left">Win Count</th>
                <th className="py-2 px-4 border-b text-left">Average Rating</th>
                <th className="py-2 px-4 border-b text-left">Average Position</th>
                <th className="py-2 px-4 border-b text-left">Average Distance in f</th>
                <th className="py-2 px-4 border-b text-left">Selection_id</th>
              </tr>
            </thead>
            <tbody>
              {runners
                .sort((a, b) => b.num_runs - a.num_runs)
                .map((runner, id) => {
                  const totalRunners = runners.length;
                  const middleIndex = Math.floor(totalRunners / 2);
                  
                  // Place the red line one row above the middle
                  const isRedLineRow = id === middleIndex - 1;

                  const isHidden = hiddenRows.includes(id);

                  return (
                    !isHidden && (
                      <tr
                        key={id}
                        className={`hover:bg-gray-200 transition-colors duration-300 ${isRedLineRow ? 'border-b-4 border-red-500' : ''}`}
                      >
                        <td className="py-2 px-4 border-b">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(id)}
                            aria-label={`Hide row ${id + 1}`}
                          />
                        </td>
                        <td className="py-2 px-4 border-b">
                          {id + 1 + " - " + runner?.selection_name}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {runner?.recovery_days}
                        </td>
                        <td className={`py-2 px-4 border-b ${runner?.num_runs > 30 ? 'text-red-500' : 'text-green-500'}`}>
                          {runner?.num_runs}
                        </td>
                        <td className={`py-2 px-4 border-b ${runner?.duration > 4 ? 'text-red-500' : 'text-green-500'}`}>
                          {runner?.duration}
                        </td>
                        <td className={`py-2 px-4 border-b ${runner?.win_count < 5 ? 'text-green-500' : 'text-red-500'}`}>
                          {runner?.win_count}
                        </td>
                        <td
                          className={`py-2 px-4 border-b ${runner?.avg_rating > 50
                            ? 'text-green-500'
                            : runner?.avg_rating >= 50 && runner?.avg_rating < 70
                              ? 'text-red-500'
                              : 'text-red-500'
                            }`}
                        >
                          {runner?.avg_rating.toFixed(2)}
                        </td>
                        <td className={`py-2 px-4 border-b ${runner?.avg_position < 6 ? 'text-green-500' : 'text-red-500'}`}>
                          {runner?.avg_position.toFixed(2)}
                        </td>
                        <td
                          className={`py-2 px-4 border-b ${(totalFurlongs - runner?.avg_distance_furlongs) <= 0.25 ? 'text-red-500' : 'text-green-500'
                            }`}
                        >
                          {runner?.avg_distance_furlongs?.toFixed(2)}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {runner?.selection_id}
                        </td>
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
