import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ComicReaderPage from "./ComicReaderPage";
import PasswordGate from "../Components/PasswordGate/PasswordGate";

export default function ComicReaderWrapper() {
  const { workId, releaseId } = useParams();
  const contentPath = `${workId}/${releaseId}`; // например "theMaxx/release-2"

  const [meta, setMeta] = useState(null);
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await fetch(`/${contentPath}/chaptermeta.json`);
        const data = await res.json();
        setMeta(data);
        if (!data.accessCode || data.accessCode === "") {
          setAccessGranted(true);
        }
      } catch (err) {
        console.error("Ошибка загрузки chaptermeta.json:", err);
      }
    };

    fetchMeta();
  }, [contentPath]);

  if (!meta) return <div>Загрузка...</div>;

  return accessGranted ? (
    <ComicReaderPage contentPath={contentPath} />
  ) : (
    <PasswordGate
      correctCode={meta.accessCode}
      onAccessGranted={() => setAccessGranted(true)}
    />
  );
}
