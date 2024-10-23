import React from "react";

interface PlayerProps {
  player: string;
}
export const Player = ({ player }: PlayerProps) => {
  const playerText = player === "A" ? "PlayerA(原告)" : "PlayerB(被告)";
  const themeClass = player === "A" ? "text-theme-pink" : "text-theme-blue";

  return (
    <span className={`text-[18px] leading-[32.4px] ${themeClass}`}>
      {playerText}
    </span>
  );
};