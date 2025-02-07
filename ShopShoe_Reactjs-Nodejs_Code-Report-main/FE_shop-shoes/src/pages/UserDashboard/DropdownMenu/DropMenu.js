import React from "react";
import "./DropMenu.scss";
import { Link } from "react-router-dom";
import { logout } from "../../../utils/utils";

const Menus = [
  {
    path: "/info-account",
    name: "Thông tin tài khoản",
  },
];

const DropMenu = () => {
  return (
    <div className="absolute left-0 -translate-x-[24px] w-[180px] drop-menu top-[50px]">
      <ul className="w-auto gap-5 whitespace-nowrap">
        {Menus.map((menu) => (
          <li key={menu}>
            <Link to={menu.path}>{menu.name}</Link>
          </li>
        ))}
        <li
          onClick={() => {
            logout();
          }}
        >
          <span>Đăng xuất</span>
        </li>
      </ul>
    </div>
  );
};

export default DropMenu;
