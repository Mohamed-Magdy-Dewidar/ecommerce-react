import axios from "axios";
import { jwtDecode } from "jwt-decode";
import  { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

const AllOrderes = () => {
  const { id: userID } = jwtDecode(localStorage.getItem("tkn"));
  console.log(userID);
  const [Allorders, setAllorders] = useState(null);
  const [Loader, setLoader] = useState(false) 

  async function getAllOrders() {
    setLoader(true)
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`
      );

      console.log(data);
      setAllorders(data);
    } catch (error) {
      console.log(error);

    }
    finally{
        setLoader(false)
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);
  if (Loader) {
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
    <section className="py-24">
      <div className="mx-auto w-full md:w-[90%] bg-slate-200 rounded-md">
        {Allorders?.map((order) => (
          <div key={order.id} className="flex flex-col  mb-4 p-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Order ID: {order.id}
              </h2>
              <p className="text-gray-600">
                Total Price: {order.totalOrderPrice}
              </p>
              <p className="text-gray-600">
                Payment Method: {order.paymentMethodType}
              </p>
              <p className="text-gray-600">
                Order Date: {order.createdAt.slice(0,16).replace("T"," at ")}
              </p>
            </div>
            {order.cartItems?.map((item, itemIndex) => (
              <div
                key={item.product.id + "-" + itemIndex}
                className="flex mb-4 border-b-zinc-400 border-b-2"
              >
                <div className="w-1/6 md:mb-2">
                  <img
                    src={item.product.imageCover}
                    className="w-full mix-blend-multiply"
                    alt={item.product.title}
                  />
                </div>
                <div className="w-4/6 -400  p-4">
                  <h2 className="text-2xl font-mono mt-12 mb-4 w-[60%]">
                    {item.product.title}
                  </h2>
                  <h2 className="text-green-500 mb-4">
                    Price: {item.price} EGP
                  </h2>
                  <h3>
                    <i className="fa-solid fa-star text-yellow-300 me-3"></i>
                    {item.product.ratingsAverage}
                  </h3>
                </div>
                <div className="w-1/6  flex flex-col items-end">
                  <h2 className="text-2xl font-mono mb-4 mt-12 whitespace-nowrap">
                    Price: {item.price * item.count}
                  </h2>
                  <h2 className="text-xl font-mono">Qty: {item.count}</h2>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllOrderes;
