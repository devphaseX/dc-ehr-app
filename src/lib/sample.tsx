import { useEffect, useState } from "react";

type Message = {
  id: string;
  message: string;
};

function Sample() {
  const [messages, setMessages] = useState<Map<string, Message>>(new Map());
  const socket = {} as any;

  useEffect(() => {
    socket.on("new_message", (message: Message) => {
      setMessages((prev) => {
        prev.set(message.id, message);
        return new Map(prev);
      });
    });

    socket.on("get_chat_message_by_id", (data: Array<Message>) => {
      const mapEntries = data.map(
        (message) => [message.id, message] as [string, Message],
      );
      setMessages(new Map(mapEntries));
    });
  }, [socket]);

  // return <FlatList list={ Array.from(messages)} />

  return null;
}
