// PredictionInputs.jsx
import React from 'react';

export default function PredictionInputs({
  model,
  setModel,
  distanceM,
  setDistanceM,
  distanceF,
  setDistanceF,
  distanceY,
  setDistanceY,
  yardOptions,
  totalFurlongs,
  handPickWinner,
  isLoading
}) {
  return (
    <div className="px-4 py-2">
      <div className="overflow-x-auto">
        <div className="max-h-[200px] overflow-y-auto">
          <table className="min-w-full bg-white">
            <tbody>
              <tr className="flex flex-col md:flex-row md:items-center">
                <td className="py-2 px-4">
                  <select
                    className={`p-2 border ${!model ? 'border-red-500' : 'border-gray-300'} rounded `}
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    aria-label="Select prediction model"
                  >
                    <option value="">Pick Prediction Algorithm</option>
                    <option value="0">1. Monte Carlo Simulation</option>
                    <option value="1">2. Neural Network</option>
                    <option value="2">3. S Vector Machines</option>
                  </select>
                </td>
                <td className="ml-auto mt-4 md:mt-0">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <select
                      className={`p-2 border ${!distanceM ? 'border-red-500' : 'border-gray-300'} rounded dropdown-width`}
                      value={distanceM}
                      onChange={(e) => setDistanceM(e.target.value)}
                      aria-label="Select distance in miles"
                    >
                      <option value="">Miles</option>
                      <option value="0">0m</option>
                      <option value="1">1m</option>
                      <option value="2">2m</option>
                      <option value="3">3m</option>
                    </select>
                    <select
                      className={`p-2 border ${!distanceF ? 'border-red-500' : 'border-gray-300'} rounded dropdown-width`}
                      value={distanceF}
                      onChange={(e) => setDistanceF(e.target.value)}
                      aria-label="Select distance in furlongs"
                    >
                      <option value="">Furlongs</option>
                      <option value="0">0f</option>
                      <option value="1">1f</option>
                      <option value="2">2f</option>
                      <option value="3">3f</option>
                      <option value="4">4f</option>
                      <option value="5">5f</option>
                      <option value="6">6f</option>
                      <option value="7">7f</option>
                      <option value="8">8f</option>
                      <option value="9">9f</option>
                    </select>
                    <select
                      className={`p-2 border ${!distanceY ? 'border-red-500' : 'border-gray-300'} rounded dropdown-width`}
                      value={distanceY}
                      onChange={(e) => setDistanceY(e.target.value)}
                      aria-label="Select distance in yards"
                    >
                      <option value="">Yards</option>
                      {yardOptions}
                    </select>
                    <div className="ml-4 text-gray-600">
                      {totalFurlongs.toFixed(2)}f
                    </div>
                  </div>
                </td>
                <td className="py-2 px-6">
                  <button
                    onClick={handPickWinner}
                    className="bg-[#FF0000] hover:bg-[#eda0a0] text-white font-bold py-2 px-4 rounded"
                    aria-label="Calculate Probability"
                    disabled={isLoading || !distanceM || !distanceF || !distanceY || !model}
                  >
                    {isLoading ? (
                      <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                    ) : (
                      "Pick"
                    )}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
