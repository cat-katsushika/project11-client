import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatBubble } from "@/app/components/ChatBubble";
import { CommentForm } from "@/app/components/CommentForm";
import { Player } from "@/app/components/Player";
import SubmitForm from "@/app/components/SubmitForm";
import CalculateTime from "@/app/hooks/CalculateTime";
import { TabPanelProps } from "@/app/types/mobile";
import { ChatResponseProps } from "@/app/types/mobile";

const TabPanel = ({ value, index, player }: TabPanelProps) => {
  const [participantComments, setParticipantComments] = useState<
    ChatResponseProps[]
  >([]);
  const [judgeComments, setJudgeComments] = useState<ChatResponseProps[]>([]);
  const [message, setMessage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [encodedTimestamp, setEncodedTimestamp] = useState(
    encodeURIComponent(new Date().toISOString())
  );

  const plaintiffAndDefendant = JSON.parse(
    sessionStorage.getItem("plaintiff_and_defendant") || "{}"
  );
  const spectator = JSON.parse(sessionStorage.getItem("spectator") || "{}");

  useEffect(() => {
    let chatId = "";

    chatId =
      index === 0
        ? player === "plaintiff" || player === "defendant"
          ? plaintiffAndDefendant.mainChatId
          : spectator.mainChatId
        : index === 1
        ? player === "spectator"
          ? spectator.subChatId
          : plaintiffAndDefendant.mainChatId
        : null;

    if (!chatId) {
      console.error("Chat ID not found for index", index, "and player", player);
      return;
    }

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://project7.uni-bo.net/api/chat/${chatId}/message/polling/`
        );

        const newComments = response.data;
        if (index === 0) {
          setParticipantComments(newComments);
        } else if (index === 1) {
          setJudgeComments(newComments);
        }
      } catch (error) {
        console.error("Error polling messages:", error);
      }
    };
    const intervalId = setInterval(fetchComments, 1000);
    return () => clearInterval(intervalId);
  }, [index]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={`${
        value === index ? "flex-grow h-full flex flex-col" : "hidden"
      }`}
    >
      {value === index && (
        <div className="flex-grow flex flex-col h-full">
          {index === 0 ? (
            // タブ 0 (参加者コメント)
            <div className="flex flex-col flex-grow overflow-y-auto">
              {participantComments.map((chat) => (
                <ChatBubble
                  key={chat.message_id}
                  username={chat.player_name}
                  message={chat.message}
                  time={CalculateTime(chat.created_at)}
                  role={chat.player_role}
                  message_id={chat.message_id}
                  player={player}
                />
              ))}
            </div>
          ) : index === 1 && player === "spectator" ? (
            // タブ 1かつplayerがspectatorの場合
            <div className="flex flex-col flex-grow overflow-y-auto">
              {judgeComments.map((chat) => (
                <ChatBubble
                  key={chat.message_id}
                  username={chat.player_name}
                  message={chat.message}
                  time={CalculateTime(chat.created_at)}
                  role={chat.player_role}
                  message_id={chat.message_id}
                  player={player}
                />
              ))}
            </div>
          ) : (
            <div className="p-[36px_40px] flex flex-col gap-[54px] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Player player={player} />
                <p>主張内容を入力してください</p>
              </div>
              <SubmitForm maxLength={100} player={player} />
            </div>
          )}
          {(index === 0 && player !== "spectator") ||
          (index === 1 && player === "spectator") ? (
            <div className="flex-shrink-0">
              <CommentForm
                message={message}
                setMessage={setMessage}
                setEncodedTimestamp={setEncodedTimestamp}
                index={index}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TabPanel;
