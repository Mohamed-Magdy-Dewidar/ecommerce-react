import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast  from "react-hot-toast";


export const CartContext = createContext();

const CartContextProvider = ({children}) => {
  const [numOfItems, setnumOfItems] = useState(0);
  const [products, setproducts] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [CartID, setCartID] = useState(0);


  async function addProductToCart(id) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      /*  setnumOfItems(data.numOfCartItems);
      setproducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      console.log(data.numOfCartItems); */
      data.status == "success"
      ? toast.success(data.message)
      : toast.error("Product was not Added Succsesfully! ");
      getUserCart();
      return data;
    } catch (error) {
      return error;
    }
  }

  async function updateProductCount(id, newCount) {
    try {
      if (newCount == 0) {
        return deleteProductFromCart(id);
      }
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setnumOfItems(data.numOfCartItems);
      setproducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      console.log(data);
    } catch (error) {
      console.log(error, "error form update product Count");
    }
  }

  async function deleteProductFromCart(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setnumOfItems(data.numOfCartItems);
      setproducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setCartID(data.data._id);
      toast.success("Item Removed");
    } catch (error) {
      console.log(error);
    }
  }
  async function clearCart() {
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setnumOfItems(0);
      setproducts([]);
      setTotalPrice(0);
      toast.success("Cart Cleared Succsesfully!")
      console.log(data, "from delet cart");
    } catch (error) {
      console.log(error, "from delet cart");
    }
  }

  async function getUserCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setproducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setnumOfItems(data.numOfCartItems);
      setCartID(data.data._id);
      return data;
    } catch (error) {
      console.log(error, "cartContext");
      return error;
    }
  }

 

  useEffect(function () {
    if (localStorage.getItem("tkn")) {
      getUserCart();
    }
  }, []);

  return (
    <>
      <CartContext.Provider
        value={{
          addProductToCart,
          numOfItems,
          products,
          TotalPrice,
          CartID,
          updateProductCount,
          deleteProductFromCart,
          clearCart,
          setnumOfItems,
          setproducts,
          setTotalPrice,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};

export default CartContextProvider;
