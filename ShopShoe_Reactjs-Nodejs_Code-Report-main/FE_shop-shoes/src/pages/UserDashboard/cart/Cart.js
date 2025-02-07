import React, { useEffect, useState } from "react";
import "./Cart.scss";
import { Link, NavLink } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import {
  addToCart,
  createOrder,
  getAllProductInCart,
  removeallproductcart,
  removeproductcart,
} from "../../../service/productService";
import { toast } from "react-toastify";
import { convertBase64ToImage } from "../../../assets/data/image";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../redux/cartSlice";

function Cart(props) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartProducts.data);
  const [user, setUser] = useState({});
  useEffect(() => {
    // Kiểm tra xem có thông tin người dùng trong Local Storage không
    const storedUser = localStorage.getItem("user");

    // Nếu có, chuyển đổi chuỗi JSON thành đối tượng và cập nhật state
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSetQuantity = async (number, id, size) => {
    const newArray = [...cartProducts];
    const updatedArray = newArray.map((item) => {
      if (
        item.quantity === 1 &&
        number === -1 &&
        item?.id === id &&
        item?.size === size
      ) {
        toast.warning("Số lượng sản phẩm không thể nhỏ hơn 1");
        return item;
      } else if (item?.id === id && item?.size === size) {
        return { ...item, quantity: item.quantity + number };
      } else {
        return item;
      }
    });

    dispatch(setProducts(updatedArray));
    let res = await addToCart({
      userId: user?.id,
      productId: id,
      sizeId: size,
      quantity: number,
    });
    if (res && res.errCode === 0) {
    } else {
      toast.error(res.errMessage);
    }
  };

  console.log(cartProducts);
  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="container">
          <div className="breadcrumb">
            <div className="flex breadcrumb-items">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="fas fa-home"></i>
                  <span className="breadcrumb-separator">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </Link>
              </li>
              <li>Giỏ Hàng</li>
            </div>
          </div>
        </div>

        <div className="py-5 bg-ghost-white">
          <div className="container">
            <div className="section-title bg-ghost-white">
              <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
                Giỏ hàng của tôi
              </h3>
            </div>
            <div className="cart-content">
              <div className="cart-left">
                {cartProducts?.length > 0 &&
                  cartProducts?.map((item, index) => (
                    <div className="grid cart-items" key={index}>
                      <div className="grid cart-item">
                        <div className="cart-item-img">
                          <img
                            src={convertBase64ToImage(item?.image)}
                            alt="nike"
                          />

                          <div className="flex items-center justify-center py-1 ">
                            <button
                              type="button"
                              className="p-2 rounded-full hover:bg-gray-200"
                              onClick={async () => {
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "You won't be able to revert this!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes, delete it!",
                                }).then(async (result) => {
                                  if (result.isConfirmed) {
                                    try {
                                      const data = {
                                        userId: user?.id,
                                        productId: item?.id,
                                        sizeId: item?.size,
                                      };

                                      await removeproductcart(data);
                                      Swal.fire(
                                        "Deleted!",
                                        "Your file has been deleted.",
                                        "success"
                                      );

                                      dispatch(
                                        setProducts(
                                          cartProducts.filter(
                                            (product) =>
                                              product.id !== item?.id ||
                                              product.size !== item?.size
                                          )
                                        )
                                      );
                                    } catch (e) {
                                      Swal.fire("Error", e, "error");
                                    }
                                  }
                                });
                              }}
                            >
                              <svg
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.125 1.25C1.79348 1.25 1.47554 1.3817 1.24112 1.61612C1.0067 1.85054 0.875 2.16848 0.875 2.5V3.75C0.875 4.08152 1.0067 4.39946 1.24112 4.63388C1.47554 4.8683 1.79348 5 2.125 5H2.75V16.25C2.75 16.913 3.01339 17.5489 3.48223 18.0178C3.95107 18.4866 4.58696 18.75 5.25 18.75H12.75C13.413 18.75 14.0489 18.4866 14.5178 18.0178C14.9866 17.5489 15.25 16.913 15.25 16.25V5H15.875C16.2065 5 16.5245 4.8683 16.7589 4.63388C16.9933 4.39946 17.125 4.08152 17.125 3.75V2.5C17.125 2.16848 16.9933 1.85054 16.7589 1.61612C16.5245 1.3817 16.2065 1.25 15.875 1.25H11.5C11.5 0.918479 11.3683 0.600537 11.1339 0.366117C10.8995 0.131696 10.5815 0 10.25 0L7.75 0C7.41848 0 7.10054 0.131696 6.86612 0.366117C6.6317 0.600537 6.5 0.918479 6.5 1.25H2.125ZM5.875 6.25C6.04076 6.25 6.19973 6.31585 6.31694 6.43306C6.43415 6.55027 6.5 6.70924 6.5 6.875V15.625C6.5 15.7908 6.43415 15.9497 6.31694 16.0669C6.19973 16.1842 6.04076 16.25 5.875 16.25C5.70924 16.25 5.55027 16.1842 5.43306 16.0669C5.31585 15.9497 5.25 15.7908 5.25 15.625V6.875C5.25 6.70924 5.31585 6.55027 5.43306 6.43306C5.55027 6.31585 5.70924 6.25 5.875 6.25ZM9 6.25C9.16576 6.25 9.32473 6.31585 9.44194 6.43306C9.55915 6.55027 9.625 6.70924 9.625 6.875V15.625C9.625 15.7908 9.55915 15.9497 9.44194 16.0669C9.32473 16.1842 9.16576 16.25 9 16.25C8.83424 16.25 8.67527 16.1842 8.55806 16.0669C8.44085 15.9497 8.375 15.7908 8.375 15.625V6.875C8.375 6.70924 8.44085 6.55027 8.55806 6.43306C8.67527 6.31585 8.83424 6.25 9 6.25ZM12.75 6.875V15.625C12.75 15.7908 12.6842 15.9497 12.5669 16.0669C12.4497 16.1842 12.2908 16.25 12.125 16.25C11.9592 16.25 11.8003 16.1842 11.6831 16.0669C11.5658 15.9497 11.5 15.7908 11.5 15.625V6.875C11.5 6.70924 11.5658 6.55027 11.6831 6.43306C11.8003 6.31585 11.9592 6.25 12.125 6.25C12.2908 6.25 12.4497 6.31585 12.5669 6.43306C12.6842 6.55027 12.75 6.70924 12.75 6.875Z"
                                  fill="black"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="cart-item-info">
                          <h5 className="cart-title">{item?.productName}</h5>
                          <div className="flex qty">
                            <span className="text-light-blue qty-text">
                              Số lượng:{" "}
                            </span>
                            <div className="flex qty-change">
                              <button
                                type="button"
                                className="flex items-center justify-center qty-dec fs-14"
                                onClick={() => {
                                  handleSetQuantity(-1, item?.id, item?.size);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 12h-15"
                                  />
                                </svg>
                              </button>
                              <span className="flex qty-value flex-center">
                                {item?.quantity}
                              </span>
                              <button
                                type="button"
                                className="flex items-center justify-center qty-inc fs-14"
                                onClick={() => {
                                  handleSetQuantity(1, item?.id, item?.size);
                                }}
                                // onClick={() => {
                                //   if (
                                //     product?.quantity >=
                                //     getProduct?.inventory?.find(
                                //       (item) => item?.sizeId === product?.sizeId
                                //     )?.quantityInStock
                                //   ) {
                                //     toast.error(
                                //       "Chỉ còn lại " +
                                //         product?.quantity +
                                //         " sản phẩm"
                                //     );
                                //     return;
                                //   }
                                //   setProduct({
                                //     ...product,
                                //     total_money:
                                //       (product?.quantity + 1) *
                                //       parseInt(getProduct.price),
                                //     quantity: product?.quantity + 1,
                                //   });
                                // }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="flex qty">
                            <span className="text-light-blue qty-text">
                              Size:{" "}
                            </span>
                            <div className="flex qty-change">{item?.size}</div>
                          </div>

                          <div className="flex items-center justify-between w-full price flex-between">
                            <div className="text-pine-green fw-4 fs-15">
                              Giá :{" "}
                              {Math.round(
                                parseInt(item?.price) *
                                  (item?.discount
                                    ? (100 - parseInt(item?.discount)) / 100
                                    : 1)
                              ).toLocaleString("vi-VN")}
                              đ
                            </div>
                            <div className="sub-total fw-6 fs-18 text-regal-blue">
                              <span>
                                Tổng:{" "}
                                {Math.round(
                                  parseInt(item?.price) *
                                    (item?.discount
                                      ? (100 - parseInt(item?.discount)) / 100
                                      : 1) *
                                    item?.quantity
                                ).toLocaleString("vi-VN")}
                                đ
                              </span>
                              <span className=""></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="btn-danger"
                  onClick={async () => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        try {
                          const data = {
                            userId: user?.id,
                          };

                          await removeallproductcart(data);
                          Swal.fire(
                            "Deleted!",
                            "Your file has been deleted.",
                            "success"
                          );

                          dispatch(setProducts([]));
                        } catch (e) {
                          Swal.fire("Error", e, "error");
                        }
                      }
                    });
                  }}
                >
                  <span className="fs-16">Xóa hết</span>
                </button>
              </div>
              <div className="bg-white cart-right">
                <div className="cart-summary text-light-blue">
                  <div className="cart-summary-title">
                    <h6 className="fs-20 fw-5">Đặt hàng</h6>
                  </div>
                  <ul className="cart-summary-info">
                    <li className="flex flex-between">
                      <span className="fw-4">Giá</span>
                      <span className="fw-7">
                        {Math.round(
                          cartProducts?.length === 0
                            ? "0"
                            : cartProducts?.reduce(
                                (accumulator, currentValue) =>
                                  accumulator +
                                  parseInt(currentValue.price) *
                                    (currentValue?.discount
                                      ? (100 -
                                          parseInt(currentValue?.discount)) /
                                        100
                                      : 1) *
                                    currentValue.quantity,
                                0
                              )
                        ).toLocaleString("vi-VN")}
                      </span>
                    </li>
                    {/* <li className="flex flex-between">
                      <span className="fw-4">Giảm giá</span>
                      <span className="fw-7">
                        <span className="fw-5 text-red">-&nbsp;</span>
                      </span>
                    </li>
                    <li className="flex flex-between">
                      <span className="fw-4">Chi phí giao hàng</span>
                      <span className="fw-7">
                        <span className="fw-5 text-gold">+&nbsp;</span>
                      </span>
                    </li> */}
                  </ul>
                  <div className="flex cart-summary-total flex-between fs-18">
                    {/* <span className="fw-6">Tạm tính: </span> */}
                    <span className="fw-6"></span>
                  </div>
                  <div className="cart-summary-btn">
                    <NavLink
                      to="/order"
                      className="flex items-center justify-center w-full h-full py-2 text-white bg-yellow-500 rounded-md"
                    >
                      Đặt hàng
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
