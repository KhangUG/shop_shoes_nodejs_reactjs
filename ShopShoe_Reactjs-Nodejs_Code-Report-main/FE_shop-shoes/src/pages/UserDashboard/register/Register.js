import React, { useState } from "react";
import "./Register.scss";
import Navbar from "../../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import { toast } from "react-toastify";
import { createNewUser } from "../../../service/userService";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidUsername: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const isValidation = () => {
    setObjCheckInput(defaultValidInput);
    if (!username) {
      setObjCheckInput({ ...defaultValidInput, isValidUserName: false });
      toast.error("Họ tên không được để trống!");
      return false;
    }

    if (!email) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Email không được để trống!");
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Eamil không hợp lệ!");
      return false;
    }

    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });

      toast.error("Mật khẩu không được để trống!");
      return false;
    }

    if (password !== confirmPassword) {
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      toast.error("Mật khẩu chưa khớp");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValidation();

    if (check === true) {
      let response = await createNewUser(username, email, password);
      let serverData = response;
      console.log("check res: ", serverData);
      if (+serverData.errCode === 0) {
        toast.success(serverData.errMessage);
        navigate("/login");
      } else {
        toast.error(serverData.errMessage);
      }
      console.log("check res: ", response);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup template d-flex justify-content-center align-items-center vh-100">
        <div className="form-container p-5 rounded bg-white">
          <form>
            <h3 className="text-center">Đăng ký</h3>
            <div className="mb-2">
              <label htmlFor="text">
                HỌ TÊN <span className="important">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className={
                  objCheckInput.isValidUsername
                    ? "form-control"
                    : "is-invalid form-control"
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">
                EMAIL <span className="important">*</span>
              </label>
              <input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "is-invalid form-control"
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password">
                MẬT KHẨU <span className="important">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "is-invalid form-control"
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                NHẬP LẠI MẬT KHẨU <span className="important">*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className={
                  objCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "is-invalid form-control"
                }
              />
            </div>
          </form>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Đăng Ký
            </button>
          </div>
          <p className="text-end mt-2">
            Bạn đã có tài khoản?
            <Link to="/login" className="ms-2">
              Đăng Nhập
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
