import React from "react";
import { formatDate } from "@/utils/utils";

const DatePickerField = ({ label, value, onChange }) => {
  const handleChange = (e) => {
    const newDate = e.target.value; // Pega o valor no formato yyyy-MM-dd
    onChange(newDate); // Passa a string yyyy-MM-dd ao onChange
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type="date"
        value={formatDate(value)} // Formata o valor para yyyy-MM-dd
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default DatePickerField;

