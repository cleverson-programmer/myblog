import { useSelector } from "react-redux";

export function ButtonMain({ onClick, className = "", disabled = false }) {
  const language = useSelector((state) => state.language.language);

  return (
    <div>
      <button
        onClick={onClick}
        className={`uppercase px-10 py-3 rounded-lg text-white bg-[#2E2D78] mt-5 ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#15153b]"
        }`}
        disabled={disabled}
      >
        {language === "pt" ? "Ver Mais" : "Show More"}
      </button>
    </div>
  );
}