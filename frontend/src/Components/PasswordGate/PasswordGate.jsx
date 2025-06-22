import React, { useState } from "react";
import "./PasswordGate.css";

export default function PasswordGate({ correctCode, onAccessGranted }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === correctCode) {
      onAccessGranted();
    } else {
      setError("Доступ закрыт");
    }
  };

  return (
    <div className="align-gate">
      <div>
        <div className="password-gate-div">
          <form onSubmit={handleSubmit} className="password-gate">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Код доступа"
              className="password-input"
            />
            <button type="submit" className="password-button"><div>Accept</div></button>
          </form>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
