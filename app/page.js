'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ParentComponent from "./components/content/ParentComponent";
import MeetingSelect from "./components/content/MeetingSelect";
import ResultModal from "./components/modal/ResultModal";
import StrikeRateGraph from "./components/content/StrikeRateGraph";

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
  const [distanceM, setDistanceM] = useState('');
  const [distanceF, setDistanceF] = useState('');
  const [distanceY, setDistanceY] = useState('');
  const [model, setModel] = useState('');
  const [hiddenRows, setHiddenRows] = useState([]);

  // Date state
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios.get(`${baseURL}/preparation/GetTodayMeeting`, {
      params: { date: selectedDate }  // Use the selectedDate here
    }).then((response) => {
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
  }, [selectedDate]);

  useEffect(() => {
    if (selectedMeeting) {
      axios.get(`${baseURL}/preparation/GetMeetingRunners`, {
        params: { event_name: selectedMeeting, event_time: selectedTime, date: selectedDate }  // Use the selectedDate here
      }).then((response) => {
        setRunners(response?.data?.meetingData || []);
      }).catch((error) => {
        console.error("Error fetching runners:", error);
      });
    }
  }, [selectedMeeting, selectedTime, selectedDate]);

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
        <main className="flex-1 p-4 pt-0">
          <Hero />
         
          <MeetingSelect
            selectedMeeting={selectedMeeting}
            handleMeetingChange={handleMeetingChange}
            meetings={meetings}
            selectedDate={selectedDate}      // Pass selectedDate
            setSelectedDate={setSelectedDate} // Pass setSelectedDate
          />
          
          <ParentComponent
            selectedTime={selectedTime}
            selectedMeetingTime={selectedMeetingTime}
            handleTimeClick={handleTimeClick}
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
            runners={runners}
            hiddenRows={hiddenRows}
            handleCheckboxChange={handleCheckboxChange}
          />
        </main>
      </div>

      <Footer />
      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
      />
    </div>
  );
}
