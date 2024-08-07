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
  const [selectedTime, setSelectedTime] = useState(''); // Add this state
  const [runners, setRunners] = useState([]);

  // Parameters for LeftMenu
  const [settings, setSettings] = useState(defaultValues);

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [modalData, setModalData] = useState(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios.get(`${baseURL}/preparation/GetTodayMeeting`).then((response) => {
      const meetingsData = response?.data || [];
      setMeetings(meetingsData);
      if (meetingsData.length > 0) {
        setSelectedMeeting(meetingsData[0].event_name);

        // Set the first meeting time as selected
        const times = [...new Set(meetingsData[0].event_time.split(','))];
        if (times.length > 0) {
          setSelectedMeetingTime(meetingsData[0].event_time);
          setSelectedTime(times[0]);
        }
      }
    }).catch((error) => {
      console.error("Error fetching meetings:", error);
    });
  }, [baseURL]);

  useEffect(() => {
    if (selectedMeeting && selectedTime) { // Ensure both selectedMeeting and selectedTime are set
      axios.get(`${baseURL}/preparation/GetMeetingRunners`, {
        params: {
          event_name: selectedMeeting,
          event_time: selectedTime // Add event_time to the query params
        }
      }).then((response) => {
        setRunners(response?.data?.meetingData || []);
      }).catch((error) => {
        console.error("Error fetching runners:", error);
      });
    }
    console.log("runners:", runners);
  }, [selectedMeeting, selectedTime]); // Add selectedTime to the dependency array
  
  const handleMeetingChange = (event) => {
    const selectedEventName = event.target.value;
    setSelectedMeeting(selectedEventName);

    const selectedMeetingDetails = meetings.find(meeting => meeting.event_name === selectedEventName);
    const times = [...new Set(selectedMeetingDetails?.event_time.split(','))];
    setSelectedMeetingTime(selectedMeetingDetails?.event_time || '');
    if (times.length > 0) {
      setSelectedTime(times[0]);
    } else {
      setSelectedTime(''); // Reset if no times are found
    }
  };

  const handleTimeClick = (time) => {
    console.log('Selected time:', time); // Log the selected time
    setSelectedTime(time); // Update selected time
  };

  const handPickWinner = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(`${baseURL}/preparation/GetAverages_0`, {
        event_name: selectedMeeting,
        event_time: selectedTime,
        selection_id: 1,
        ...settings
      });

      setModalData(response.data); // Store the result data
      setIsModalOpen(true); // Open the modal

      console.log("Linear regression clicked", response.data);
    } catch (error) {
      console.error("Linear regression", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Helper function to get formatted day and date
  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto flex">
        <LeftMenu settings={settings} setSettings={setSettings} />
       <main className="flex-1 p-4 pt-0">

          <Hero />
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
            <div className="px-4 py-2">
              <div className="overflow-x-auto">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="min-w-full bg-white">
                    <tbody>
                      <tr className="flex justify-between items-center">
                        {[...new Set(selectedMeetingTime.split(','))].map((time, index) => (
                          <td key={index} className="px-2 py-1">
                            <a
                              href="#"
                              className={`px-2 py-1 rounded ${time === selectedTime ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </a>
                          </td>
                        ))}
                        <td className="ml-auto">
                          <button
                            onClick={handPickWinner}
                            className="bg-[#FF0000] hover:bg-[#eda0a0] text-white font-bold py-2 px-4 rounded"
                            aria-label="Calculate Probability"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                            ) : (
                              "Race Pick"
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
                        <th className="py-2 px-4 border-b text-left">Selection Name</th>
                        <th className="py-2 px-4 border-b text-left">Meeting Time</th>
                        <th className="py-2 px-4 border-b text-left">Price</th>
                        <th className="py-2 px-4 border-b text-left">Event Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {runners
                        .filter(runner => runner.event_time === selectedTime)
                        .map((runner, id) => (
                          <tr key={id} className="hover:bg-gray-200 transition-colors duration-300">
                            <td className="py-2 px-4 border-b">{runner?.selection_name}</td>
                            <td className="py-2 px-4 border-b">{runner?.event_time}</td>
                            <td className="py-2 px-4 border-b">{runner?.price}</td>
                            <td className="py-2 px-4 border-b">{runner?.event_name}</td>
                          </tr>
                        ))}
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
