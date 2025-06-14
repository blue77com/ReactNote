import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from '../Logo/Logo';
import './HeaderOverlay.css';

export default function HeaderOverlay({
  workId,   
  workTitle,
  chapterTitle,
  author,
  onAspectChange,
  availableRatios = []
}) {
  const [visible, setVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY < 50 && !isPinned) {
        setVisible(true);
      } else if (!isPinned) {
        setVisible(false);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isPinned]);

  const handleMouseEnter = () => {
    if (!isPinned) {
      clearTimeout(timeoutRef.current);
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      timeoutRef.current = setTimeout(() => setVisible(false), 300);
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setIsPinned((prev) => !prev);
    setVisible(true);
  };

  const formatNames = {
    "default": "Обычный",
    "4:3": "4:3",
    "16:9": "16:9",
    "21:9": "21:9"
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleRightClick}
      className={`hover-header ${visible ? "visible" : "hidden"} ${isPinned ? "pinned" : ""}`}
      title={isPinned ? "ПКМ — открепить панель" : "ПКМ — закрепить панель"}
    >
      <Logo
        color={isPinned ? "#ffffff" : "#242424"}
        secondcolor={isPinned ? "#242424" : "#ffffff"}
        size={55}
      />

      <select onChange={(e) => onAspectChange(e.target.value)}>
        {availableRatios.map((ratio) => (
          <option key={ratio} value={ratio}>
            {formatNames[ratio] || ratio}
          </option>
        ))}
      </select>

      <div className="info">
        <Link to={`/${encodeURIComponent(workId)}`} className="info-title">{workTitle}</Link>
        <div className="info-subtitle">{chapterTitle} — {author}</div>
      </div>
    </div>
  );
}
