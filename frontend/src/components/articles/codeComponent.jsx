import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FaRegCopy } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";

import { useState } from "react";

export default function Code({ name, code, language }) {
  const [copy, setCopy] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopy(true);
    setTimeout(() => setCopy(false), 3000);
  };

  return (
    <div className="max-w-full min-w-[25rem] bg-[#3a404d] rounded-md overflow-hidden">
      <div className="flex justify-between px-4 text-white text-xs items-center">
        <p className="text-sm" name={name}>
          {name}
        </p>
        {copy ? (
          <button className="py-1 inline-flex items-center gap-1">
            <IoIosCheckmark className="text-base mt-1" />
            Copied!
          </button>
        ) : (
          <button className="py-1 inline-flex items-center gap-1" onClick={handleCopy}>
            <FaRegCopy className="text-base mt-1" />
            Copy code
          </button>
        )}
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{ padding: "25px" }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}