'use client';
import Header from "./components/Header";
import LeftMenu from "./components/LeftMenu";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import axios from 'axios';
import ResultModal from "./components/modal/ResultModal";

const defaultValues = {
  bsp: 2,
  ppwap: 2,
  morningWap: 2,
  ppMin: 2,
  ipMin: 2,
  ppMax: 3,
  ipMax: 1.5,
  morningTradedVol: 200,
  ppTradedVol: 5900,
  ipTradedVol: 200,
  placedBefore: false
};

export default function Home() {
  const [selectedMeeting, setSelectedMeeting] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [selectedMeetingTime, setSelectedMeetingTime] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [runners, setRunners] = useState([]);
  const [settings, setSettings] = useState(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(null);

  // State for distance dropdowns
  const [distanceM, setDistanceM] = useState('');
  const [distanceF, setDistanceF] = useState('');
  const [distanceY, setDistanceY] = useState('');
  const [model, setModel] = useState('');
  const [hiddenRows, setHiddenRows] = useState([]);


  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios.get(`${baseURL}/preparation/GetTodayMeeting`).then((response) => {
      const meetingsData = response?.data || [];
      setMeetings(meetingsData);
      if (meetingsData.length > 0) {
        setSelectedMeeting(meetingsData[0].event_name);

        const times = [...new Set(meetingsData[0].event_time.split(','))];
        if (times.length > 0) {
          setSelectedMeetingTime(meetingsData[0].event_time);
          setSelectedTime(times[0]);
        }
      }
    }).catch((error) => {
      console.error("Error fetching meetings:", error);
    });
  }, []);

  useEffect(() => {
    if (selectedMeeting) {
      axios.get(`${baseURL}/preparation/GetMeetingRunners`, {
        params: { event_name: selectedMeeting, event_time: selectedTime }
      }).then((response) => {
        setRunners(response?.data?.meetingData || []);
      }).catch((error) => {
        console.error("Error fetching runners:", error);
      });
    }
  }, [selectedMeeting, selectedTime]);

  const handleMeetingChange = (event) => {
    const selectedEventName = event.target.value;
    setSelectedMeeting(selectedEventName);

    const selectedMeetingDetails = meetings.find(meeting => meeting.event_name === selectedEventName);
    const times = [...new Set(selectedMeetingDetails?.event_time.split(','))];
    setSelectedMeetingTime(selectedMeetingDetails?.event_time || '');
    if (times.length > 0) {
      setSelectedTime(times[0]);
    } else {
      setSelectedTime('');
    }
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setDistanceM('');
    setDistanceF('');
    setDistanceY('');
    setHiddenRows([]); // Unhide all rows when a new time is clicked
  };

  const calculateTotalFurlongs = () => {
    const milesToFurlongs = distanceM ? parseFloat(distanceM) * 8 : 0;
    const yardsToFurlongs = distanceY ? parseFloat(distanceY) / 220 : 0;
    const furlongs = distanceF ? parseFloat(distanceF) : 0;
    return milesToFurlongs + yardsToFurlongs + furlongs;
  };

  const handPickWinner = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/analysis/MonteCarloSimulation`, {
        event_name: selectedMeeting,
        event_time: selectedTime,
        selection_id: 1,
        ...settings,
        event_distance: `${calculateTotalFurlongs()}f` // Use total furlongs in request
      });

      setModalData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error in picking winner:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  const totalFurlongs = calculateTotalFurlongs();

  const yardOptions = [];
  for (let i = 0; i <= 220; i++) {
    yardOptions.push(
      <option key={i} value={i}>{i}y</option>
    );
  }

  const handleCheckboxChange = (id) => {
    setHiddenRows((prevHiddenRows) =>
      prevHiddenRows.includes(id)
        ? prevHiddenRows.filter((rowId) => rowId !== id) // Unhide if already hidden
        : [...prevHiddenRows, id] // Hide the row
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto flex flex-col md:flex-row">
        {/* <LeftMenu settings={settings} setSettings={setSettings} className="md:w-1/4" /> */}
        <main className="flex-1 p-4 pt-0">

          <Hero />
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
              </div>
            </div>
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

                            {/* Add more options as needed */}
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
                              {/* Add more options as needed */}
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
                              {/* Add more options as needed */}
                            </select>
                            <select
                              className={`p-2 border ${!distanceY ? 'border-red-500' : 'border-gray-300'} rounded dropdown-width`}
                              value={distanceY}
                              onChange={(e) => setDistanceY(e.target.value)}
                              aria-label="Select distance in yards"
                            >
                              <option value="">Yards</option>
                              {yardOptions}
                              {/* Add more options if needed */}
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
                            disabled={isLoading || !distanceM || !distanceF || !distanceY || !model} // Disable if any dropdown is not selected
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


            <div className="px-4 py-2">
              <div className="overflow-x-auto">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="min-w-full bg-white">
                    <caption className="sr-only">List of runners</caption>
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="py-2 px-4 border-b text-left">Hide</th> {/* Checkbox column */}
                        <th className="py-2 px-4 border-b text-left">Name</th>
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
                        .sort((a, b) => b.num_runs - a.num_runs) // Sort the runners by num_runs in descending order
                        .map((runner, id) => {
                          const totalRunners = runners.length;
                          const middleIndex = Math.floor(totalRunners / 2);
                          const isMiddleRow =
                            totalRunners % 2 === 0
                              ? id === middleIndex || id === middleIndex - 1 // Two middle rows if even
                              : id === middleIndex; // One middle row if odd

                          const isHidden = hiddenRows.includes(id);

                          return (
                            !isHidden && (
                              <tr
                                key={id}
                                className={`hover:bg-gray-200 transition-colors duration-300 ${isMiddleRow ? 'bg-green-300' : ''}`}
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
                                <td className={`py-2 px-4 border-b ${runner?.num_runs > 30 ? 'text-red-500' : 'text-green-500'}`}>
                                  {runner?.num_runs}
                                </td>
                                <td className={`py-2 px-4 border-b ${runner?.duration > 4 ? 'text-red-500' : 'text-green-500'}`}>
                                  {runner?.duration}
                                </td>
                                <td className={`py-2 px-4 border-b ${runner?.win_count > 2 ? 'text-red-500' : 'text-green-500'}`}>
                                  {runner?.win_count}
                                </td>
                                <td className={`py-2 px-4 border-b ${runner?.avg_rating >= 40 && runner?.avg_rating <= 60 ? 'text-green-500' : 'text-red-500'}`}>
                                  {runner?.avg_rating.toFixed(3)}
                                </td>
                                <td className={`py-2 px-4 border-b ${runner?.avg_position < 6 ? 'text-green-500' : 'text-red-500'}`}>
                                  {runner?.avg_position.toFixed(3)}
                                </td>
                                <td className="py-2 px-4 border-b">{runner?.avg_distance_furlongs.toFixed(3)}</td>
                                <td className="py-2 px-4 border-b">{runner?.selection_id}</td>
                              </tr>
                            )
                          );
                        })}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      <Footer />
      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
      />

      <style jsx>{`
        .spinner-border {
          border-top-color: transparent;
          border-right-color: white;
          border-bottom-color: white;
          border-left-color: white;
        }
      `}</style>
    </div>
  );
}
