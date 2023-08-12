import { useState } from "react";

import Header from "./components/header/header";
import InputUser from "./components/inputUser/inputUser";
import ChannelData from "./components/channelData/channelData";
import LastVideos from "./components/lastVideos/lastVideos";

function App() {

  const [channelName, setChannelName] = useState();
  const [channelData, setChannelData] = useState();

  async function getChannelData(){
    try {
      const urlResponse = await fetch(`http://localhost:3030/api/statistics/${channelName}`)
      const response = await urlResponse.json();

      setChannelData(response);
      // console.log(channelData);
      console.log(response);
      
    } catch (error) {
      console.error(error);
    }
  } 

  return (
    <div className="bg-[#0B090A] min-h-screen">
      <Header />
      <div className="flex justify-center gap-4 py-8">
        <ChannelData />
        <InputUser getChannelData={getChannelData} setChannelName={setChannelName}/>
      </div>
      <LastVideos />
    </div>
  );
}

export default App;
