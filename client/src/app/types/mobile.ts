export interface ChatBubbleProps {
  username: string;
  message: string;
  time: string;
  role: string;
  player: string;
}

export interface TabPanelProps {
  value: number;
  index: number;
  player: string;
}

export interface ChatResponseProps {
  message_id: string;
  player_name: string;
  player_role: string;
  message: string;
  created_at: string;
}

export interface CommentFormProps {
  message: string;
  setMessage: (message: string) => void;
}

export interface UserNameInputProps {
  maxLength: number;
  player: string;
}

export interface PlayerProps {
  player: string;
}
