import { FaHome, FaUser, FaBell } from "react-icons/fa";
import { BiCog } from "react-icons/bi";
// import {
//   AiFillFolderAdd,
//   AiFillHeart,
//   AiOutlineMenu,
//   AiTwotoneFileExclamation,
// } from "react-icons/ai";
import { BsCartCheck, BsFillArchiveFill } from "react-icons/bs";

export const routes = [
  {
    path: "/admin/home",
    name: "Trang chủ",
    icon: <FaHome />,
  },
  {
    path: "/admin/manage-order",
    name: "Đơn hàng",
    icon: <BsCartCheck />,
  },
  {
    name: "Sản phẩm",
    icon: <BsFillArchiveFill />,
    subRoutes: [
      {
        path: "/admin/manage-product",
        name: "Danh sách sản phẩm",
        // icon: <AiOutlineMenu />,
      },
      {
        path: "/admin/create-product",
        name: "Thêm sản phẩm",
        // icon: <AiFillFolderAdd />,
      },
      {
        path: "/admin/supplier",
        name: "Nhà cung cấp",
        // icon: <AiFillFolderAdd />,
      },
    ],
  },
  {
    name: "Người dùng",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "/admin/manage-user",
        name: "Nhân viên",
        // icon: <FaUser />,
      },
      {
        path: "/admin/manage-customer",
        name: "Khách hàng",
        // icon: <FaLock />,
      },
    ],
  },
  // {
  //   name: "Bài viết",
  //   icon: <AiTwotoneFileExclamation />,
  //   subRoutes: [
  //     {
  //       path: "/settings/profile",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //   ],
  // },

  {
    path: "/admin/manage-notification",
    name: "Yêu cầu",
    icon: <FaBell />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Logout",
        icon: <FaUser />,
      },
      // {
      //   path: "/settings/2fa",
      //   name: "2FA",
      //   icon: <FaLock />,
      // },
      // {
      //   path: "/settings/billing",
      //   name: "Billing",
      //   icon: <FaMoneyBill />,
      // },
    ],
  },
];
