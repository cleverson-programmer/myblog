"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersThunk } from "@/store/slices/userTableSlice";
import { deletedUser } from "@/store/slices/deleteUserSlice";
import { useRouter } from "next/navigation"; // Import do roteador correto no App Router

import { MdDelete } from "react-icons/md";

import Notification from "@/utils/notification";

const ArticleTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [type, setType] = useState("success");
  const [notification, setNotification] = useState(null);

  const { users, currentPage, isLoading, hasMore } = useSelector((state) => state.usersTable);
  const { loading, error } = useSelector( (state) => state.deleteUser );

  useEffect(() => {
    if (!hasMore || isLoading) return;
    dispatch(fetchUsersThunk(currentPage));
  }, [dispatch, currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deletedUser(id)).unwrap();
        setNotification(`User successfully deleted! ID: ${id}`);
        setType("success")

      } catch (error) {
        setNotification('Failed to delete user')
        setType("error")
      }
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
        <Notification
            message={notification}
            type={type}
            onClose={() => setNotification("")}
        />
        <div className="flex justify-end gap-4 mb-4">
            <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                <span>Deleted</span>
            </div>
        </div>
        <div className="max-h-[calc(10*3rem)] overflow-y-auto border border-gray-200 rounded-md">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">#</th>
                <th className="border border-gray-200 px-4 py-2">Email</th>
                <th className="border border-gray-200 px-4 py-2">Admin</th>
                <th className="border border-gray-200 px-4 py-2">ID</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {
                        user.profileId == 1 ? 'Admin' : 'Guest'
                    }

                  </td>
                  <td className="border border-gray-200 px-4 py-2">{user._id}</td>
                  <td className="flex justify-center border border-gray-200 px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleDelete(user._id)}
                    >
                      <MdDelete fontSize={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      {hasMore && (
        <button
          className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
          onClick={() => dispatch(fetchUsersThunk(currentPage + 1))}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "View More"}
        </button>
      )}
    </div>
  );
};

export default ArticleTable;

