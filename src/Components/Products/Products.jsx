import { useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import HomeSlider from "./../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishList";

const Products = () => {
  const [allProducts, setProducts] = useState(null);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setisLoading] = useState(false)

  // for add to cart button to load when adding product to cart to ensure that a process is running in the background
  const [loaderIdWishList, setloaderIdWishList] = useState(null);
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishList } = useContext(wishListContext);

  function handleInputChange(event){
    setSearchTerm(event.target.value);
  }




  async function getAllProducts() {
       try {
        setisLoading(true)
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
          console.log(data);
          setProducts(data?.data);
        
       } catch (error) {
        setisLoading(true)
         console.log(error)
       }
       finally{
        setisLoading(false);
       }
  }


  const filteredProducts = allProducts?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  async function callTheAddProduct(productId) {
    setLoadingItemId(productId);
    const data = await addProductToCart(productId);
    console.log(data);

    setLoadingItemId(null);
  }

  async function calltheAddProductToWishList(ID) {
    setloaderIdWishList(ID);
    const data = await addProductToWishList(ID);
    console.log(data);
    data.status == "success"
      ? toast.success(data.message)
      : toast.error("Product was not Added Succsesfully! ");

    setloaderIdWishList(null);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  if (isLoading) {
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
      <section className="py-8">
        <div className="m-auto w-full md:w-[95%] ">
          <HomeSlider />
          <CategorySlider />
          <div className="mb-6 w-1/2 mx-auto">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-green-900 dark:text-white"
            >
              Filter By Search
            </label>
            <input
              type="text"
              id="default-input"
              onChange={handleInputChange}
              className="bg-blue-50 border shadow-md outline-none border-blue-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex flex-wrap items-center  justify-center md:px-0 sm:px-0 lg:px-0  ">
            {filteredProducts?.map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  <div className="group w-full sm:w-1/2 md:w-1/4   p-3">
                    <div className="p-4 rounded-lg  transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-green-600">
                      <NavLink to={`/productsdetails/${item.id}`}>
                        <img
                          src={item.imageCover}
                          className="w-full mix-blend-darken"
                          alt="products"
                        />
                        <h1 className="text-green-400 text-start text-2xl mb-2">
                          {item.category.name}
                        </h1>
                        <h3>{item.title.split(" ").slice(0, 2).join(" ")}</h3>
                        <div className="flex flex-wrap items-center justify-between mt-2">
                          <h3>Price :{item.price} EGP</h3>
                          <h3>
                            <i className="fa-solid fa-star text-yellow-300 me-3">
                              {" "}
                            </i>
                            {item.ratingsAverage}
                          </h3>
                        </div>
                      </NavLink>
                      <div className="flex items-center justify-end">
                        {loaderIdWishList === item.id ? (
                          <i className="fa-solid  fa-heart fa-2x mt-2 mb-2  text-yellow-600"></i>
                        ) : (
                          <i
                            onClick={() => calltheAddProductToWishList(item.id)}
                            className="fa-solid  fa-heart fa-2x mt-2 mb-2  text-black hover:text-red-500"
                          ></i>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          callTheAddProduct(item.id);
                        }}
                        className="focus:outline-none mt-3 w-full text-white translate-y-40 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-transform transition-opacity duration-400 ease-in-out bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        {loadingItemId === item.id ? (
                          <i className="fa-solid fa-spinner fa-spin fa-1x text-white"></i>
                        ) : (
                          "Add To Cart"
                        )}
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
