'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import LeftMenu from './components/LeftMenu';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ResultModal from './components/modal/ResultModal';

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
  placedBefore: false,
};

export default function Home() {
  const [selectedMeeting, setSelectedMeeting] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [runners, setRunners] = useState([]);
  const [settings, setSettings] = useState(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(null);

  // State for distance dropdowns
  const [distanceM, setDistanceM] = useState('');
  const [distanceF, setDistanceF] = useState('');
  const [distanceY, setDistanceY] = useState('');

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchMeetings();
  }, [baseURL]);

  useEffect(() => {
    if (selectedMeeting && selectedTime) {
      fetchRunners(selectedMeeting, selectedTime);
    }
  }, [selectedMeeting, selectedTime, baseURL]);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(`${baseURL}/preparation/GetTodayMeeting`);
      const meetingsData = response?.data || [];
      setMeetings(meetingsData);

      if (meetingsData.length > 0) {
        setSelectedMeeting(meetingsData[0].event_name);
        const times = parseEventTimes(meetingsData[0].event_time);
        if (times.length > 0) {
          setSelectedTime(times[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const fetchRunners = async (meeting, time) => {
    try {
      const response = await axios.get(`${baseURL}/preparation/GetMeetingRunners`, {
        params: { event_name: meeting, event_time: time },
      });
      setRunners(response?.data?.meetingData || []);
    } catch (error) {
      console.error('Error fetching runners:', error);
    }
  };

  const parseEventTimes = (eventTimeString) => {
    return [...new Set(eventTimeString.split(','))];
  };

  const handleMeetingChange = (event) => {
    const selectedEventName = event.target.value;
    setSelectedMeeting(selectedEventName);

    const selectedMeetingDetails = meetings.find(meeting => meeting.event_name === selectedEventName);
    const times = parseEventTimes(selectedMeetingDetails?.event_time || '');
    if (times.length > 0) {
      setSelectedTime(times[0]);
    } else {
      setSelectedTime('');
    }
  };

  const handleTimeClick = (time, event) => {
    event.preventDefault(); // Prevent default link behavior
    setSelectedTime(time);
    fetchRunners(selectedMeeting, time);

    // Reset distance fields
    setDistanceM('');
    setDistanceF('');
    setDistanceY('');
  };

  const handPickWinner = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/analysis/MonteCarloSimulation`, {
        event_name: selectedMeeting,
        event_time: selectedTime,
        selection_id: 1,
        ...settings,
        event_distance: `${distanceM}m ${distanceF}f ${distanceY}y`, // Add distance to request
      });

      setModalData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error in picking winner:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  const formatDistance = (furlongs) => {
    const FURLONGS_PER_MILE = 8;
    const YARDS_PER_FURLONG = 220;
    const miles = Math.floor(furlongs / FURLONGS_PER_MILE);
    const remainingFurlongs = furlongs % FURLONGS_PER_MILE;
    const remainingYards = remainingFurlongs * YARDS_PER_FURLONG;

    return `${miles}m ${remainingFurlongs.toFixed(1)}f ${remainingYards.toFixed(2)}y`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto flex">
        <LeftMenu settings={settings} setSettings={setSettings} />
        <main className="flex-1 p-4 pt-0">
          <Hero />
          {runners.length === 0 ? (
            <div>
              <center><p>Still Processing Today Events and selections.</p></center>
            </div>
          ) : (
            <>
              <br />
              <div className="bg-gray-100 shadow-md mb-8 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="flex-1 flex items-center gap-4">
                    <select
                      id="meeting-select"
                      className="p-2 border border-gray-300 rounded flex-grow"
                      value={selectedMeeting}
                      onChange={handleMeetingChange}
                      aria-label="Select a meeting"
                    >
                      {meetings?.map((meeting) => (
                        <option key={meeting.event_name} value={meeting.event_name}>
                          {meeting.event_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-red-600 text-sm text-right">
                  {!distanceM || !distanceF || !distanceY ? (
                    <div className="text-red-600 text-sm text-right mr-80">
                      Please select meeting distance to proceed
                    </div>
                  ) : null}
                </div>

                <div className="px-4 py-2">
                  <div className="overflow-x-auto">
                    <div className="max-h-[200px] overflow-y-auto">
                      <table className="min-w-full bg-white">
                        <tbody>
                          <tr className="flex justify-between items-center">
                            {[...new Set(selectedMeeting?.split(','))].map((time, index) => (
                              <td key={index} className="px-2 py-1">
                                <a
                                  href="#"
                                  className={`px-2 py-1 rounded ${time === selectedTime ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                                  onClick={(event) => handleTimeClick(time, event)}
                                >
                                  {time}
                                </a>
                              </td>
                            ))}
                            <td className="ml-auto">
                              <div className="flex gap-4 mt-4 pb-4 items-center">
                                <select
                                  className="p-2 border border-gray-300 rounded"
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
                                  className="p-2 border border-gray-300 rounded"
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
                                  className="p-2 border border-gray-300 rounded"
                                  value={distanceY}
                                  onChange={(e) => setDistanceY(e.target.value)}
                                  aria-label="Select distance in yards"
                                >
                                  <option value="">Yards</option>
                                  <option value="0">0y</option>
                                  <option value="1">1y</option>
                                  <option value="2">2y</option>
                                  <option value="3">3y</option>
                                  <option value="4">4y</option>
                                  <option value="5">5y</option>
                                  <option value="10">10y</option>
                                  <option value="20">20y</option>
                                  <option value="30">30y</option>
                                  <option value="40">40y</option>
                                  <option value="50">50y</option>
                                  <option value="60">60y</option>
                                  <option value="70">70y</option>
                                  <option value="80">80y</option>
                                  <option value="90">90y</option>
                                  <option value="100">100y</option>
                                </select>
                              </div>
                            </td>
                            <td className="ml-auto">
                              <button
                                onClick={handPickWinner}
                                className="bg-[#FF0000] hover:bg-[#eda0a0] text-white font-bold py-2 px-4 rounded"
                                aria-label="Calculate Probability"
                                disabled={isLoading || !distanceM || !distanceF || !distanceY}
                              >
                                {isLoading ? (
                                  <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                                ) : (
                                  'Race Pick'
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
                    <div className="max-h-[600px] overflow-y-auto">
                      <table className="min-w-full bg-white">
                        <caption className="sr-only">List of runners</caption>
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="py-2 px-4 border-b text-left">Selection Id</th>
                            <th className="py-2 px-4 border-b text-left">Selection Name</th>
                            <th className="py-2 px-4 border-b text-left">Num of Runs</th>
                            <th className="py-2 px-4 border-b text-left">Average Position</th>
                            <th className="py-2 px-4 border-b text-left">Average Distance</th>
                            <th className="py-2 px-4 border-b text-left">Average Odds</th>
                          </tr>
                        </thead>
                        <tbody>
                          {runners.sort((a, b) => b.num_runs - a.num_runs).map((runner, id) => (
                            <tr key={id} className="hover:bg-gray-200 transition-colors duration-300">
                              <td className="py-2 px-4 border-b">{runner?.selection_id}</td>
                              <td className="py-2 px-4 border-b">{id + 1 + ' - ' + runner?.selection_name}</td>
                              <td className="py-2 px-4 border-b">{runner?.num_runs}</td>
                              <td className="py-2 px-4 border-b">{runner?.avg_position.toFixed(3)}</td>
                              <td className="py-2 px-4 border-b">{formatDistance(runner?.avg_distance_furlongs)}</td>
                              <td className="py-2 px-4 border-b">{runner?.avg_odds.toFixed(3)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
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
