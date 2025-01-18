"use client"

import ArticleTable from "@/components/articles/articleTable";
import { Header } from "@/components/home/nav/header";
import AdminRoute from "@/validations/adminRoute";

export default function PageEdit(){

    return(
        <div className="p-4">
            <AdminRoute>
                <Header/>
                <ArticleTable/>
            </AdminRoute>
        </div>
    )
}