import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
const Navbar = () => {
  const { token, setToken } = useContext(authContext);
  const navigate = useNavigate();
  const {numOfItems} = useContext(CartContext);





  function logOut(){
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-slate-200 py-5 w-full sticky">
        <div className="lg:w-[90%]  mx-auto lg:flex lg:flex-wrap justify-between items-center">
          <div className="logo flex ">
            <i className="fa-solid fa-shopping-cart text-green-500 fa-2x me-2">
            </i>
            <h2 className="text-2xl">Fresh Market</h2>
          </div>
          <div className="nav_links text-center">
            <ul className="lg:flex lg:flex-wrap justify-between items-center">
              {token ? (
                <>
                  <li className="mt-4 lg:ms-3 ">
                    <NavLink to="/">Products</NavLink>
                  </li>
                  <li className="mt-4 lg:ms-3 lg:me-3 ">
                    <NavLink to="/category">Category</NavLink>
                  </li>
                  <li className="mt-4 lg:me-3 ">
                    <NavLink to="/brand">Brand</NavLink>
                  </li>
                  <li className="mt-4 lg:me-3 ">
                    <NavLink to="/wishlist">WishList</NavLink>
                  </li>
                  <li className="mt-4 lg:me-3 relative">
                    <NavLink to="/cart">
                    Cart
                    </NavLink>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full sm:-top-4  sm:-end-4 -end--0 ms-1 -top-2  dark:border-gray-900">{numOfItems}</div>
                  </li>
                  <li className="mt-4 lg:me-3 relative">
                    <NavLink to="/allorders">
                      My Orders
                    </NavLink>
                  </li>
                </>
              ) : (
                " "
              )}
            </ul>
          </div>

          <div className="social_Links text-center mt-4 lg:flex lg:flex-wrap ">
            <div className="lg:mb-0 mb-2">
              <i className="fa-brands  fa-facebook-f me-3"></i>
              <i className="fa-brands me-3 ms-3 fa-pinterest-p"></i>
              <i className="fa-brands me-3 ms-3 fa-linkedin-in"></i>
              <i className="fa-brands  ms-3 fa-twitter lg:me-4"></i>
            </div>

            <div>
              {token ? (
               
                   <button onClick={logOut}  type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-7 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Logout</button>
               
              ) : (
                <>
                  {" "}
                  <NavLink className="me-4" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="ms-4" to="/register">
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
