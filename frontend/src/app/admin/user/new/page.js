"use client"

import RegisterAdminForm from "@/components/users/RegisterAdminForm";
import RegisterLayout from "@/components/users/RegisterLayout";
import Loading from "@/utils/loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { resetSuccessMessage } from "@/store/slices/authSlice";
import AdminRoute from "@/validations/adminRoute";
import { Header } from "@/components/home/nav/header";

export default function RegisterAdmin(){

  const router = useRouter();
  const successMessage = useSelector((state) => state.auth.successMessage);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  // Resetar o estado de successMessage ao montar o componente
  useEffect(() => {
    dispatch(resetSuccessMessage());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [successMessage, router]);

    return(
    <AdminRoute>
        <RegisterLayout>
            {loading ? (
                <Loading />
            ) : (
                <div>
                <RegisterAdminForm/>
                </div>
            )}
        </RegisterLayout>
    </AdminRoute>
    )
}