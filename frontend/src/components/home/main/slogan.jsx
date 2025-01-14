"use client"

import { ButtonMain } from "./button";
import { BoxEmail } from "./registerEmail";
import { useSelector } from "react-redux";

export function Slogan(){
    const language = useSelector((state) => state.language.language);

    return(
        <div className="flex flex-col justify-center w-[50%] font-semibold">
            <h1 className="text-6xl">
                { language === "pt" ? 'Programação, criptomoedas e mundo tech.': 'Programming, cryptocurrencies and the tech world.'}
            </h1>
            <ButtonMain/>
            <BoxEmail/>
        </div>
    )
}