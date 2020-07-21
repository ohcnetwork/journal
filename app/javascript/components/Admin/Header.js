import React from "react";
import { useHistory } from "react-router-dom";

import { logout } from "Apis/Admin/Auth";
import Button from "components/Common/Button";

function Header() {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/admin/login");
  };

  return (
    <nav className="flex relative z-10 flex-shrink-0 h-16 bg-white shadow justify-between items-center px-4 py-3 border-b-2 border-gray-100 md:justify-end md:space-x-10">
      <div>
        <Button
          htmlType="button"
          className="border-transparent"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Header;
