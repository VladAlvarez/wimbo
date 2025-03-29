import { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Dark theme

const CodeViewer = ({ filePath }) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (!filePath) return;

    // Determine the language based on the file extension
    const ext = filePath.split(".").pop(); // Get file extension
    const languageMap = {
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      html: "html",
      css: "css",
      json: "json",
      python: "python",
      java: "java",
      // Add more mappings as needed
    };
    setLanguage(languageMap[ext] || "plaintext"); // Default to plaintext if no match

    fetch(`https://raw.githubusercontent.com/VladAlvarez/wimbo/main/${filePath}`)
      .then(response => response.text())
      .then(data => {
        setCode(data);
      });
  }, [filePath]);

  // Re-trigger syntax highlighting whenever the code changes
  useEffect(() => {
    if (code) {
      setTimeout(() => {
        hljs.highlightAll(); // Apply syntax highlighting after the code changes
      }, 100);
    }
  }, [code]);

  return (
    <div style={{
      flex: 1,
      padding: "15px",
      border: "1px solid #30363d",
      borderRadius: "5px",
      background: "#0d1117",
      color: "#c9d1d9",
      minHeight: "100vh",
    }}>
      <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#58a6ff" }}>{filePath}</h3>
      <pre style={{ padding: "10px", background: "#161b22", borderRadius: "5px", overflowX: "auto" }}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeViewer;
