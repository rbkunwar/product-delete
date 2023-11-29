import { Button } from "react-bootstrap";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { FaBeer } from "react-icons/fa";
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import NewProduct from "./pages/product/NewProduct";
import PaymentOption from "./pages/payment-option/PaymentOption";
import Order from "./pages/order/Order";
import Review from "./pages/review/Review";
import Buyer from "./pages/buyer/Buyer";
import { PrivateRouter } from "./private-router/PrivateRouter";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { useDispatch } from "react-redux";
import { getUserAction } from "./pages/user-redux/userAction";
import EditProduct from "./pages/product/EditProduct";

function App() {
  const dispatch = useDispatch();
  //auto login even if you refresh the browser
  onAuthStateChanged(auth, (user) => {
    user?.uid && dispatch(getUserAction(user?.uid));
  });
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="register"
          element={
            <PrivateRouter>
              <Registration />
            </PrivateRouter>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRouter>
              <Dashboard />
            </PrivateRouter>
          }
        />
        <Route
          path="category"
          element={
            <PrivateRouter>
              <Category />
            </PrivateRouter>
          }
        />
        <Route
          path="product"
          element={
            <PrivateRouter>
              <Product />
            </PrivateRouter>
          }
        />
        <Route
          path="product/new"
          element={
            <PrivateRouter>
              <NewProduct />
            </PrivateRouter>
          }
        />
        <Route
          path="product/:id"
          element={
            <PrivateRouter>
              <EditProduct />
            </PrivateRouter>
          }
        />
        <Route
          path="payment-option"
          element={
            <PrivateRouter>
              <PaymentOption />
            </PrivateRouter>
          }
        />
        <Route
          path="order"
          element={
            <PrivateRouter>
              <Order />
            </PrivateRouter>
          }
        />
        <Route
          path="review"
          element={
            <PrivateRouter>
              <Review />
            </PrivateRouter>
          }
        />
        <Route
          path="buyer"
          element={
            <PrivateRouter>
              <Buyer />
            </PrivateRouter>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
