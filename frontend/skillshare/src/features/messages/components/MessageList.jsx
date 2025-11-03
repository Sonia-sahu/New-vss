import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../actions/messageActions";
import MessageThread from "./MessageThread";

export default function MessageList() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  return <MessageThread messages={messages} />;
}
