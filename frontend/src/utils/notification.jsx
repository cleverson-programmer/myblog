"use client";

import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Notification = ({ message, type = "success", onClose, duration = 3000 }) => {
    useEffect(() => {
      if (message && duration) {
        const timer = setTimeout(() => {
          if (onClose) onClose();
        }, duration);
  
        return () => clearTimeout(timer);
      }
    }, [message, duration, onClose]);
  
    if (!message) return null;
  
    const typeStyles = {
      success: "bg-green-100 border-green-400 text-green-700",
      error: "bg-red-100 border-red-400 text-red-700",
      info: "bg-blue-100 border-blue-400 text-blue-700",
      warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    };

    const appliedStyles = typeStyles[type] || "bg-gray-100 border-gray-400 text-gray-700";
  
    return (
      <div
        className={`mb-4 p-3 border rounded ${appliedStyles}`}
        role="alert"
      >
        {message}
        <button
          onClick={onClose}
          className="ml-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <IoClose/>
        </button>
      </div>
    );
  };

export default Notification;