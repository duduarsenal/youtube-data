import React, { useEffect, useState } from "react";

export default function LastVideos(props) {

  const [videosChannel, setVideosChannel] = useState({});
  const [sanitizeValues, setSanitizeValues] = useState([]);

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
    // console.log(props.videos);
    // setStatisticsChannel(props.statistics)
    
    const arrayVideos = props.videos && props.videos.map(async (video) => {
      const {title, publishedAt, resourceId, viewCount, thumbnails, commentCount, likeCount} = video;
      const tempObj = {
        title: title,
        dataPub: publishedAt ? formatDate(publishedAt) : " ",
        href: resourceId ? `https://youtube.com/watch?v=${resourceId.videoId}` : "#",
        views: viewCount ? formatNumber(viewCount) : " ",
        thumb: thumbnails ? thumbnails.medium.url : "https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVkJTIwY29sb3J8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        commentCount: commentCount ? formatNumber(commentCount) : " ",
        likeCount: likeCount ? formatNumber(likeCount) : " ",
      }
      return tempObj;
    })

    arrayVideos ? setSanitizeValues(await Promise.all(arrayVideos)) : "";
    // console.log(sanitizeValues);
  }

  useEffect(() => {
    setValues();
  }, [props.videos])


  return (
    <section className="flex flex-col gap-2 h-max w-full px-4 overflow-hidden">
      <h1 className="text-[1.5rem]">Videos mais recentes</h1>
      <div className="flex flex-wrap items-center justify-evenly w-full">
      {
        sanitizeValues.map((video) => (
          <BoxVideo 
          key={video.title} 
          title={video.title}
          dataPub={video.dataPub}
          href={video.href}
          views={video.views}
          thumb={video.thumb}
          comments={video.commentCount}
          likes={video.likeCount}
          />
        ))
      }
      </div>
    </section>
  );
}

export function BoxVideo(props) {
  return (
    <article className="flex flex-col justify-between bg-[#80808015] rounded-lg px-3 py-4 my-4 w-[23rem] min-h-[25rem] h-max">
      <h1 className="text-center min-h-[4rem]">{props.title}</h1>
      <div className="w-full">
        <a href={props.href} target="_blank" className="hover:brightness-50 transition-all duration-300">
          <img src={props.thumb} className="w-full"/>
        </a>
      </div>
      <div className="flex flex-col py-2">
        <div className="flex gap-2">
          <label htmlFor="likesCount" className="font-[600] text-[#BA181B]">
            Data de publicação:{" "}
          </label>
          <p>{props.dataPub}</p>
        </div>
        <div className="flex gap-2">
          <label htmlFor="likesCount" className="font-[600] text-[#BA181B]">
            Visualizações:{" "}
          </label>
          <p>{props.views}</p>
        </div>
        <div className="flex gap-2">
          <label htmlFor="likesCount" className="font-[600] text-[#BA181B]">
            Likes:{" "}
          </label>
          <p>{props.likes}</p>
        </div>
        <div className=" flex gap-2">
          <label htmlFor="commentsCount" className="font-[600] text-[#BA181B]">
            Comentarios:{" "}
          </label>
          <p>{props.comments}</p>
        </div>
      </div>
    </article>
  );
}
