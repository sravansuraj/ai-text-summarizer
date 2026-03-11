"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary("");
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a0f;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: #e8e6f0;
          overflow-x: hidden;
        }

        .bg-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }
        .orb1 { width: 600px; height: 600px; background: #6c63ff; top: -200px; left: -200px; }
        .orb2 { width: 400px; height: 400px; background: #00d4aa; bottom: -100px; right: -100px; }
        .orb3 { width: 300px; height: 300px; background: #ff6b9d; top: 50%; left: 60%; }

        .container {
          position: relative;
          z-index: 1;
          max-width: 780px;
          margin: 0 auto;
          padding: 60px 24px 80px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(108, 99, 255, 0.15);
          border: 1px solid rgba(108, 99, 255, 0.3);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 500;
          color: #a09fff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .dot {
          width: 6px; height: 6px;
          background: #6c63ff;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(42px, 7vw, 72px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #6c63ff 0%, #00d4aa 50%, #ff6b9d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 17px;
          color: #888;
          font-weight: 300;
          margin-bottom: 48px;
          line-height: 1.6;
        }

        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 16px;
          backdrop-filter: blur(10px);
          transition: border-color 0.3s;
        }

        .card:focus-within {
          border-color: rgba(108, 99, 255, 0.4);
        }

        .card-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .word-count {
          font-size: 11px;
          color: #444;
          font-weight: 400;
          letter-spacing: 0;
          text-transform: none;
        }

        textarea {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.7;
          color: #ccc;
          font-weight: 300;
          min-height: 180px;
        }

        textarea::placeholder { color: #3a3a4a; }

        .btn {
          width: 100%;
          padding: 18px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6c63ff, #00d4aa);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(108, 99, 255, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          background: rgba(255,255,255,0.4);
          animation: load 1.5s ease-in-out infinite;
        }

        @keyframes load {
          0% { width: 0%; left: 0; }
          50% { width: 70%; left: 0; }
          100% { width: 0%; left: 100%; }
        }

        .summary-card {
          background: linear-gradient(135deg, rgba(108,99,255,0.08), rgba(0,212,170,0.05));
          border: 1px solid rgba(108, 99, 255, 0.2);
          border-radius: 20px;
          padding: 28px;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .summary-text {
          font-size: 16px;
          line-height: 1.8;
          color: #ddd;
          font-weight: 300;
        }

        .footer {
          text-align: center;
          margin-top: 48px;
          font-size: 12px;
          color: #333;
          letter-spacing: 0.06em;
        }
      `}</style>

      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />
      <div className="bg-orb orb3" />

      <div className="container">
        <div className="badge">
          <div className="dot" />
          Powered by Groq AI
        </div>

        <h1>
          Summarize<br />
          <span className="gradient-text">Anything.</span>
        </h1>

        <p className="subtitle">
          Paste any text and get a clean, concise summary in seconds.
        </p>

        <div className="card">
          <div className="card-label">
            <span>Your Text</span>
            <span className="word-count">{wordCount} words</span>
          </div>
          <textarea
            placeholder="Paste your article, essay, document, or any text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={summarize} disabled={loading || !text.trim()}>
          {loading ? (
            <>
              Summarizing...
              <div className="loading-bar" />
            </>
          ) : (
            "Summarize →"
          )}
        </button>

        {summary && (
          <div className="summary-card" style={{ marginTop: "16px" }}>
            <div className="card-label" style={{ marginBottom: "16px" }}>
              <span>Summary</span>
            </div>
            <p className="summary-text">{summary}</p>
          </div>
        )}

        <div className="footer">BUILT WITH NEXT.JS · GROQ · VERCEL</div>
      </div>
    </>
  );
}
