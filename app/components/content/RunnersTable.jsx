import React from 'react';
import '../../RunnersTable.css'; 


export default function RunnersTable({
  runners,
  hiddenRows,
  handleCheckboxChange,
  totalFurlongs,
  selectedDate
}) {

  if (!runners) {
    return null;
  }

  console.log('Runners:', runners);
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
                <th className="py-2 px-4 border-b text-left">Rest Days</th>
                <th className="py-2 px-4 border-b text-left">&#8470; Runs</th>
                <th className="py-2 px-4 border-b text-left">Duration</th>
                <th className="py-2 px-4 border-b text-left">&#8470; Wins</th>
                <th className="py-2 px-4 border-b text-left">AVR Rating</th>
                <th className="py-2 px-4 border-b text-left">AVR Position</th>
                <th className="py-2 px-4 border-b text-left">AVR Distance f</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {runners
                .sort((a, b) => b.num_runs - a.num_runs)
                .map((runner, id) => {
                  const totalRunners = runners.length;
                  const middleIndex = Math.floor(totalRunners / 2);
                 
                  // Get the first position and the first race date
                  const position = runner?.all_positions?.split(",")[0]?.trim();
                  const raceDates = runner?.all_race_dates?.split(",").map(date => date.trim());
                  const sortedRaceDates = raceDates.sort((a, b) => new Date(b) - new Date(a));
                  const selectedDateFormatted = sortedRaceDates[0].substring(0, 10);

                  // Check if the first position is 1 and the date matches the selected date
                  const isWinner = position === '1';
                  const isMatchingDate = selectedDateFormatted === selectedDate;

                  // Place the red line one row above the middle
                  const isRedLineRow = id === middleIndex - 1;

                  const isHidden = hiddenRows.includes(id);

                  // Tooltip content
                  const tooltipContent = `
                    Trending Analysis
                    \n- Optimal Distance Max: ${runner.TrendAnalysis?.OptimalDistanceMax}f 
                     \n- Optimal Distance Min: ${runner.TrendAnalysis?.OptimalDistanceMin}f                 
                  `;

                  return (
                    !isHidden && (
                      <tr
                        key={id}
                        className={`hover:bg-gray-200 transition-colors duration-300 
                                    ${isRedLineRow ? 'border-b-4 border-red-500' : ''} 
                                    ${isWinner && isMatchingDate ? 'bg-green-100' : ''}`} // Add green background if position is 1 and date matches
                      >
                        <td className="py-2 px-4 border-b">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(id)}
                            aria-label={`Hide row ${id + 1}`}
                          />
                        </td>
                        <td className="py-2 px-4 border-b" title={tooltipContent.trim()}>
                          {id + 1 + " - " + runner?.selection_name}
                        </td>
                        <td className={`py-2 px-4 border-b ${runner?.recovery_days >= 20 && runner?.recovery_days <= 50? 'text-green-500' : 'text-red-500'}`}>
                          {runner?.recovery_days}
                        </td>
                        <td className={`py-2 px-4 border-b ${runner?.num_runs > 30 ? 'text-red-500' : 'text-green-500'}`}>
                          {runner?.num_runs}
                        </td>
                        <td className={`py-2 px-4 border-b ${runner?.duration > 4 ? 'text-red-500' : 'text-green-500'}`}>
                          {runner?.duration}
                        </td>
                        <td className={`py-2 px-4 border-b ${runner?.win_count < 6 ? 'text-green-500' : 'text-red-500'}`}>
                          {runner?.win_count}
                        </td>
                        <td
                          className={`py-2 px-4 border-b ${runner?.avg_rating >= 30 && runner?.avg_rating <= 80 ? 'text-green-500' : 'text-red-500'
                            }`}
                        >
                          {runner?.avg_rating?.toFixed(2)}
                        </td>
                        <td className={`py-2 px-4 border-b ${runner?.avg_position < 5.6 ? 'text-green-500' : 'text-red-500'}`}>
                          {runner?.avg_position?.toFixed(2)}
                        </td>
                        <td
                          className={`py-2 px-4 border-b ${(Math.abs(totalFurlongs - runner?.avg_distance_furlongs) >= 1 )  ? 'text-red-500' : 'text-green-500'
                            }`}
                        >
                          {runner?.avg_distance_furlongs?.toFixed(2)}
                        </td>
                        <td
                          className={`py-2 px-4 border-b ${runner?.avg_odds >= 3 && runner?.avg_odds <= 13 ? 'text-green-500' : 'text-red-500'
                            }`}
                        >
                          {runner?.avg_odds?.toFixed(2)}
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
