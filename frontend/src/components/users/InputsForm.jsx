"use client";

import Link from "next/link";
import Image from "next/image";
import logotype from "../../../public/Tech100px.png";
import PasswordToggle from "./PasswordToggle";

const FieldsForm = ({
  email,
  password,
  confirmPassword,
  setEmail,
  setPassword,
  setConfirmPassword,
  passwordErrors,
  error,
  loading,
}) => {
  return (
    <>
      <div className="mb-2 flex justify-end">
        <Image
          width={60}
          className="rounded-[50%]"
          src={logotype}
          alt="Logotype of Devlearn"
        />
      </div>
      <h2 className="text-3xl uppercase font-bold mb-6 text-center">Register</h2>
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Password</label>
        <PasswordToggle
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {/* Mostrar os requisitos não atendidos */}
        <ul className="text-sm text-red-500 mt-2">
          {passwordErrors.map((error, index) => (
            <li key={index}>- {error}</li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">
          Confirm Password
        </label>
        <PasswordToggle
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-6 text-md flex flex-col justify-center items-start font-medium">
        <p>
          Already have an account?
          <span>
            <Link className="text-blue-900 cursor-pointer" href={`/login`}>
              {" "}
              Log in
            </Link>
          </span>
        </p>
      </div>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <button
        type="submit"
        className="w-full font-semibold py-2 text-white bg-[#2E2D78] rounded-lg hover:bg-[#1a1946]"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </>
  );
};

export default FieldsForm;

