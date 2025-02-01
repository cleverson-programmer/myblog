"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterLayout from "@/components/users/RegisterLayout";
import RegisterForm from "@/components/users/RegisterForm";
import Loading from "@/utils/loading";
import {useDispatch, useSelector } from "react-redux";
import { resetSuccessMessage } from "@/store/slices/authSlice";

const RegisterPage = () => {
  const router = useRouter();
  const successMessage = useSelector((state) => state.auth.successMessage);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  // Resetar o estado de successMessage ao montar o componente
  useEffect(() => {
    dispatch(resetSuccessMessage());
  }, [dispatch]);


  return (
    <RegisterLayout>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <RegisterForm />
        </div>
      )}
    </RegisterLayout>
  );
};

export default RegisterPage;
