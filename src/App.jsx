import { useState } from "react";

import InputUser from "./components/inputUser/inputUser";
import ChannelData from "./components/channelData/channelData";
import LastVideos from "./components/lastVideos/lastVideos";
import InvalidURL from "./components/invalidURL/invalidURL";
import Loading from "./components/loading/loading";
const url = import.meta.env.VITE_URL_BACKEND

function App() {
  const [statistics, setStatistics] = useState({})
  const [videos, setVideos] = useState()
  const [invalidChannel, setInvalidChannel] = useState(false)
  const [siteClickabe, setSiteClickabe] = useState(true)
  const [loading, setLoading] = useState(false)

  async function getSubmitChannel(channel) {
    setLoading(true)
    const channelID = await validadeChannel(channel)
    if (!channelID) {
      setLoading(false)
      setInvalidChannel(true)
      setSiteClickabe(false)
    }
    getChannelData(channelID)
  }

  async function validadeChannel(channelName) {
    if (channelName.includes("https://")) {
      return await getMetaID(channelName)
    } else if (channelName.includes("/")) {
      return await getMetaID(`https://${channelName}`)
    } else {
      const linkWithName = channelName.includes("@")
        ? `https://www.youtube.com/${channelName}`
        : `https://www.youtube.com/@${channelName}`

      if (!(await getMetaID(linkWithName))) {
        const linkWithID = `https://www.youtube.com/channel/${channelName}`
        return await getMetaID(linkWithID)
      }
      return await getMetaID(linkWithName)
    }
  }

  async function getMetaID(link) {
    if (IsYoutubeLink(link)) {
      const URLResponse = await fetch(
        `https://api.codetabs.com/v1/proxy?quest=${link}`
      );
      const response = await URLResponse.text()

      let array = response.split('<meta itemprop="identifier" content=')

      if (array.length > 1) {
        array = array[1].split(">")
        array = array[0].split('"')
        const channel_ID = array[1]

        return channel_ID;
      }

      return false; //console.log("Não possui a tag meta: Linha 57")
    }

    return false; //console.log("Não é um link do youtube")
  }

  function IsYoutubeLink(link) {
    try {
      const url = new URL(link);
      return !!url.host.match(/(^|\.)youtube.com$/);
    } catch (err) {
      console.error(err);
    }
    return false; //console.log("não é um link valido")
  }

  async function getChannelData(channelID) {
    const statistics = await getChannelStatistics(channelID) //setstatistics
    const videodetails = await getChannelVideos(channelID) //setvideos

    setLoading(false);
    setStatistics(statistics);
    setVideos(videodetails);
  }

  async function getChannelStatistics(channelID) {
    try {
      const urlResponse = await fetch(`${url}/api/statistics/${channelID}`)
      const response = await urlResponse.json()

      return response
    } catch (error) {
      console.log(`Erro getchannelstatistics: ${error}`)
    }
  }

  async function getChannelVideos(channelID) {
    channelID = channelID.replace(channelID[1], "U")
    try {
      const urlResponse = await fetch(`${url}/api/videos/${channelID}`)
      const response = await urlResponse.json()

      return response;
    } catch (error) {
      console.log(`Erro getchannelvideos: ${error}`)
    }
  }

  return (
    <div className="bg-[#0B090A] min-h-screen h-max">
      <InvalidURL
        invalidChannel={invalidChannel}
        setInvalidChannel={setInvalidChannel}
        setSiteClickabe={setSiteClickabe}
      />
      <Loading loading={loading}/>
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
