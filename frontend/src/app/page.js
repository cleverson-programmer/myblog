"use client"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from "next/image";
import ProtectedRoute from '../components/protectedRoute';
import { Header } from "@/components/home/nav/header";
import { Main } from "@/components/home/main/main";

export default function Home() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('authUser'));
    if (token && user) {
      dispatch({ type: 'auth/loginUser/fulfilled', payload: { user, token } });
    }
  }, [dispatch]);

  return (
    <ProtectedRoute>
      <div className=" min-h-screen px-4 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Header/>
          <Main/>
        </main>
      </div>
    </ProtectedRoute>
  );
}
