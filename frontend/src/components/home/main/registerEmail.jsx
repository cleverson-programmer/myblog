import React, { useState } from "react";
import { RiSendPlane2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { postNewEmail } from "@/api/sendEmail";
import Loading from "@/utils/loading";

export function BoxEmail() {
  const language = useSelector((state) => state.language.language);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);

    try {
      await postNewEmail(email);
      setIsSuccess(true);
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
    } finally {
      setIsLoading(false);
    }

    // Ocultar a mensagem de sucesso após 3 segundos
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div>
      <div className="w-[450px] border border-solid border-[#2E2D78] rounded-lg mt-10 p-2 py-4">
        <h2 className="font-medium text-xl">
          {language === "pt" ? "Junte-se a nós!" : "Join us!"}
        </h2>
        <p className="font-normal mt-4">
          {language === "pt"
            ? "Envie seu email e receba novos conteúdos"
            : "Send your email and receive new content"}
        </p>

        <form onSubmit={handleSubmit} className="flex items-center gap-4 mt-4">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado com o email digitado
            placeholder={
              language === "pt" ? "Digite seu email" : "Enter your email"
            }
            className="w-80 pl-2 text-black py-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="cursor-pointer">
            <RiSendPlane2Line fontSize={30} />
          </button>
        </form>

        {isLoading && <Loading />}
        {isSuccess && (
          <p className="text-green-500 mt-2">
            {language === "pt" ? "Registrado com sucesso!" : "Successfully registered!"}
          </p>
        )}
      </div>
    </div>
  );
}