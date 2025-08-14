import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { CollectionPage } from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import CheckOut from "./components/Cart/CheckOut";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import { MyOrder } from "./pages/MyOrder";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProdut from "./components/Admin/EditProdut";
import OrderManagement from "./components/Admin/OrderManagement";
import { Provider } from "react-redux";
import Protected from "./components/Common/Protected";
import store from "../redux/store";
export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout></UserLayout>}>
            <Route index element={<Home></Home>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="register" element={<Register></Register>}></Route>
            <Route path="profile" element={<Profile></Profile>}></Route>
            <Route
              path="collection/:collection"
              element={<CollectionPage />}
            ></Route>
            <Route path="product/:id" element={<ProductDetails />}></Route>
            <Route path="checkout" element={<CheckOut />}></Route>
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            ></Route>
            <Route path="order/:id" element={<OrderDetailsPage />}></Route>
            <Route path="my-orders" element={<MyOrder />}></Route>
          </Route>
          <Route
            path="/admin"
            element={
              <Protected role="admin">
                <AdminLayout />
                checkoutItems
              </Protected>
            }
          >
            <Route index element={<AdminHomePage></AdminHomePage>}></Route>
            <Route path="users" element={<UserManagement />}></Route>
                  <Route
              path="orders"
              element={<OrderManagement />}
            ></Route>
            <Route path="products" element={<ProductManagement />}></Route>
            <Route path="products/:id/edit" element={<EditProdut />}></Route>

            <Route
              path="products/:id/edit"
              element={<OrderManagement />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
