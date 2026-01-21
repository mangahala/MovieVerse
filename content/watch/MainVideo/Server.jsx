import React, { useEffect, useMemo } from "react";
import { useWatchContext } from "@/context/Watch";

const Server = () => {
  const { MovieId, setWatchInfo, watchInfo, MovieInfo, episode, season } =
    useWatchContext();

  const MovieVideoPlayers = useMemo(
    () => ({
      Quantum: `https://vidlink.pro/movie/${MovieId}?player=jw`,
      Nova: `https://vidfast.pro/movie/${MovieId}?autoPlay=true&theme=8b20ea`,
      Movio: `https://vidsrc.cc/v2/embed/movie/${MovieId}?autoPlay=true`,
      Turbo: `https://vidsrc.icu/embed/movie/${MovieId}?autoPlay=true`,
      Astro: `https://hexa.su/watch/movie/${MovieId}?autoPlay=true`,
    }),
    [MovieId]
  );

  const TVVideoPlayers = useMemo(
    () => ({
      Quantum: `https://vidlink.pro/tv/${MovieId}/${season}/${episode}?player=jw&autoplay=true&primaryColor=e26bbd&secondaryColor=0069d6&iconColor=ffffff`,
      Nova: `https://vidfast.pro/tv/${MovieId}/${season}/${episode}?autoPlay=true&theme=8b20ea&nextButton=false&autoNext=false/`,
      Movio: `https://vidsrc.cc/v2/embed/tv/${MovieId}/${season}/${episode}?autoPlay=true`,
      Turbo: `https://vidsrc.icu/embed/tv/${MovieId}/${season}/${episode}?autoPlay=true`,
      Astro: `https://hexa.su/watch/tv/${MovieId}/${season}/${episode}?autoPlay=true`,
    }),
    [MovieId, season, episode]
  );

  const servers = useMemo(() => {
    const data = MovieInfo?.type === "tv" ? TVVideoPlayers : MovieVideoPlayers;
    return Object.entries(data);
  }, [MovieInfo?.type, MovieVideoPlayers, TVVideoPlayers]);

  const changeServer = (item) => {
    setWatchInfo({
      url: item[1],
      iframe: true,
      loading: false,
    });
  };

  useEffect(() => {
    if (!servers.length) return;

    setWatchInfo({
      url: servers[0][1],
      iframe: true,
      loading: false,
    });
  }, [episode, servers, setWatchInfo]);

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="bg-[#323044] w-full h-full px-4 flex items-center gap-8 max-[880px]:py-2 max-[515px]:flex-col max-[515px]:gap-5">
        <div className="flex items-center">
          <span>
            <svg
              viewBox="0 0 32 32"
              className="w-5 h-5 mr-1 max-[500px]:w-4"
              fill="none"
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.6661 6.66699C4.29791 6.66699 3.99943 6.96547 3.99943 7.33366V24.667C3.99943 25.0352 4.29791 25.3337 4.6661 25.3337H27.3328C27.701 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.701 6.66699 27.3328 6.66699H4.6661Z"
                fill="currentColor"
              />
            </svg>
          </span>
          Server
        </div>

        <div className="flex gap-2 flex-wrap max-[515px]:justify-center">
          {servers.map((item) => (
            <div
              key={item[0]}
              onClick={() => changeServer(item)}
              style={{
                background: watchInfo?.url === item[1] ? "#4a446c" : undefined,
              }}
              className="px-4 py-[6px] text-[15px] bg-[#413d57] hover:bg-[#4a446c] border border-[#5b5682] rounded-md cursor-pointer"
            >
              {item[0]}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#323044] w-full h-full px-4 flex items-center gap-8 min-[1396px]:hidden max-[880px]:py-2"></div>
    </div>
  );
};

export default Server;