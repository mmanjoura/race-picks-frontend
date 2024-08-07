import React from "react";

const LeftMenu = ({ settings, setSettings }) => {
  const handleChange = (key) => (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: Number(event.target.value),
    }));
    console.log(`${key}:`, event.target.value);
  };

  const handleReset = () => {
    setSettings({
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
    });
    console.log("Reset to default values");
  };

  return (
    <aside className="w-64 bg-gray-500 text-white p-4 flex-shrink-0 rounded-lg">
      <button onClick={handleReset} className="w-full mb-4 flex items-center gap-2 bg-[#3682ae] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.7 17.2l4.6-4.6a1 1 0 00-1.41-1.41l-4.6 4.6a1 1 0 000 1.41zM8.3 14.8l5.7-5.7a1 1 0 00-1.41-1.41L7 14.8a1 1 001.41 1.41z" />
        </svg>
        Set Default Values
      </button>

      <div className="space-y-4">
        <div>
          <label className="block text-sm">Starting Price</label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={settings.bsp}
            onChange={handleChange("bsp")}
            className="w-full"
          />
          <span className="text-sm">{settings.bsp}</span>
        </div>
        <div>
          <label className="block text-sm">Pre-Play Weighted Average Price</label>
          <input
            type="range"
            min="1"
            max="6"
            step="0.1"
            value={settings.ppwap}
            onChange={handleChange("ppwap")}
            className="w-full"
          />
          <span className="text-sm">{settings.ppwap}</span>
        </div>
        <div>
          <label className="block text-sm">Morning Weighted Average Price</label>
          <input
            type="range"
            min="1"
            max="6"
            step="0.1"
            value={settings.morningWap}
            onChange={handleChange("morningWap")}
            className="w-full"
          />
          <span className="text-sm">{settings.morningWap}</span>
        </div>

        <div>
          <label className="block text-sm">Pre-Play Min</label>
          <input
            type="range"
            min="1"
            max="6"
            step="0.1"
            value={settings.ppMin}
            onChange={handleChange("ppMin")}
            className="w-full"
          />
          <span className="text-sm">{settings.ppMin}</span>
        </div>

        <div>
          <label className="block text-sm">In-Play Traded Volume</label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={settings.ipTradedVol}
            onChange={handleChange("ipTradedVol")}
            className="w-full"
          />
          <span className="text-sm">{settings.ipTradedVol}</span>
        </div>




        <div className="flex items-center mt-4">
          <label className="block text-sm mr-4">Selection Placed before</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={settings.placedBefore} onChange={() => setSettings((prevSettings) => ({ ...prevSettings, placedBefore: !prevSettings.placedBefore }))} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </aside>
  );
};

export default LeftMenu;
