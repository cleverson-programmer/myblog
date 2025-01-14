"use client"

import ThemeToggle from "@/themes/themeToggle";
import { CiSearch } from "react-icons/ci";
import { Sidebar }from "../sidebar/account/Sidebar";
import { SidebarSettings } from "../sidebar/settings/Sidebar";
import LanguageToggle from "@/languages/languageToggle";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import jwt from 'jsonwebtoken'

export function Menu(){

  const [isAdmin, setIsAdmin] = useState(false);
    
  const language = useSelector((state) => state.language.language);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwt.decode(token); // Decodifica o token
        setIsAdmin(decodedToken.profileId === 1); // Verifica se o usuário é administrador
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

    return(
        <div className="flex">
            <div className="flex pr-5 items-center text-lg relative w-80 max-w-sm">
                <input 
                    type="search" 
                    className="w-full pl-10 pr-4 py-2 text-black rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={ language === "pt" ? "Pesquisar" : "Search" }
                />
                <CiSearch className="absolute left-3 text-gray-700 cursor-pointer" />
            </div>
            <div className="flex text-2xl gap-6 items-center cursor-pointer ">
            <Sidebar/>
            {isAdmin && <SidebarSettings />}
            <LanguageToggle/>
            <ThemeToggle/>
            </div>
        </div>
    )
}