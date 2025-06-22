import React from "react";
import "./WorkDescription.css";

export default function WorkDescription({ meta }) {
  const {
    workTitle,
    cover,
    firstAuthor,
    ratios = [],
    description
  } = meta;

  return (
    <div className="work-description-container">
        <div className="work1-description-container">
        <img src={cover} alt={`${workTitle} cover`} className="work-cover" />
        <div className="work-details">
            <div className="work-title">{workTitle}</div>
            <div className="work-author">{firstAuthor}</div>

            <div className="work-ratios">
            {ratios.map((ratio) => (
            <span key={ratio} className="work-ratio-chip">
              {ratio}
            </span>
            ))}
            </div>
        </div>
        </div>
        <div>
            <div className="work-full-description">
            <p>{description ? description : "Описание недоступно."}</p>
            </div>
        </div>
    </div>
  );
}
