import { useState } from "react";
import axios from "axios";
import initialLayout from "./data/initialLayout.json";
import ChatInput from "./components/ChatInput";
import WireframePreview from "./components/WireframePreview";

function App() {
  const [layout, setLayout] = useState(initialLayout);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const sendMessage = async (text) => {
    const userMessage = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/chat",
        {
          message: text,
          layout,
        }
      );

      setLayout(data.updatedLayout);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.explanation,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        height: "100vh",
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          padding: "20px",
          borderRight:
            "1px solid #ccc",
        }}
      >
        <div>
          <h1>AI Layout Agent</h1>

          <p>
            Chat-based design
            transformer
          </p>
        </div>

        <div
          style={{
            height: "80vh",
            overflowY: "auto",
            border:
              "1px solid #ccc",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          {messages.map(
            (msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                  background:
                    msg.role ===
                    "user"
                      ? "#dbeafe"
                      : "#dcfce7",
                }}
              >
                <b>{msg.role}:</b>{" "}
                {msg.content}
              </div>
            )
          )}

          {loading && (
            <div
              style={{
                padding: "10px",
                borderRadius: "10px",
                background: "#f3f4f6",
              }}
            >
              <b>assistant:</b>{" "}
              Thinking...
            </div>
          )}
        </div>

        <ChatInput onSend={sendMessage} />
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          padding: "20px",
          overflow: "auto",
        }}
      >
        <h2>Wireframe Preview</h2>

        <WireframePreview
          layout={layout}
        />

        <h2
          style={{
            marginTop: "20px",
          }}
        >
          Layout JSON
        </h2>

        <pre
          style={{
            background: "#111",
            color: "#0f0",
            padding: "20px",
            height: "50vh",
            overflow: "auto",
          }}
        >
          {JSON.stringify(
            layout,
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}

export default App;