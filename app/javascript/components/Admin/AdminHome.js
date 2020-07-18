import React, { useEffect, useState } from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import Header from "./Header";

function AdminHome() {
  const history = useHistory();
  const match = useRouteMatch();
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
        <div className="flex flex-col">
          <a
            href="/admin"
            className="h-16 bg-gray-900 flex justify-center items-center"
          >
            <h1 className="text-2xl text-indigo-600 font-bold tracking-wide">
              Journal
            </h1>
          </a>
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800 text-gray-300">
              <Link
                to={`${match.url}`}
                className="group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
              >
                Dashboard
              </Link>
              <Link
                to={`${match.url}/route-map`}
                className="mt-1 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
              >
                Route Map
              </Link>
              <Link
                to={`${match.url}/establishments`}
                className="mt-1 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
              >
                Establishments
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header />
        <p>Admin Content</p>
      </div>
    </div>
  );
}

export default AdminHome;
