"use client"

import { useState } from "react";
import { IoSettings } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

export function SidebarSettings(){
  const [isOpenConfig, setIsOpenConfig] = useState(false);

  // Função para abrir/fechar a sidebar
  const toggleSidebar = () => setIsOpenConfig(!isOpenConfig);

  return (
    <div>
      {/* Botão para abrir a Sidebar */}
      <div className="text-2xl cursor-pointer" onClick={toggleSidebar}>
        <IoSettings/>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-gray-800 bg-opacity-90 transform ${
          isOpenConfig ? "translate-x-0" : "translate-x-full"
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
          <div className="mt-16 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
            <p className="mb-2">Articles</p>
            <p className="mb-2">Users</p>
            <p className="mb-2">Graphics</p>
          </div>
        </div>
      </div>
    </div>
  );
};
