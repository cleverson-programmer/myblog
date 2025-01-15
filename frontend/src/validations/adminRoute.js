"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdminUser } from "@/validations/adminValidation";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const expiration = localStorage.getItem('tokenExpiration');
    if (!token || !expiration || Date.now() > expiration || !isAdminUser(token)) {

      //Exibir componente de erro de unauthorized
      alert('Você não tem permissão')
      router.replace("/"); // Redireciona para a página inicial
    } else {
        setIsAdmin(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // Opcional: Exiba um carregamento enquanto verifica
  }

  return isAdmin ? children : null;
};

export default AdminRoute;
