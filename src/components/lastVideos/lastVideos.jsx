import React from "react";

export default function LastVideos() {
  return (
    <section className="flex flex-col gap-2 h-max w-full px-4 overflow-hidden">
      <h1 className="text-[1.5rem]">Videos mais recentes</h1>
      <div className="flex gap-4">
        <BoxVideo />
        <BoxVideo />
        <BoxVideo />
        <BoxVideo />
      </div>
    </section>
  );
}

export function BoxVideo() {
  return (
    <article className="w-[22rem]">
      <h1 className="text-justify">PLAYLIST MHRAP / MIX STYLE TRAP 2021</h1>
      <div>
        <div className="w-full h-[12.5rem] bg-gray-700"></div>
        {/* Futura IMG com tag A para ancora */}
      </div>
      <div className="flex flex-col py-2">
      <div className="flex gap-2">
          <label htmlFor="likesCount" className="font-[600] text-[#BA181B]">
            Visualizações:{" "}
          </label>
          <p>102.585</p>
        </div>
        <div className="flex gap-2">
          <label htmlFor="likesCount" className="font-[600] text-[#BA181B]">
            Likes:{" "}
          </label>
          <p>1.000</p>
        </div>
        <div className=" flex gap-2">
          <label htmlFor="commentsCount" className="font-[600] text-[#BA181B]">
            Comentarios:{" "}
          </label>
          <p>1.000</p>
        </div>
      </div>
    </article>
  );
}
