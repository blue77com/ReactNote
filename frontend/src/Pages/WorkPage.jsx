import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import WorkDescription from "../Components/WorkDescription/WorkDescription";
import ChapterListItem from "../Components/ChapterListItem/ChapterListItem";
import Logo from "../Components/Logo/Logo";

export default function WorkPage() {
  const { workId } = useParams();
  const [meta, setMeta] = useState(null);
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    fetch(`/${workId}/meta.json`)
      .then((res) => res.json())
      .then(setMeta)
      .catch((err) => console.error("Ошибка загрузки meta.json", err));

    fetch(`/${workId}/releaseList.json`)
      .then((res) => res.json())
      .then((data) => setReleases(data.release))
      .catch((err) => console.error("Ошибка загрузки releaseList.json", err));
  }, [workId]);

  return (
    <div style={{ padding: "40px" }}>
      <div style={{ position: "fixed",top: "20px",left: "20px",zIndex: 1000 }}>
      <Logo size={50}/>
      </div>
      {meta ? <WorkDescription meta={meta} /> : <p>Загрузка описания...</p>}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        {releases.map((releasePath, index) => (
          <ChapterListItem key={index} chapterPath={`${workId}/${releasePath}`} workId={workId} releaseId={releasePath} />
        ))}
      </div>
    </div>
  );
}
