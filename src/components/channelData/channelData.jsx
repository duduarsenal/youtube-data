import React from "react";

export default function ChannelData() {

  

  return (
    <section className="bg-[#111111] w-[50%] h-max rounded-lg px-8 py-4 text-white">
      <h1 className="w-full font-[700] h-12 flex items-center text-[1.5rem] text-[#E5383B]">
        Youtube Statistics
      </h1>
      <div className="flex gap-52">
        <ul className="flex flex-col items-start justify-center py-4">
          <div className="flex gap-2">
            <label htmlFor="subs" className="font-[600] text-[#BA181B]">
              Nome do Canal:{" "}
            </label>
            <li>AniRap</li>
          </div>
          <div className="flex gap-2">
            <label htmlFor="subs" className="font-[600] text-[#BA181B]">
              Custom URL:{" "}
            </label>
            <li>@anirap</li>
          </div>
          <div className="flex gap-2">
            <label htmlFor="subs" className="font-[600] text-[#BA181B]">
              Data de criação:{" "}
            </label>
            <li>11/05/2016</li>
          </div>
          <div className="flex gap-2">
            <label htmlFor="subs" className="font-[600] text-[#BA181B]">
              Inscritos:{" "}
            </label>
            <li>1.000</li>
          </div>
          <div className="flex gap-2">
            <label htmlFor="views" className="font-[600] text-[#BA181B]">
              Visualizações:{" "}
            </label>
            <li>10.555.666</li>
          </div>
          <div className="flex gap-2">
            <label htmlFor="videoCount" className="font-[600] text-[#BA181B]">
              Quantidade de videos postados:{" "}
            </label>
            <li>657</li>
          </div>
        </ul>
        <div>
          <div className="bg-gray-700 h-[150px] w-[150px] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
