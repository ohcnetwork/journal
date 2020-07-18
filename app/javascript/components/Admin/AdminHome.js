import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

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
      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header />
        <p>Admin Content</p>
      </div>
    </div>
  );
}

export default AdminHome;
