import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams, useLocation } from "react-router-dom";

const VideoCall = () => {
  const { chatId } = useParams();
  const location = useLocation();
  const callContainerRef = useRef(null);

  const username = location.state?.username || "Guest";
  const appID = 1710100243;
  const serverSecret = "c407fcb8acb12741a42e3df16755786a";
  const userID = String(Date.now()); // Replace with actual user ID

  useEffect(() => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      chatId,
      userID,
      username
    );

    const zegoCall = ZegoUIKitPrebuilt.create(kitToken);

    zegoCall.joinRoom({
      container: callContainerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  }, [appID, serverSecret, chatId, userID, username]); //   fixed dependency

  return (
    <div ref={callContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default VideoCall;
