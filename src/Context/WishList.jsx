import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";

export const wishListContext = createContext();

const WishListProvider = ({ children }) => {

  const [productsWisshList, setproductsWisshList] = useState([]);
  const [loader, setloader] = useState(false)



  async function addProductToWishList(id) {

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

    
      setproductsWisshList(data.data);
      console.log(data);
      getUserWishList(); 
      return data;
    } catch (error) {
      return error;
    }
  }

  async function getUserWishList() {
  
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );


      setproductsWisshList(data.data);
      console.log(data.data);
      return data;
    } catch (error) {

      console.log(error, "cartContext");
      return error;
    }
  }
  async function deleteProductFromWishList(id) {

    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setproductsWisshList(data.data);
      toast.success("Item Removed");
    } catch (error) {
      console.log(error);
    }
    finally{
        window.window.location.reload(true)
    }
  }

  useEffect(function () {
    if (localStorage.getItem("tkn")) {
      getUserWishList();
    }
  }, []);



  if (loader) {
    return (
      <>
        <div className="h-screen bg-green-400 flex flex-wrap justify-center items-center">
          <Bars
            height="80"
            width="80"
            color="#fff"
            ariaLabel="bars-loading"
            visible={true}
          />
        </div>
        ;
      </>
    );
  }

















  return (
    <>
      <wishListContext.Provider
        value={{
          addProductToWishList,
          deleteProductFromWishList,
          productsWisshList,
        }}
      >
        {children}
      </wishListContext.Provider>
    </>
  );
};

export default WishListProvider;
