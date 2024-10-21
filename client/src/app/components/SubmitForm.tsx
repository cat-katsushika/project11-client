"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface UserNameInputProps {
  maxLength: number;
  player: string;
}

const SubmitForm = ({ maxLength, player }: UserNameInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim().length > 0) {
      // TODO: 内容のpost及びエラーハンドリング
      if (pathname.includes("/participation")) {
        router.push(`/claim?player=${player}`);
      } else {
        router.push("/waiting");
      }
    }
  };

  // playerに応じてテーマクラスを動的に設定
  const themeClass = player === "A" ? "theme-pink" : "theme-blue";

  return (
    <div className="flex-col flex gap-[24px] w-full">
      <div className="w-full">
        <p className="text-[12px] leading-[21.6px]">
          {pathname.includes("/claim") ? "主張内容" : "ユーザーネーム登録"}
        </p>
        {pathname.includes("/claim") ? (
          <textarea
            className={`w-full font-normal caret-${themeClass} text-[#FFF] placeholder-[#79747E] bg-[#333] border-[1px] border-solid border-[#FFF] rounded-[8px] p-[8px_10px] leading-[28.8px] focus:outline-none focus:border-${themeClass}`}
            placeholder="主張内容を入力してください"
            value={inputValue}
            onChange={handleChange}
            maxLength={maxLength}
          />
        ) : (
          <input
            className={`w-full font-normal caret-${themeClass} text-[#FFF] placeholder-[#79747E] bg-[#333] border-[1px] border-solid border-[#FFF] rounded-[8px] p-[8px_10px] leading-[28.8px] focus:outline-none focus:border-${themeClass}`}
            placeholder="ユーザーネームを入力"
            value={inputValue}
            onChange={handleChange}
            maxLength={maxLength}
          />
        )}
        <p className="text-right font-normal text-[12px] leading-[16px]">
          {inputValue.length}/{maxLength}
        </p>
      </div>
      <button
        className={`p-[10px_20px] text-[12px] rounded-[8px] border-[1px] border-solid w-full leading-[21.6px] ${
          inputValue.trim().length > 0
            ? `bg-${themeClass} border-${themeClass} cursor-pointer`
            : "bg-[#79747E] border-[#79747E] cursor-default"
        }`}
        onClick={handleSubmit}
        disabled={inputValue.trim().length === 0} // 入力がない場合は無効
      >
        {pathname.includes("/claim") ? "送信する" : "参加する"}
      </button>
    </div>
  );
};

export default SubmitForm;
