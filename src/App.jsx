import React from "react";

import Header from "./components/header/header";
import InputUser from "./components/inputUser/inputUser";
import ChannelData from "./components/channelData/channelData";
import LastVideos from "./components/lastVideos/lastVideos";

function App() {
  return (
    <div className="bg-[#0B090A] min-h-screen">
      <Header />
      <div className="flex justify-center gap-4 py-8">
        <ChannelData />
        <InputUser />
      </div>
      <LastVideos />
    </div>
  );
}

export default App;
