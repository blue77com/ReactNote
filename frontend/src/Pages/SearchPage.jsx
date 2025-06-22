import React, { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar/SearchBar";
import ComicCard from "../Components/ComicCard/ComicCard";
import Logo from "../Components/Logo/Logo";
import "./SearchPage.css";

export default function SearchPage() {
  const [allComics, setAllComics] = useState([]);
  const [filteredComics, setFilteredComics] = useState([]);

  useEffect(() => {
    const loadComics = async () => {
      try {
        const response = await fetch("/comicList.json");
        const data = await response.json();
        setAllComics(data);
        setFilteredComics(data); // ⬅️ показываем все при загрузке
      } catch (error) {
        console.error("Ошибка загрузки комиксов:", error);
      }
    };
    loadComics();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredComics(allComics);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const results = allComics.filter((comic) => {
      return (
        comic.workTitle.toLowerCase().includes(lowerQuery) ||
        comic.firstAuthor.toLowerCase().includes(lowerQuery) ||
        comic.ratios.some((ratio) => ratio.toLowerCase().includes(lowerQuery))
      );
    });

    setFilteredComics(results);
  };

  return (
    <div className="search-page">
      <div style={{ position: "fixed",top: "20px",left: "20px",zIndex: 1000 }}>
        <Logo size={50}/>
      </div>
      <SearchBar onSearch={handleSearch} />
      <div className="comic-grid">
      {filteredComics.length === 0 ? (
        <div className="not-found">Nothing</div>
        ) : (
          filteredComics.map((comic, index) => (
            <ComicCard
              key={index}
              meta={comic}
              imageSrc={`${comic.path}/${comic.cover}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
