"use client";
import SubmitForm from "@/app/components/SubmitForm";
import { Player } from "@/app/components/Player";
import { useSearchParams } from "next/navigation";

const Participation = () => {
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  if (!player) return;

  return (
    <div className="p-[36px_40px] flex flex-col gap-[54px] items-center justify-center flex-grow">
      <h3 className="text-[18px] leading-[32.4px]">
        <span className="text-theme-green">AI裁判官</span>へようこそ！
      </h3>
      <div className="flex flex-col gap-[16px]">
        <h3 className={"text-[18px] leading-[32.4px]"}>
          あなたは
          <Player player={player} />
          です
        </h3>
        <p className="text-[16px] text-center leading-[28.8px]">
          ユーザーネームを登録し、
          <br />
          参加ボタンを押してください
        </p>
      </div>
      <SubmitForm maxLength={10} player={player} />
    </div>
  );
};

export default Participation;
