import React, { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  FaBold, FaItalic, FaAlignCenter, FaAlignLeft, FaAlignRight,
  FaListOl, FaHeading, FaCode, FaImage
} from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Code from "./codeComponent";

export default function TextEditor({ value, onChange }) {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  const [showImageInput, setShowImageInput] = useState(false); // Controla exibição do input de imagem
  const [imageUrl, setImageUrl] = useState(""); // URL da imagem

  const applyFormatting = (format) => {
    const textarea = document.getElementById("editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.slice(start, end);

    let formattedText = value;

    switch (format) {
      case "bold":
        formattedText = `${value.slice(0, start)}<b>${selectedText}</b>${value.slice(end)}`;
        break;
      case "italic":
        formattedText = `${value.slice(0, start)}<i>${selectedText}</i>${value.slice(end)}`;
        break;
      case "h1":
        formattedText = `${value.slice(0, start)}<h1>${selectedText}</h1>${value.slice(end)}`;
        break;
      case "h2":
        formattedText = `${value.slice(0, start)}<h2>${selectedText}</h2>${value.slice(end)}`;
        break;
      case "h3":
        formattedText = `${value.slice(0, start)}<h3>${selectedText}</h3>${value.slice(end)}`;
        break;
      case "ordered-list":
        formattedText = `${value.slice(0, start)}<ol><li>${selectedText}</li></ol>${value.slice(end)}`;
        break;
      case "align-left":
        formattedText = `${value.slice(0, start)}<div style='text-align: left;'>${selectedText}</div>${value.slice(end)}`;
        break;
      case "align-center":
        formattedText = `${value.slice(0, start)}<div style='text-align: center;'>${selectedText}</div>${value.slice(end)}`;
        break;
      case "align-right":
        formattedText = `${value.slice(0, start)}<div style='text-align: right;'>${selectedText}</div>${value.slice(end)}`;
        break;
      default:
        break;
    }

    onChange(formattedText);
  };

  const insertCodeSnippet = () => {
    const codeComponentHTML = renderToStaticMarkup(
      <Code name="Code" code={code} language={codeLanguage} />
    );

    const codeSnippet = `<div data-code>${codeComponentHTML}</div>`;
    onChange(value + codeSnippet);
    setCode("");
    setShowCodeInput(false);
  };

  const insertImage = () => {
    if (imageUrl) {
      const imgTag = `<img src="${imageUrl}" alt="Inserted Image" style="max-width: 100%;" />`;
      onChange(value + imgTag);
      setImageUrl(""); // Limpa o campo de URL
      setShowImageInput(false); // Fecha o input
    }
  };

  const renderContent = () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = value;

    const elements = Array.from(tempDiv.childNodes).map((node, index) => {
      if (node.nodeName === "PRE" && node.getAttribute("data-code") !== null) {
        return (
          <Code
            key={index}
            name="Code Snippet"
            code={node.textContent}
            language={codeLanguage}
          />
        );
      }
      return <span key={index} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />;
    });

    return elements;
  };

  return (
    <div>
      <div className="toolbar flex items-center gap-6 mt-10 mb-2 py-2 px-2 rounded-md bg-gray-300 border border-solid border-gray-600">
        <button onClick={() => applyFormatting("bold")}><FaBold /></button>
        <button onClick={() => applyFormatting("italic")}><FaItalic /></button>
        <button className="flex items-center" onClick={() => applyFormatting("h1")}><FaHeading />1</button>
        <button className="flex items-center" onClick={() => applyFormatting("h2")}><FaHeading />2</button>
        <button className="flex items-center" onClick={() => applyFormatting("h3")}><FaHeading />3</button>
        <button onClick={() => applyFormatting("ordered-list")}><FaListOl /></button>
        <button onClick={() => applyFormatting("align-left")}><FaAlignLeft /></button>
        <button onClick={() => applyFormatting("align-center")}><FaAlignCenter /></button>
        <button onClick={() => applyFormatting("align-right")}><FaAlignRight /></button>
        <button onClick={() => setShowCodeInput(!showCodeInput)}><FaCode /></button>
        <button onClick={() => setShowImageInput(!showImageInput)}><FaImage /></button> {/* Botão de imagem */}
      </div>

      {showCodeInput && (
        <div className="my-6 rounded-md">
          <textarea
            className="text-black p-2"
            placeholder="Insert code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ width: "100%", height: "100px" }}
          />
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="p-2"
              placeholder="Language"
              value={codeLanguage}
              onChange={(e) => setCodeLanguage(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <button className="text-center" onClick={insertCodeSnippet}>
              <IoSend fontSize={20} />
            </button>
          </div>
        </div>
      )}

      {showImageInput && (
        <div className="my-4">
          <input
            type="text"
            className="p-2 border rounded w-full"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={insertImage}
          >
            Insert Image
          </button>
        </div>
      )}

      <textarea
        id="editor"
        value={value}
        className="pl-2 pt-4 w-full h-[300px]"
        placeholder="Insert content article"
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="mt-2 font-semibold">
        <p>Preview</p>
      </div>
      <div className="preview mt-1 border border-solid border-gray-400 p-10">
        {renderContent()}
      </div>
    </div>
  );
}

