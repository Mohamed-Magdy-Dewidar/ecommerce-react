import React, { useContext } from "react";
import { wishListContext } from "../../Context/WishList";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

const WishList = () => {
  const { productsWisshList: products, deleteProductFromWishList } =useContext(wishListContext);
  const { addProductToCart } = useContext(CartContext);
  console.log(products);
  return (
    <section className="py-8">
      <div className="mx-auto w-full md:w-[90%] px-5  bg-slate-200 pb-2 mb-36">
        {products?.length > 0 ? (
          <>
            <h1 className="text-3xl text-green-500 text-center py-6">WishList Cart</h1>
            {products?.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-wrap justify-center items-center border-b-2 border-dotted border-green-800 mb-4">
                  <div className="w-1/6 p-3">
                    <img
                      src={item.imageCover}
                      className="w-full mix-blend-darken"
                      alt={item.title}
                    />
                  </div>
                  <div className="w-4/6 p-3">
                    <h2 className="text-2xl font-mono mb-4 w-[50%]">
                      {item.title}
                    </h2>
                    <h3 className="text-green-500 mb-4">
                      Price: {item.price} EGP
                    </h3>
                    <button
                      type="button"
                      onClick={() => deleteProductFromWishList(item.id)}
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
                        addProductToCart(item.id)
                      }
                      className="focus:outline-none text-black hover:text-stone-200 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border-2 border-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Add To Cart
                    </button>

                  </div>
                </div>
              </React.Fragment>
            ))}
          </>
        ) : (
          <div className="mx-auto py-28 mt-10 flex flex-col justify-center items-center">
            <div className="w-3/6 mx-auto ">
                   <h1 className="text-4xl text-black font-bold text-center mb-4">Your WishList is Empty!</h1>
                   <div className="flex justify-center items-center mt-2 mb-3">
                   <i className="fa-solid mx-auto fa-shopping-bag text-green-500 fa-2x text-center"></i>
                   </div>
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

export default WishList;
