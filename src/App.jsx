import { useEffect, useState } from "react";
// import process from 'dotenv'

import InputUser from "./components/inputUser/inputUser";
import ChannelData from "./components/channelData/channelData";
import LastVideos from "./components/lastVideos/lastVideos";
import InvalidURL from "./components/invalidURL/invalidURL";

function App() {
  const [statistics, setStatistics] = useState({});
  const [videos, setVideos] = useState();
  const url = import.meta.env.VITE_URL_BACKEND_SITE;
  const [invalidChannel, setInvalidChannel] = useState(false);
  const [siteClickabe, setSiteClickabe] = useState(true);

  async function getSubmitChannel(channel) {
    const channelID = await validadeChannel(channel);
    console.log(channel);
    console.log(channelID);
    if (!channelID) {
      setInvalidChannel(true);
      setSiteClickabe(false);
    }
    getChannelData(channelID);
  }

  async function validadeChannel(channelName) {
    if (channelName.includes("https://")) {
      // setChannelID(getMetaID(channelName));
      return await getMetaID(channelName);
    } else if (channelName.includes("/")) {
      return await getMetaID(`https://${channelName}`);
    } else {
      const linkWithName = channelName.includes("@")
        ? `https://www.youtube.com/${channelName}`
        : `https://www.youtube.com/@${channelName}`;

      if (!(await getMetaID(linkWithName))) {
        const linkWithID = `https://www.youtube.com/channel/${channelName}`;
        return await getMetaID(linkWithID);
      }
      return await getMetaID(linkWithName);
    }
  }

  async function getMetaID(link) {
    if (IsYoutubeLink(link)) {
      const URLResponse = await fetch(
        `https://api.codetabs.com/v1/proxy?quest=${link}`
      );
      const response = await URLResponse.text();

      let array = response.split('<meta itemprop="identifier" content=');

      if (array.length > 1) {
        array = array[1].split(">");
        array = array[0].split('"');
        const channel_ID = array[1];

        // console.log(channel_ID)
        return channel_ID;
      }

      return false; //console.log("Não possui a tag meta: Linha 57");
    }

    return false; //console.log("Não é um link do youtube");
  }

  function IsYoutubeLink(link) {
    console.log("Função isYtLink: " + link);
    try {
      const url = new URL(link);
      return !!url.host.match(/(^|\.)youtube.com$/);
      // return url
    } catch (err) {
      console.error(err);
    }
    return false; //console.log("não é um link valido");
  }

  async function getChannelData(channelID) {
    const statistics = await getChannelStatistics(channelID); //setstatistics
    const videodetails = await getChannelVideos(channelID); //setvideos

    if (!statistics || !videodetails) {
      console.log("Respostas: " + statistics + " e " + videodetails);
    }

    setStatistics(statistics);
    setVideos(videodetails);
  }

  async function getChannelStatistics(channelID) {
    try {
      const urlResponse = await fetch(`${url}/api/statistics/${channelID}`);
      const response = await urlResponse.json();

      return response;
    } catch (error) {
      console.log(`Erro getchannelstatistics: ${error}`);
    }
  }

  async function getChannelVideos(channelID) {
    channelID = channelID.replace(channelID[1], "U");
    try {
      const urlResponse = await fetch(`${url}/api/videos/${channelID}`);
      const response = await urlResponse.json();

      return response;
    } catch (error) {
      console.log(`Erro getchannelvideos: ${error}`);
    }
  }

  // useEffect(() => {
  //   getSubmitChannel("@duelista")
  // }, []);

  return (
    <div className="bg-[#0B090A] min-h-screen h-max">
      <InvalidURL
        invalidChannel={invalidChannel}
        setInvalidChannel={setInvalidChannel}
        setSiteClickabe={setSiteClickabe}
      />
      <div className={`${siteClickabe ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className="flex justify-center items-center flex-col lg:flex-row gap-4 pb-4 pt-1">
          <ChannelData statistics={statistics} />
          <InputUser getSubmitChannel={getSubmitChannel} />
        </div>
        <LastVideos videos={videos} />
      </div>
    </div>
  );
}

export default App;
