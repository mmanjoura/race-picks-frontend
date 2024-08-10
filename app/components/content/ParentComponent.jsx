// ParentComponent.jsx
import React from 'react';
import TimeSelection from './TimeSelection';
import PredictionInputs from './PredictionInputs';
import RunnersTable from './RunnersTable';

export default function ParentComponent({
  selectedTime,
  selectedMeetingTime,
  handleTimeClick,
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
  isLoading,
  runners,
  hiddenRows,
  handleCheckboxChange,
  selectedDate
}) {
  return (
    <div className="parent-component">
      <TimeSelection
        selectedTime={selectedTime}
        selectedMeetingTime={selectedMeetingTime}
        handleTimeClick={handleTimeClick}
      />
      <PredictionInputs
        model={model}
        setModel={setModel}
        distanceM={distanceM}
        setDistanceM={setDistanceM}
        distanceF={distanceF}
        setDistanceF={setDistanceF}
        distanceY={distanceY}
        setDistanceY={setDistanceY}
        yardOptions={yardOptions}
        totalFurlongs={totalFurlongs}
        handPickWinner={handPickWinner}
        isLoading={isLoading}
      />
      <RunnersTable
        runners={runners}
        hiddenRows={hiddenRows}
        handleCheckboxChange={handleCheckboxChange}
        totalFurlongs={totalFurlongs}
        selectedDate={selectedDate}
      />
    </div>
  );
}
