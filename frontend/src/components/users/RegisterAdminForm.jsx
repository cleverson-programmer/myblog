"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAdminUser } from "@/store/slices/authSlice";
import FieldsForm from "./InputsForm";

const RegisterAdminForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { successMessage, error, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password)
    dispatch(registerAdminUser({ email, password }));
    if (successMessage && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white shadow-md rounded-lg w-96"
    >
      {successMessage && (
        <p className="text-green-500 mb-4 text-lg text-center">
          {successMessage}
        </p>
      )}
      <FieldsForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        error={error}
        loading={loading}
      />
    </form>
  );
};

export default RegisterAdminForm;