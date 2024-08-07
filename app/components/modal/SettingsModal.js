import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const SettingsModal = ({ isOpen, onClose }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  if (!isOpen) return null;

  const handleDownloadMarketData = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(`${baseURL}/preparation/GetMarketData`, {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        }
      });
      console.log("Download Data files clicked", response.data);
      // Handle the response further here if needed
    } catch (error) {
      console.error("Error downloading data files", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSaveMarketData = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(`${baseURL}/preparation/SaveMarketData`, {});
      console.log("Save Historical Data clicked", response.data);
      // Handle the response further here if needed
    } catch (error) {
      console.error("Save Historical ", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const HandleSaveAnalysisData = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(`${baseURL}/preparation/SaveSelectionsForm`, {});
      console.log("SaveAnalysisData clicked", response.data);
      // Handle the response further here if needed
    } catch (error) {
      console.error("SaveAnalysisData", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleScrapeRacesInfo = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(`${baseURL}/preparation/ScrapeRacesInfo`, {});
      console.log("Scrape Races Data clicked", response.data);
      // Handle the response further here if needed
    } catch (error) {
      console.error("Scrape races info", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false); // Stop loading
    }
  };


  const handleDateChange = () => {
    console.log(`Selected Start Date: ${startDate.toDateString()}`);
    console.log(`Selected End Date: ${endDate.toDateString()}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-end">

          <button
            onClick={onClose}
            className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 py-2 px-2 rounded-full flex items-center justify-center w-8 h-8"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Settings</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              handleDateChange();
            }}
            className="block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
              handleDateChange();
            }}
            className="block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          onClick={handleDownloadMarketData}
          className="block w-full bg-[#3682ae]  text-white font-bold py-2 px-4 rounded mb-2 hover:bg-[#eda0a0]"
          aria-label="Calculate Probability"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
          ) : (
            "1. Download Market Data"
          )}
        </button>
        <button
          onClick={handleSaveMarketData}
          className="block w-full bg-[#3682ae]  text-white font-bold py-2 px-4 rounded mb-2 hover:bg-[#eda0a0]"
          aria-label="Calculate Probability"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
          ) : (
            "2. Save Market Data"
          )}
        </button>

        <button
          onClick={handleScrapeRacesInfo}
          className="block w-full bg-[#3682ae]  text-white font-bold py-2 px-4 rounded mb-2 hover:bg-[#eda0a0]"
          aria-label="Calculate Probability"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
          ) : (
            "3. Scrape Racing Info"
          )}
        </button>

        <button
          onClick={HandleSaveAnalysisData}
          className="block w-full bg-[#3682ae]  text-white font-bold py-2 px-4 rounded mb-2 hover:bg-[#eda0a0]"
          aria-label="Calculate Probability"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
          ) : (
            "4. Save Forms Data"
          )}
        </button>

      </div>
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
};

export default SettingsModal;
