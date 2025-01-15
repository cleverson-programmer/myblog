import React, { useState } from "react";

const MultiCategoryInput = ({ label, categories, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddCategory = () => {
    if (inputValue.trim()) {
      onChange([...categories, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    onChange(updatedCategories);
  };

  return (
    <div className="mb-4">
      <label className="block mt-4 text-sm font-medium">{label}</label>
      <div className="flex items-center gap-2 mt-1">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a category"
          className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="px-3 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none"
        >
          Add
        </button>
      </div>
      <ul className="mt-2 space-y-1">
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md"
          >
            <span>{category}</span>
            <button
              type="button"
              onClick={() => handleRemoveCategory(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiCategoryInput;

