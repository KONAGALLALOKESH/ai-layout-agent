import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      <input
        type="text"
        value={text}
        placeholder="Type instruction..."
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          padding: "10px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={handleSend}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}