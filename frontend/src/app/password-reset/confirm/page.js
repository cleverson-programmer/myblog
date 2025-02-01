"use client"

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { confirmResetPassword } from '@/api/sendEmail';
import Notification from "@/utils/notification";
import Loading from '@/utils/loading';

export default function PasswordResetConfirm() {
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter()
    const token = searchParams.get('token');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await confirmResetPassword(token, password);
            
            setNotification({
                message: "Sua senha foi redefinida com sucesso. Redirecionado...",
                type: "success",
            });

            setPassword("")
        } catch (error) {
            setNotification({
                message: error.message || "Erro ao redifinir senha",
                type: "error",
            });
        }finally {
            setIsLoading(false);
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='w-full flex flex-col justify-center items-center h-[100vh]'>
             {
                notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className='w-[50%] mt-10 flex flex-col items-center justify-center'>
                <h1 className='font-bold text-2xl mb-10'>
                    Digite a nova senha
                </h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Nova senha"
                        value={password}
                        className='rounded-md p-2 bg-gray-200 w-80'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button 
                    type="submit"
                    className=' ml-2 rounded-md px-6 py-2 text-center text-white bg-[#2E2D78]'
                    >
                        {isLoading ? "Redefinindo..." : "Redefinir"}
                    </button>
                </form>
            </div>
            
        </div>
    );
}
