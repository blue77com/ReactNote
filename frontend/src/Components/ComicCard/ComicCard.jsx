import React from "react";
import "./ComicCard.css";
import { Link } from "react-router-dom";

export default function ComicCard({ meta, imageSrc }) {
  const { workTitle, ratios , firstAuthor} = meta;

  return (
    <Link to={`/${meta.path}`} className="comic-card">
      <img src={imageSrc} alt={`${workTitle} cover`} className="comic-image" />

      <div className="comic-info">
        <div className="comic-title">{workTitle} ꟷ {firstAuthor}</div>

        <div className="ratios">
          {ratios.map((ratio) => (
            <span key={ratio} className="ratio-chip">
              {ratio}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
