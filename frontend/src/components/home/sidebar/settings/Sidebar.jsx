"use client"

import { useState } from "react";
import { IoSettings } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

export function SidebarSettings(){
  const [isOpenConfig, setIsOpenConfig] = useState(false);

  const [isOpenArticle, setIsOpenArticle] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);

  const toggleDropdownArticle = () => {
    setIsOpenArticle(!isOpenArticle);
  };

  const toggleDropdownUser = () => {
    setIsOpenUser(!isOpenUser);
  };

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
            <div className="flex flex-col">
              <button
                onClick={toggleDropdownArticle}
                className="flex items-center text-center justify-center font-semibold">
                Article
                {isOpenArticle ? <IoMdArrowDropdown/> : <IoMdArrowDropright/>}
              </button>
              {isOpenArticle && (
                <div className=" mt-1 text-center">
                  <div className="flex flex-col">
                    <a href="/articles/new" className="mb-2">
                      Insert new articles
                    </a>
                    <a href="/articles/edit" className="mb-2">
                      Edit articles
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <button
                onClick={toggleDropdownUser}
                className="flex items-center text-center justify-center font-semibold">
                Users
                {isOpenUser ? <IoMdArrowDropdown/> : <IoMdArrowDropright/>}
              </button>
              {isOpenUser && (
                <div className=" mt-1 text-center">
                  <div className="flex flex-col">
                    <a href="/admin/user/new" className="mb-2">
                      Insert new user
                    </a>
                    <a href="/user/edit" className="mb-2">
                      Edit users
                    </a>
                  </div>
                </div>
              )}
              <a href={'/dashboard'} className="mb-2 text-center flex justify-center font-semibold">Graphics</a>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};
