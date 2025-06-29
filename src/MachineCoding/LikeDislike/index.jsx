import { useState } from "react";
import { HeartIcon, SpinnerIcon } from "./icons";

export default function LikeDislike() {
  const [isLiked, setIsLiked] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeButton = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://questions.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ action: isLiked ? "unlike" : "like" }),
        },
      );
      const parsedResponse = await response.json();
      setMessage(parsedResponse.message);
      if (response.ok) setIsLiked(!isLiked);
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleLikeButton} disabled={isLoading}>
        {isLoading ? <SpinnerIcon /> : <HeartIcon />}
        {isLiked ? "Liked" : "Like"}
      </button>
      <div>{message}</div>
    </div>
  );
}

// link - https://www.greatfrontend.com/questions/user-interface/like-button?language=js&tab=coding
