"use client";

import { useState } from 'react';
import axios from 'axios';
import Notification from "@/utils/notification";
import { resetPassword } from '@/api/sendEmail';
import Loading from '@/utils/loading';

export default function PasswordResetRequest() {
    const [email, setEmail] = useState('');
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Ativa o loading antes de iniciar a requisição

        try {
            const response = await resetPassword(email);

            setNotification({
                message: "Foi enviado para sua caixa de entrada um email com o link de redefinição de senha!",
                type: "success",
            });

            setEmail(""); // Limpa o campo de email após o envio
        } catch (error) {
            setNotification({
                message: error.message || "Erro ao enviar link de redefinição de senha",
                type: "error",
            });
        } finally {
            setIsLoading(false); // Desativa o loading após a requisição ser concluída
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='w-full flex flex-col justify-center items-center h-[100vh]'>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className='w-[50%] mt-10 flex flex-col items-center justify-center'>
                <h1 className='font-bold text-2xl mb-10'>Digite seu email para redefinição de senha</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='rounded-md p-2 bg-gray-200 w-80'
                        required
                    />
                    <button
                        className='ml-2 rounded-md px-6 py-2 text-center text-white bg-[#2E2D78]'
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Enviando..." : "Enviar"}
                    </button>
                </form>
            </div>
        </div>
    );
}