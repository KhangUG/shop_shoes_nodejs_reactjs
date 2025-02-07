import React, { useEffect } from "react";
import { Banner, Navbar, Features, HomeProduct, Footer } from "../components";
import Swal from "sweetalert2";
import axios from "axios";

function HomePage() {
  const queryParams = new URLSearchParams(window.location.search);
  const orderId = queryParams.get("orderId");
  // console.log(orderId);
  // http://localhost:6868/api/v1/cancelOrder/${orderId}

  const handleCancelOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:6868/api/v1/cancelOrder/${orderId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res?.data?.status === 200) {
        Swal.fire({
          title: "Hủy thành công!",
          text: "Bạn đã hủy thành công đơn hàng.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Thất bại!",
          text: "Đơn hàng không thể hủy.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Thất bại!",
        text: "Đơn hàng không thể hủy.",
        icon: "error",
      });
    }
  };
  useEffect(() => {
    if (orderId) {
      Swal.fire({
        title: "Bạn chắc chắn muốn hủy đơn hàng?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          handleCancelOrder();
        }
      });
    }
  }, [orderId]);
  return (
    <>
      <Navbar />
      <Banner />
      <Features />
      <HomeProduct />
      <Footer />
    </>
  );
}

export default HomePage;
