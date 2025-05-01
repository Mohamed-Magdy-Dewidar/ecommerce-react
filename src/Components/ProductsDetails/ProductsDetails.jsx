import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { CartContext } from "../../Context/CartContext";
import Slider from "react-slick";
const ProductsDetails = () => {
  const { id } = useParams();
  const [Loader, setLoader] = useState(false);
  // for add to cart button to load when adding product to cart to ensure that a process is running in the background

  const { addProductToCart, TotalPrice, numOfItems, products } =
    useContext(CartContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
  };

  async function getProductDDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading } = useQuery(`product:${id}`, getProductDDetails);
  console.log(data?.data.data);

  async function callTheAddProduct() {
    setLoader(true);
    const data = await addProductToCart(id);
    console.log(data);
    setLoader(false);
  }

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
    <section className="py-8">
      <div className="w-full md:w-[90%]  m-auto">
        <div className="flex flex-wrap justify-center items-center">
          <div className="md:w-1/3 w-full p-3">
            <div className="productImage ">
              {data?.data.data.images.length > 1 ? (
                <Slider {...settings}>
                  {data?.data.data.images.map(function (image, idx) {
                    return (
                      <div key={idx}>
                        <img
                          src={image}
                          className="w-full object-contain"
                          alt=""
                        />
                      </div>
                    );
                  })}
                </Slider>
              ) : (
                <img
                  src={data?.data.data.imageCover}
                  className="w-full object-contain mix-blend-darken"
                  alt=""
                />
              )}

              {/* <img src={data?.data.data.imageCover} className="w-full" alt="" /> */}
            </div>
          </div>
          <div className="md:w-2/3 w-full p-3 ">
            <div className="productDetail">
              <h2 className="mb-4  text-3xl">{data?.data.data.title}</h2>
              <p>{data?.data.data.description}</p>
              <h2 className="mt-4 mb-4 text-green-400 text-2xl font-mono">
                {data?.data.data.category.name}
              </h2>
              <div className="flex flex-wrap items-center justify-between mt-2 mb-4">
                <h3> Price : {data?.data.data.price} EGP</h3>
                <h3>
                  <i className="fa-solid fa-star text-yellow-300 me-3"> </i>
                  {data?.data.data.ratingsAverage}
                </h3>
              </div>
              <div className="mx-auto w-[60%]">
                <button
                  type="button"
                  onClick={callTheAddProduct}
                  className="focus:outline-none mt-3 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  {Loader ? (
                    <i className="fa-solid fa-spinner fa-spin fa-1x text-white"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsDetails;
