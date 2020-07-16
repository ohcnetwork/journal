import React from "react";

import Button from "../Common/Button";

function Header() {
  return (
    <nav className="flex justify-between items-center px-4 py-4 border-b-2 border-gray-100 md:justify-start md:space-x-10">
      <a href="/user">
        <h1 className="text-xl text-indigo-600 font-bold">Journal</h1>
      </a>
      <div>
        <Button htmlType="button" className="border-transparent">
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Header;
