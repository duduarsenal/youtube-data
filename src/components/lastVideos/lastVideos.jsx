import React, { useEffect, useState } from "react";

export default function LastVideos(props) {

  // const [videosChannel, setVideosChannel] = useState({});
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

  async function setValues(){
    
    const arrayVideos = props.videos && props.videos.map(async (video) => {
      const {title, publishedAt, resourceId, viewCount, thumbnails, commentCount, likeCount} = video;
      const tempObj = {
        title: title,
        dataPub: publishedAt ? formatDate(publishedAt) : " ",
        href: resourceId ? `https://youtube.com/watch?v=${resourceId.videoId}` : "#",
        views: viewCount ? formatNumber(viewCount) : " ",
        thumb: thumbnails ? thumbnails.medium.url : "https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png",
        commentCount: commentCount ? formatNumber(commentCount) : " ",
        likeCount: likeCount ? formatNumber(likeCount) : " ",
      }
      return tempObj;
    })

    arrayVideos ? setSanitizeValues(await Promise.all(arrayVideos)) : "";
  }

  useEffect(() => {
    setValues();
  }, [props.videos])


  return (
    <section className="flex flex-col gap-2 h-max w-full px-4 overflow-hidden">
      <h1 className="text-[1.5rem]">Videos mais recentes</h1>
      <div className="flex flex-wrap items-center justify-evenly w-full">
      {
        sanitizeValues.length > 0 ? sanitizeValues.map((video) => (
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
        )) : <BoxVideo />
      }
      </div>
    </section>
  );
}

export function BoxVideo(props) {
  return (
    <article className="flex flex-col justify-between bg-[#80808015] rounded-lg px-3 py-4 my-4 w-[23rem] min-h-[25rem] h-max">
      <h1 className={`${props.title ? 'text-[1rem]' : 'text-[1.5rem]'} text-center min-h-[4rem]`}>{props.title || "Titulo do Video"}</h1>
      <div className="w-full">
        <a href={props.href} target="_blank" className="hover:brightness-50 transition-all duration-300">
          <img src={props.thumb || "https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"} className="w-full"/>
        </a>
      </div>
      <div className="flex flex-col py-2">
        <div className="flex gap-2">
          <label htmlFor="likesCount" className="font-[600] text-blue">
            Data de publicação:{" "}
          </label>
          <p>{props.dataPub}</p>
        </div>
        <div className="flex gap-2">
          <label htmlFor="likesCount" className="font-[600] text-blue">
            Visualizações:{" "}
          </label>
          <p>{props.views}</p>
        </div>
        <div className="flex gap-2">
          <label htmlFor="likesCount" className="font-[600] text-blue">
            Likes:{" "}
          </label>
          <p>{props.likes}</p>
        </div>
        <div className=" flex gap-2">
          <label htmlFor="commentsCount" className="font-[600] text-blue">
            Comentarios:{" "}
          </label>
          <p>{props.comments}</p>
        </div>
      </div>
    </article>
  );
}
