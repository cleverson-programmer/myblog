"use client"

import { useSelector } from "react-redux";
import Link from "next/link";
export function Navbar(){
    const language = useSelector((state) => state.language.language);

    return(
        <div className="">
            <ul className="flex gap-20 text-xl uppercase">
                <li className="transition-colors duration-300 hover:text-[#2E2D78]">
                    <Link href="/">{ language === "pt" ? "Inicial" : "Home" }</Link>
                </li>
                <li className="transition-colors duration-300 hover:text-[#2E2D78]">
                    <Link href="/#about">{ language === "pt" ? "Sobre" : "About" }</Link>
                </li>
                <li className="transition-colors duration-300 hover:text-[#2E2D78]">
                    <Link href={'/articles'}>{ language === "pt" ? "Artigos" : "Articles" }</Link>
                </li>
                <li className="transition-colors duration-300 hover:text-[#2E2D78]">
                    <Link href="/#contact">{ language === "pt" ? "Contato" : "Contact" }</Link>
                </li>
            </ul>
        </div>
    )
}