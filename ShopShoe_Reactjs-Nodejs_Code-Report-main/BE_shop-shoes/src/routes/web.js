import express from "express";
import userController from "../controller/userController";
import sizeController from "../controller/sizeController";
import supplierController from "../controller/supplierController";
import productController from "../controller/productController";
import reviewController from "../controller/reviewController";
import orderController from "../controller/orderController";
import notiController from "../controller/notiController";

const router = express.Router();

const initWebRoutes = (app) => {
  //Admin
  router.get("/product/dtadmin", productController.getDataManageAdmin);

  router.post("/create-new-user", userController.handleRegister);
  router.get("/getstaff", userController.getAllStaff);
  router.get("/getuser", userController.getAllUser);
  router.get("/getuser/:id", userController.getOneStaff);
  router.delete("/user/:id", userController.deleteUser);
  router.put("/user/update", userController.updateUser);
  router.post("/login", userController.handleLogin);

  router.get("/size", sizeController.readSize);

  //Order
  router.post("/addtocart", orderController.addToCart);
  router.get("/cancelorder/:id", orderController.cancelOrder);
  router.delete("/removeproductcart", orderController.deleteProductInCart);
  router.delete(
    "/removeallproductcart",
    orderController.deleteAllProductInCart
  );
  router.delete("/deleteorder/:id", orderController.deleteOrder);
  router.get("/getproductincart/:id", orderController.getProductInCart);
  router.post("/createOrder", orderController.createOrder);
  router.get("/getallorder", orderController.getAllOrder);
  router.get("/getorder/:id", orderController.getAllOrderByUserId);
  router.put("/updateorder/:id", orderController.updateOrder);

  //product
  router.post("/product/create", productController.createProduct);
  router.put("/product/update", productController.updateProduct);
  router.get("/product/sale", productController.getProductSale);
  router.get("/product", productController.getAllProduct);
  router.get("/product/bestseller", productController.getProductBestSeller);
  router.get("/product/:id", productController.getOneProduct);
  router.delete("/product/:id", productController.deleteProduct);

  //supplier
  router.post("/supplier/create", supplierController.createSupplier);
  router.get("/supplier/read", supplierController.getSuppliers);
  router.delete("/supplier/delete", supplierController.deleteSupp);
  router.put("/supplier/update", supplierController.updateSupp);

  //review
  router.get("/review/:id", reviewController.getAllReview);
  router.post("/review/create", reviewController.createReview);

  //Noti
  router.get("/getnoti", notiController.getAllNoti);

  return app.use("/api/v1/", router);
};

export default initWebRoutes;
