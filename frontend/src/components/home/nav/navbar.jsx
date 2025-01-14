"use client"

import Link from "next/link";
import { useSelector } from "react-redux";

export function Navbar(){
    const language = useSelector((state) => state.language.language);

    return(
        <div className="">
            <ul className="flex gap-20 text-xl uppercase">
                <li className="transition-colors duration-300 hover:text-[#2E2D78]">
                    <a href="/">{ language === "pt" ? "Inicial" : "Home" }</a>
                </li>
                <li className="transition-colors duration-300 hover:text-[#2E2D78]">
                    <a href="/">{ language === "pt" ? "Sobre" : "About" }</a>
                </li>
                <li className="transition-colors duration-300 hover:text-[#2E2D78]">
                    <a href={'/articles'}>{ language === "pt" ? "Artigos" : "Articles" }</a>
                </li>
                <li className="transition-colors duration-300 hover:text-[#2E2D78]">
                    <a href="/">{ language === "pt" ? "Contato" : "Contact" }</a>
                </li>
            </ul>
        </div>
    )
}