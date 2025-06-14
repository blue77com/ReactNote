import React, { useEffect, useState } from "react";
import ComicCard from "../ComicCard/ComicCard";

export default function ComicCardLoader() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    fetch("/theMaxx/meta.json")
      .then((res) => res.json())
      .then((data) => setMeta(data))
      .catch((err) => console.error("Ошибка загрузки meta.json:", err));
  }, []);

  if (!meta) return <div>Загрузка...</div>;

  const imageSrc = `/theMaxx/${meta.cover}`;

  return <ComicCard meta={meta} imageSrc={imageSrc} />;
}