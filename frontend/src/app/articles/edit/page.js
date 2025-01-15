"use client"

import ArticleTable from "@/components/articles/articleTable";
import { Header } from "@/components/home/nav/header";

export default function PageEdit(){

    return(
        <div className="p-4">
            <Header/>
            <ArticleTable/>
        </div>
    )
}