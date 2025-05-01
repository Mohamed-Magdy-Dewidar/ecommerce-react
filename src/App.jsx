import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Brand from "./Components/Brand/Brand";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Category from "./Components/Category/Category";
import Notfound from "./Components/Notfound/Notfound";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductsDetails from "./Components/ProductsDetails/ProductsDetails";
import CartContextProvider from "./Context/CartContext";
import Cart from "./Components/Cart/Cart";
import Payment from "./Components/Payment/Payment";
import AllOrderes from "./Components/AllOrderes/AllOrderes";
import WishList from "./Components/WishList/WishList";
import WishListProvider from "./Context/WishList";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import CreateNewlogin from "./Components/CreateNewlogin/CreateNewlogin";
import VerifyCode from "./Components/VerifyCode/VerifyCode";

function App() {

  
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brand",
          element: (
            <ProtectedRoute>
              <Brand />
            </ProtectedRoute>
          ),
        },
        {
          path: "/productsdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductsDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Category",
          element: (
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <AllOrderes />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Payment",
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "/forgetpassword", element: <ForgotPassword /> },
        { path: "/verify-code", element: <VerifyCode /> },
        { path: "/reset-password", element: <CreateNewlogin /> },
        { path: "/register", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  const x = new QueryClient();

  return (
    <QueryClientProvider client={x}>
      <AuthContextProvider>
        <CartContextProvider>
          <WishListProvider>
            <Toaster />

            <RouterProvider router={myRouter} />
          </WishListProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
