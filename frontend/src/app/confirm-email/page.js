"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/utils/loading";
import { confirmedEmail } from "@/api/sendEmail";
import Notification from "@/utils/notification";

export default function ConfirmEmail() {
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const email = searchParams.get("email"); // Obtém o parâmetro "email" da URL
    const token = searchParams.get("token");

    if (!email || !token) {
      setNotification({
        message: "Link inválido ou incompleto.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    // Faz a requisição ao backend para confirmar o e-mail
    const confirmEmail = async () => {
      try {
        const response = await confirmedEmail(email, token); // Use a função de serviço
        setNotification({
          message: "Email confirmado com sucesso! Redirecionando...",
          type: "success",
        });

        // Redireciona para /login após 2 segundos
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (error) {
        setNotification({
          message: error.message || "Erro ao confirmar email.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    confirmEmail();
  }, [searchParams, router]);

  return (
    <div className="flex flex-col w-full justify-center items-center mt-10">
      <h1 className="text-lg font-semibold mb-4">Confirmação de Email</h1>
      {loading ? (
        <Loading />
      ) : (
        notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )
      )}
    </div>
  );
}