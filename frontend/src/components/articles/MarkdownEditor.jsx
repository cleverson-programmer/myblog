import React from "react";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import ReactMarkdown from "react-markdown";

// Função para aplicar o Highlight.js
const applyHighlight = (code, language) => {
  if (hljs.getLanguage(language)) {
    return hljs.highlight(code, { language }).value;
  }
  return code; // Código original se a linguagem não for reconhecida
};

const MarkdownInput = ({ value, onChange }) => {
  const handleEditorChange = ({ text }) => onChange(text);

  const config = {
    view: {
      menu: true,
      md: true,
      html: false,
    },
    canView: {
      menu: true,
      md: true,
      html: false,
      fullScreen: true,
      hideMenu: true,
    },
  };

  return (
    <MarkdownEditor
      style={{ height: "500px" }}
      value={value}
      config={config}
      renderHTML={(text) => (
        <ReactMarkdown
          children={text}
          components={{
            code({ inline, className, children }) {
              const language = className?.replace("language-", "") || "";
              const codeContent = children?.[0] || "";
              const highlighted = applyHighlight(codeContent, language);
              return !inline ? (
                <pre>
                  <code
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                    className={className}
                  />
                </pre>
              ) : (
                <code className={className}>{codeContent}</code>
              );
            },
          }}
        />
      )}
      onChange={handleEditorChange}
    />
  );
};

export default MarkdownInput;




