import userService from "../service/userSerive";

// const handleCreateNewUser = async (req, res) => {
//   let message = await userService.createNewUser(req.body);
//   console.log(message);
//   return res.status(200).json(message);
// };

const handleRegister = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({
        errCode: "1",
        errMessage: "Thiếu tham số bắt buộc",
        DT: "", //data
      });
    }

    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        errCode: "1",
        errMessage: "Mật khẩu phải nhiều hơn 4 kí tự",
        DT: "", //data
      });
    }
    console.log(">>> call me:", req.body);

    let data = await userService.registerNewUser(req.body);

    return res.status(200).json({
      errCode: data.errCode,
      errMessage: data.errMessage,
      DT: "", //data
    });
  } catch (e) {
    return res.status(500).json({
      errCode: "-1",
      errMessage: "OK",
      DT: "", //data
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await userService.handleUserLogin(req.body);
    return res.status(200).json({
      errCode: data.errCode,
      errMessage: data.errMessage,
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Lỗi máy chủ",
      DT: "",
    });
  }
};

const getAllStaff = async (req, res) => {
  let page = req.query.page;
  let limit = req.query.limit;
  let sortByName = req.query.sortByName;

  try {
    let data = await userService.getAllStaffService(+page, +limit, sortByName);
    return res.status(200).json({
      errCode: data.errCode,
      errMessage: data.errMessage,
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Lỗi máy chủ",
      DT: "",
    });
  }
};
const getAllUser = async (req, res) => {
  let page = req.query.page;
  let limit = req.query.limit;
  try {
    let data = await userService.getAllUserService(+page, +limit);
    return res.status(200).json({
      errCode: data.errCode,
      errMessage: data.errMessage,
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Lỗi máy chủ",
      DT: "",
    });
  }
};
const getOneStaff = async (req, res) => {
  try {
    let data = await userService.getOneStaffService(req.params.id);
    return res.status(200).json({
      errCode: data.errCode,
      errMessage: data.errMessage,
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Lỗi máy chủ",
      DT: "",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let data = await userService.updateUserService(req.body);
    return res.status(200).json({
      errCode: data.errCode,
      errMessage: data.errMessage,
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Lỗi máy chủ",
      DT: "",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let data = await userService.deleteUserService(req.params.id);
    return res.status(200).json({
      errCode: data.errCode,
      errMessage: data.errMessage,
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Lỗi máy chủ",
      DT: "",
    });
  }
};

module.exports = {
  // handleCreateNewUser: handleCreateNewUser,
  handleRegister: handleRegister,
  handleLogin: handleLogin,
  getAllStaff: getAllStaff,
  getOneStaff: getOneStaff,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getAllUser: getAllUser,
};
