import orderService from "../service/orderService";
import db from "../models/index";

const sizeMapping = {
  36: 1,
  37: 2,
  38: 3,
  39: 4,
  40: 5,
  41: 6,
  42: 7,
};
const sizeMapping2 = {
  1: 36,
  2: 37,
  3: 38,
  4: 39,
  5: 40,
  6: 41,
  7: 42,
};

const createOrder = async (req, res) => {
  try {
    const order = await orderService.createNewOrderService(req.body);

    return res.status(200).json(order);
  } catch (e) {
    return res.status(500).json({
      errCode: "-1",
      errMessage: "LỖi",
      DT: e, //data
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const order = await orderService.addToCartService(req.body);

    return res.status(200).json(
      order //data
    );
  } catch (e) {
    return res.status(500).json({
      errCode: "-1",
      errMessage: "Lỗi",
      DT: "", //data
    });
  }
};

const getProductInCart = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await orderService.getProductInCartServive(id);

    return res.status(200).json(
      data //data
    );
  } catch (e) {
    return res.status(500).json({
      errCode: "-1",
      errMessage: "Lỗi",
      DT: "", //data
    });
  }
};

const getAllOrder = async (req, res) => {
  let page = req.query.page;
  let limit = req.query.limit;
  let sortByName = req.query.sortByName;
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;
  let dashboard = req.query.dashboard;
  try {
    const data = await orderService.getAllOrderService(
      +page,
      +limit,
      sortByName,
      startDate,
      endDate,
      dashboard
    );

    return res.status(200).json(
      data //data
    );
  } catch (e) {
    return res.status(500).json({
      errCode: "-1",
      errMessage: "Lỗi",
      DT: e, //data
    });
  }
};
const getAllOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await orderService.getAllOrderByUserIdService(userId);

    return res.status(200).json(
      data //data
    );
  } catch (e) {
    return res.status(500).json({
      errCode: "-1",
      errMessage: "Lỗi",
      DT: "", //data
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const data = await orderService.updateOrder(orderId, req.body);

    return res.status(200).json(
      data //data
    );
  } catch (e) {
    return res.status(500).json({
      errCode: "-1",
      errMessage: "Lỗi",
      DT: "", //data
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderDetails = await db.OrderDetail.findAll({
      where: { orderId: orderId },
    });
    const order = await db.Order.findOne({
      where: { id: orderId },
    });
    if (order.status !== "PENDING" || order.status === "CANCEL")
      return res.status(200).json({ status: "Hủy thất bại" }); //data

    await db.Order.update(
      {
        status: "CANCEL",
      },
      {
        where: { id: orderId },
      }
    );
    await db.Notification.create({
      name: order.username,
      email: order.email,
      phone: order.phone,
      content: `Đơn hàng ${orderId} đã bị hủy gồm các sản phẩm:\n ${orderDetails
        .map(
          (item) =>
            `ID ${item.productId} - size ${item.size} - ${item.quantity} sản phẩm`
        )
        .join("\n")}`,
      status: 0,
      orderId: orderId,
    });

    for (const orderDetail of orderDetails) {
      const productToUpdate = await db.Inventory.findOne({
        where: {
          productId: orderDetail.productId,
          sizeId: sizeMapping[orderDetail.size],
        },
      });

      if (productToUpdate) {
        // Tăng số lượng sản phẩm trong kho
        productToUpdate.quantityInStock =
          parseInt(productToUpdate.quantityInStock, 10) +
          parseInt(orderDetail.quantity, 10);

        // Lưu lại thay đổi vào database
        await productToUpdate.save();
      }
    }
    return res.status(200).json({ status: 200 }); //data
  } catch (e) {
    return res.status(500).json({
      errCode: "-1",
      errMessage: "Lỗi",
      DT: "", //data
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const data = await orderService.deleteOrderService(orderId);

    return res.status(200).json(
      data //data
    );
  } catch (e) {
    return res.status(500).json({
      errCode: "-1",
      errMessage: "Lỗi",
      DT: "", //data
    });
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const data = await orderService.deleteProductInCartService(req);

    return res.status(200).json(
      data //data
    );
  } catch (e) {
    return res.status(500).json({
      errCode: "-1",
      errMessage: "Lỗi",
      DT: "", //data
    });
  }
};

const deleteAllProductInCart = async (req, res) => {
  try {
    const data = await orderService.deleteAllProductInCartService(req);

    return res.status(200).json(
      data //data
    );
  } catch (e) {
    return res.status(500).json({
      errCode: "-1",
      errMessage: "Lỗi",
      DT: "", //data
    });
  }
};
module.exports = {
  addToCart: addToCart,
  getProductInCart: getProductInCart,
  createOrder: createOrder,
  getAllOrder: getAllOrder,
  updateOrder: updateOrder,
  deleteProductInCart: deleteProductInCart,
  deleteAllProductInCart: deleteAllProductInCart,
  getAllOrderByUserId: getAllOrderByUserId,
  deleteOrder: deleteOrder,
  cancelOrder: cancelOrder,
};
