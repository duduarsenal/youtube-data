import React, { useEffect, useState } from "react";

export default function ChannelData(props) {
  
  // const values = {
  //   title: " ",
  //   customUrl: " ",
  //   publishedAt: " ",
  //   subscriberCount: " ",
  //   viewCount: " ",
  //   videoCount: " "
  // }

  const [statisticsChannel, setStatisticsChannel] = useState({});
  const [sanitizeValues, setSanitizeValues] = useState({});

  function formatDate(date) {
    const dt = new Date(date);
    var options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Sao_Paulo"
  };
    const data = dt.toLocaleString("pt-BR", options);
    return data;
  }

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // useEffect(() => {
  //   if (statisticsChannel)
  // }, [])
  
  async function setValues(){
    // console.log(props.statistics);
    // setStatisticsChannel(props.statistics)
    
    const {title, customUrl, publishedAt, thumbnails, subscriberCount, viewCount, videoCount} = props.statistics;

    let dataPub = publishedAt ? formatDate(publishedAt) : " ";
    let subCount = subscriberCount ? formatNumber(subscriberCount) : " ";
    let views = viewCount ? formatNumber(viewCount) : " "
    let thumb = thumbnails ? thumbnails.medium.url : "https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"

    setSanitizeValues({title, customUrl, dataPub, thumb, subCount, views, videoCount})
  }

  useEffect(() => {
    setValues();
  }, [props.statistics])


  return (
    <section className="bg-[#111111] w-[95%] lg:w-[50%] h-max rounded-lg px-1 sm:px-8 text-white">
      <h1 className="w-full font-[700] h-12 flex items-center sm:justify-start justify-center text-[1.5rem] text-blue">
        Estatísticas do Canal
      </h1>
      <div className="flex justify-between items-center flex-col-reverse sm:flex-row">
        <ul className="flex flex-col items-start justify-center py-4">
          <div className="flex gap-2">
            <label htmlFor="subs" className="font-[600] text-blue">
              Nome do Canal:{" "}
            </label>
            <li>{sanitizeValues.title}</li>
          </div>
          <div className="flex gap-2">
            <label htmlFor="subs" className="font-[600] text-blue">
              Custom URL:{" "}
            </label>
            <li>{sanitizeValues.customUrl}</li>
          </div>
          <div className="flex gap-2">
            <label htmlFor="subs" className="font-[600] text-blue">
              Data de Criação:{" "}
            </label>
            <li>{sanitizeValues.dataPub}</li>
          </div>
          <div className="flex gap-2">
            <label htmlFor="subs" className="font-[600] text-blue">
              Inscritos:{" "}
            </label>
            <li>
              {sanitizeValues.subCount}
            </li>
          </div>
          <div className="flex gap-2">
            <label htmlFor="views" className="font-[600] text-blue">
              Visualizações:{" "}
            </label>
            <li>
              {sanitizeValues.views}
            </li>
          </div>
          <div className="flex gap-2">
            <label htmlFor="videoCount" className="font-[600] text-blue">
              Videos postados:{" "}
            </label>
            <li>
              {sanitizeValues.videoCount}
            </li>
          </div>
        </ul>
        <div>
          <img src={sanitizeValues.thumb} className="h-[150px] w-[150px] rounded-full"/>
        </div>
      </div>
    </section>
  );
}
