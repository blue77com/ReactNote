import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ChapterListItem.css";

export default function ChapterListItem({ chapterPath }) {
  const [meta, setMeta] = useState({
    chapterTitle: "",
    author: "",
    description: ""
  });

  useEffect(() => {
    fetch(`/${chapterPath}/chaptermeta.json`)
      .then((res) => res.json())
      .then(setMeta)
      .catch(console.error);
  }, [chapterPath]);

  const coverPath = `/${chapterPath}/cover.jpg`;

  // Разделяем путь, например: "theMaxx/release 1"
  const [workId, releaseId] = chapterPath.split("/");

  return (
    <Link to={`/reader/${encodeURIComponent(workId)}/${encodeURIComponent(releaseId)}`} className="chapter-item">
      <img src={coverPath} alt="cover" className="chapter-cover" />
      <div className="chapter-info">
        <div className="chapter-title">{meta.chapterTitle}</div>
        <div className="chapter-author">{meta.author}</div>
        {meta.description && <div className="chapter-description">{meta.description}</div>}
      </div>
    </Link>
  );
}
