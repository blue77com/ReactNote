import React, { useState, useEffect } from "react";
import "./ComicReaderPage.css";
import PageSwitch from "../Components/PageSwitch/PageSwitch";
import ReaderWindow from "../Components/ReaderWindow/ReaderWindow";
import HeaderOverlay from "../Components/HeaderOverlay/HeaderOverlay";

export default function ComicReaderPage({ contentPath }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState("default");
  const [pages, setPages] = useState([]);
  const [availableRatios, setAvailableRatios] = useState(["default"]);

  const [meta, setMeta] = useState({
    workTitle: "",
    chapterTitle: "",
    author: ""
  });

  const getFolderName = (ratio) => {
    switch (ratio) {
      case "4:3": return "4-3";
      case "16:9": return "16-9";
      case "21:9": return "21-9";
      default: return "default";
    }
  };

  const folder = getFolderName(aspectRatio);

  // 1. Загружаем метаданные (и доступные форматы из meta.json)
  useEffect(() => {
    setAspectRatio("default"); // сброс при смене главы
    fetch(`/${contentPath}/chaptermeta.json`)
      .then(res => res.json())
      .then(data => {
        setMeta({
          workTitle: data.workTitle || "",
          chapterTitle: data.chapterTitle || "",
          author: data.author || ""
        });

        // Загружаем допустимые форматы
        if (Array.isArray(data.ratios)) {
          setAvailableRatios(data.ratios);
        } else {
          setAvailableRatios(["default"]);
        }
      })
      .catch(err => {
        console.error("Ошибка при загрузке meta.json:", err);
        setMeta({ workTitle: "", chapterTitle: "", author: "" });
        setAvailableRatios(["default"]);
      });
  }, [contentPath]);

  // 2. Проверка: если выбранный формат недоступен
  useEffect(() => {
    if (!availableRatios.includes(aspectRatio)) {
      setAspectRatio(availableRatios[0] || "default");
    }
  }, [availableRatios, aspectRatio]);

  // 3. Загружаем страницы
  useEffect(() => {
    const loadPages = async () => {
      try {
        const response = await fetch(`/${contentPath}/${folder}/page.json`);
        const data = await response.json();
        if (Array.isArray(data.pages)) {
          setPages(data.pages);
          setCurrentPageIndex(0);
        } else {
          setPages([]);
        }
      } catch (err) {
        console.error(`Ошибка при загрузке страниц: /${contentPath}/${folder}/page.json`, err);
        setPages([]);
      }
    };

    loadPages();
  }, [aspectRatio, contentPath]);

  const currentImage = pages[currentPageIndex]
    ? `/${contentPath}/${folder}/${pages[currentPageIndex]}`
    : null;
  const workId = contentPath.split("/")[0];
  return (
    <div className="reader-root">
      {currentImage && (
        <ReaderWindow
          imageSrc={currentImage}
          aspectRatio={aspectRatio}
        />
      )}

      <HeaderOverlay
        workId={workId}
        workTitle={meta.workTitle}
        chapterTitle={meta.chapterTitle}
        author={meta.author}
        onAspectChange={setAspectRatio}
        availableRatios={availableRatios}
      />

      <PageSwitch
        totalPages={pages.length}
        currentPage={currentPageIndex + 1}
        setCurrentPage={(pageNum) => setCurrentPageIndex(pageNum - 1)}
      />
    </div>
  );
}
