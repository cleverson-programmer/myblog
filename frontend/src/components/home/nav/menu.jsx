"use client"

import ThemeToggle from "@/themes/themeToggle";
import { CiSearch } from "react-icons/ci";
import { Sidebar }from "../sidebar/account/Sidebar";
import { SidebarSettings } from "../sidebar/settings/Sidebar";
import LanguageToggle from "@/languages/languageToggle";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchResults, setQuery } from "@/store/slices/searchArticles";

import { isAdminUser } from "@/validations/adminValidation";

export function Menu(){

  const [isAdmin, setIsAdmin] = useState(false);
    
  const language = useSelector((state) => state.language.language);
  
  const dispatch = useDispatch();

  const { query, results } = useSelector((state) => state.search);

  const [isListVisible, setIsListVisible] = useState(false); // Controla a visibilidade da lista
  const listRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAdmin(isAdminUser(token));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      dispatch(fetchSearchResults(query));
      setIsListVisible(true);
    }
  };

  const handleChange = (e) => {
    dispatch(setQuery(e.target.value));
    setIsListVisible(!!e.target.value);
  };

  const handleClickOutside = (e) => {
    if (listRef.current && !listRef.current.contains(e.target)) {
      setIsListVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    return(
        <div className="flex">
            <div className="flex mr-4 items-center text-lg relative w-80 max-w-sm">
                <input
                    type="search"
                    value={query}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 text-black rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={language === "pt" ? "Pesquisar" : "Search"}
                />
                <CiSearch
                className="absolute left-3 text-black cursor-pointer"
                onClick={handleSearch}
                />
                {isListVisible && results.length > 0 && (
                    <ul
                        ref={listRef}
                        className="absolute text-black top-full left-0 w-full h-40 overflow-y-scroll bg-white border border-gray-300 shadow-lg rounded-lg z-10"
                    >
                        {results.map((article) => (
                        <li
                            key={article._id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {article.title}
                        </li>
                        ))}
                    </ul>
                )}
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