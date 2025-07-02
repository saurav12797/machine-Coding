import { useState } from "react";
import "./style.css";
const StarRating = () => {
  const [selectedStar, setSelectedStar] = useState();
  const [hoverValue, setHoverValue] = useState();
  const NO_OF_RATINGS = 5;

  // or new Array(NO_OF_RATINGS).fill(0)
  const handleStarClick = (index) => {
    setSelectedStar(index);
  };

  return (
    <div className="start-rating">
      <h1>Star Rating</h1>
      <div className="star-wrapper">
        {[...Array(NO_OF_RATINGS)].map((_, index) => {
          const style =
            index <= selectedStar || index < hoverValue ? "active-star" : "";
          return (
            <div
              key={index}
              className={`star ${style}`}
              onClick={() => handleStarClick(index)}
              onMouseOver={() => setHoverValue(index + 1)}
              onMouseLeave={() => setHoverValue(null)}
            >
              &#9733;
            </div>
          );
        })}
      </div>
      <button onClick={() => setSelectedStar(undefined)}>Reset</button>
    </div>
  );
};

export default StarRating;
