import './PageSwitch.css';
import React, { useState, useEffect } from 'react';

export default function PageSwitch({ totalPages, currentPage, setCurrentPage }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(currentPage));

  const nextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setInputValue(String(newPage));
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setInputValue(String(newPage));
    }
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const value = Number(inputValue);
  if (value >= 1 && value <= totalPages) {
    setCurrentPage(value);
    setInputValue(String(value));
  } else {
    setInputValue(String(currentPage));
  }
  setIsEditing(false);
};


  const handleBlur = () => {
    setIsEditing(false);
    setInputValue(String(currentPage));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isEditing) {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmit(e);
        }
        if (e.key === 'Escape') {
          setIsEditing(false);
          setInputValue(String(currentPage));
        }
      } else {
        if (e.key === 'ArrowRight') {
          nextPage();
        }
        if (e.key === 'ArrowLeft') {
          prevPage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditing, currentPage, inputValue, totalPages]);

  return (
    <div className="page-controls">
      <div className="reader-toolbar">
        <div className="reader-toolbar-controls">
          <button className='left' onClick={prevPage}></button>

          <div className="PagesINFO" onClick={() => setIsEditing(true)}>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.replace(/\D/g, ''))}
                  onBlur={handleBlur}
                  className="page-input"
                  autoFocus
                />
                <span> / {totalPages}</span>
              </form>
            ) : (
              <span>{currentPage} / {totalPages}</span>
            )}
          </div>

          <button className='right' onClick={nextPage}></button>
        </div>
      </div>
    </div>
  );
}
