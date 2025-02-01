"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/slices/authSlice";
import FieldsForm from "./InputsForm";
import Notification from "@/utils/notification";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const { successMessage, error, loading } = useSelector((state) => state.auth);

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Valida os requisitos da senha e atualiza a lista de erros
    const errors = [];
    if (!/(?=.*[A-Z])/.test(value)) errors.push("1 letra maiúscula");
    if (!/(?=.*[a-z])/.test(value)) errors.push("1 letra minúscula");
    if (!/(?=.*\d)/.test(value)) errors.push("1 número");
    if (!/(?=.*[@$!%*?&#])/.test(value)) errors.push("1 caractere especial");
    if (value.length < 6) errors.push("Mínimo de 6 caracteres");
    setPasswordErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotification({
        message: "As senhas não coincidem.",
        type: "error",
      });
      return;
    }

    if (passwordErrors.length > 0) {
      setNotification({
        message: "A senha não atende aos requisitos.",
        type: "error",
      });
      return;
    }

    dispatch(registerUser({ email, password }));
  };

  useEffect(() => {
    if (successMessage) {
      setNotification({
        message: "Registro bem-sucedido! Verifique seu email para confirmar o registro.",
        type: "success",
      });
    } else if (error) {
      setNotification({
        message: "Erro ao registrar. Tente novamente.",
        type: "error",
      });
    }
  }, [successMessage, error]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white shadow-md rounded-lg w-96"
    >
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <FieldsForm
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        setEmail={setEmail}
        setPassword={handlePasswordChange}
        setConfirmPassword={setConfirmPassword}
        passwordErrors={passwordErrors}
        error={error}
        loading={loading}
      />
    </form>
  );
};

export default RegisterForm;


