import React from "react";
import "./ReaderWindow.css";

export default function ReaderWindow({ imageSrc, aspectRatio = "default" }) {
  const getAspectRatioStyle = () => {
    switch (aspectRatio) {
      case "4:3":
        return {
          aspectRatio: "4 / 3",
          height: "100vh",
        };
      case "16:9":
        return {
          aspectRatio: "16 / 9",
          width: "100vw",
        };
      case "21:9":
        return {
          aspectRatio: "21 / 9",
          width: "100vw",
        };
      case "default":
      default:
        return {
          maxWidth: "100vw",
          height: "100vh"
        };
    }
  };

  return (
    <div className="reader-window-container">
      <div className="reader-image-wrapper" style={getAspectRatioStyle()}>
        {imageSrc ? (
          <img src={imageSrc} alt="Page" className="reader-image" />
        ) : (
          <div className="reader-placeholder">Нет изображения</div>
        )}
      </div>
    </div>
  );
}
