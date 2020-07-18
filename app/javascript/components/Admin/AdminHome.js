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
  return <p>AdminHome</p>;
}

export default AdminHome;
