import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function AdminHome() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function isLoggedIn() {
      setLoading(true);
      const token = localStorage.getItem("admin-auth-token");
      if (!token) {
        history.push("/admin/login");
      }
      setLoading(false);
    }

    isLoggedIn();
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
        <a
          href="/user"
          className="h-16 bg-gray-900 flex justify-center items-center"
        >
          <h1 className="text-2xl text-indigo-600 font-bold tracking-wide">
            Journal
          </h1>
        </a>
        <nav></nav>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow"></div>
        <p>Admin Content</p>
      </div>
    </div>
  );
}

export default AdminHome;
