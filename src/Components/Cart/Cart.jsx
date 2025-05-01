import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import cartIsEmpty1 from "./../../assets/images/cart_is_empty.png";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    TotalPrice,
    products,
    updateProductCount,
    deleteProductFromCart,
    clearCart,
  } = useContext(CartContext);

  //   console.log(products[0].price);
  //   console.log(products[0].count);
  //   console.log(products[0].product.imageCover);
  // console.log(products[0])
  //   console.log(products[0].product.quantity);
  //   console.log(products);
  return (
    <section className="py-8">
      <div className="mx-auto w-full md:w-[90%] px-5  bg-slate-200 pb-2 mb-36">
        {products?.length > 0 ? (
          <>
            <h1 className="text-3xl mb-2">Shop Cart</h1>
            <h3 className="text-2xl text-green-400 mb-2">
              Total Cart Price: {TotalPrice} EGP
            </h3>
            <button
              type="button"
              onClick={clearCart}
              className="focus:outline-none mt-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              <i className="fa-solid fa-trash-can me-2"></i>
              Clear Cart
            </button>
            <Link
              to={"/payment"}
              className="focus:outline-none mt-3 text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
            >
              <i className="fa-brands fa-amazon-pay me-2"></i>
              Check Out
            </Link>

            {products?.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-wrap justify-center items-center border-b-2 border-dotted border-green-800 mb-4">
                  <div className="w-1/6 p-3">
                    <img
                      src={item.product.imageCover}
                      className="w-full mix-blend-darken"
                      alt={item.product.title}
                    />
                  </div>
                  <div className="w-4/6 p-3">
                    <h2 className="text-2xl font-mono mb-4 w-[50%]">
                      {item.product.title}
                    </h2>
                    <h3 className="text-green-500 mb-4">
                      Price: {item.price} EGP
                    </h3>
                    <h3 className="text-green-500 mb-4">
                      ID: {item.product.id}
                    </h3>
                    <button
                      type="button"
                      onClick={() => deleteProductFromCart(item.product.id)}
                      className="focus:outline-none mt-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      <i className="fa-solid fa-trash-can me-2"></i>
                      Remove
                    </button>
                  </div>
                  <div className="w-1/6 p-3 flex justify-center items-center">
                    <button
                      type="button"
                      onClick={() =>
                        updateProductCount(item.product.id, item.count + 1)
                      }
                      className="focus:outline-none text-black hover:text-white hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border-2 border-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      +
                    </button>
                    <h2 className="mx-2">{item.count}</h2>
                    <button
                      type="button"
                      onClick={() =>
                        updateProductCount(item.product.id, item.count - 1)
                      }
                      disabled={item.count === 0}
                      className={`focus:outline-none text-black hover:text-white hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 ms-2 mb-2 border-2 border-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                        item.count === 0 ? "disabled:opacity-50" : ""
                      }`}
                    >
                      -
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </>
        ) : (
          <div className="mx-auto p-26 mt-10">
            <div className="w-3/6 mx-auto">
              <img
                src={cartIsEmpty1}
                className="w-[100%] mix-blend-darken"
                alt=""
              />
            </div>
            <div className="flex justify-center items-center mb-3 ">
              <Link to="/" 
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              
              >

                Add Items
              
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
