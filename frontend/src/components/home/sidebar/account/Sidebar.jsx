"use client"

import { useSelector } from "react-redux";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FaRegClipboard } from "react-icons/fa";

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/store/slices/authSlice';

export function Sidebar(){

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // Função para abrir/fechar a sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  const language = useSelector((state) => state.language.language);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // Garante que a ação foi concluída com sucesso
      router.push('/login'); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  };

  return (
    <div>
      {/* Botão para abrir a Sidebar */}
      <div className="text-2xl cursor-pointer" onClick={toggleSidebar}>
        <FaUserCircle />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-gray-800 bg-opacity-90 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="relative h-full flex flex-col items-center justify-start">
          {/* Ícone de fechar */}
          <div
            className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
            onClick={toggleSidebar}
          >
            <IoClose />
          </div>

          {/* Conteúdo da Sidebar */}
          <div className="mt-16 text-white text-center ">
            <h2 className="text-3xl font-bold mb-4 ">{language === 'pt' ? 'Minha Conta' : 'My Account'}</h2>
            <p className="mb-4 flex items-center gap-1 justify-center">
              <FaRegClipboard fontSize={30}/>
              {language === 'pt' ? 'Meus dados' : 'My Data'}
            </p>
            
            <p
              className="mb-4 flex items-center gap-1 justify-center cursor-pointer"
              onClick={handleLogout}
            >
              <IoIosLogOut fontSize={30} />
              {language === 'pt' ? 'Sair' : 'Logout'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
