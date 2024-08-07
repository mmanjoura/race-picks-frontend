import React, { useState } from "react";
import { InformationCircleIcon, CogIcon, UserIcon } from '@heroicons/react/24/outline';
import SettingsModal from "./modal/SettingsModal";
import UserModal from "./modal/UserModal";
import InfoModel from "./modal/InfoModal";

const Header = () => {
  const [SettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [UserModalOpen, setUserModalOpen] = useState(false);
  const [InfoModalOpen, setInfoModalOpen] = useState(false);



  const openSettingsModal = () => setSettingsModalOpen(true);
  const closeSettingsModal = () => setSettingsModalOpen(false);

  const openUserModal = () => setUserModalOpen(true);
  const closeUserModal = () => setUserModalOpen(false);


  const openInfoModal = () => setInfoModalOpen(true);
  const closeInfoModal = () => setInfoModalOpen(false);

  const onLoginRegister = async () => {
    try {
      const response = await axios.post(`${baseURL}/analytics/ScrapeRacesInfo`, {

      });
      console.log("Scrape Races Data clicked", response.data);
      // You can handle the response further here, e.g., show a success message, etc.
    } catch (error) {
      console.error("Scrape races info", error);
      // Handle error appropriately, e.g., show an error message to the user.
    }
  };

  return (
    <>
      <header className="bg-[#] py-4 flex-shrink-0">

        <div className="container mx-auto flex justify-between items-center">
          <img src="./images/logo-transparent-png.png" alt="Horse Race Predictor Logo" className="h-16" />
          <nav className="space-x-4 flex items-center">
            <CogIcon
              className="h-8 w-8 cursor-pointer hover:text-[#eda0a0] transition-colors duration-300"
              aria-label="Open Settings"
              onClick={openSettingsModal}
            />
            <UserIcon
              className="h-8 w-8 cursor-pointer hover:text-[#eda0a0] transition-colors duration-300"
              aria-label="Login/Register"
              onClick={openUserModal}
            />
            <InformationCircleIcon
              className="h-8 w-8 cursor-pointer  hover:text-[#eda0a0] transition-colors duration-300"
              onClick={openInfoModal}
              aria-label="Open Help"
            />
          </nav>
        </div>
      </header>

      <SettingsModal
        isOpen={SettingsModalOpen}
        onClose={closeSettingsModal}
      />

      <UserModal
        isOpen={UserModalOpen}
        onClose={closeUserModal}
      />

      <InfoModel
        isOpen={InfoModalOpen}
        onClose={closeInfoModal}
      />
    </>
  );
};

export default Header;
