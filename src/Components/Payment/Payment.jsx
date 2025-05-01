import  { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

const Payment = () => {
  const { CartID, setnumOfItems, setproducts, setTotalPrice } =  useContext(CartContext);

  const [City, setCity] = useState("");
  const [Phone, setPhone] = useState("");
  const [Details, setDetails] = useState("");
  const [loaderOnline, setloaderOnline] = useState(false);
  const [loaderOffline, setloaderOffline] = useState(false);

  async function cashPayment() {
    setloaderOffline(true);
    const userInfo = {
      shippingAddress: {
        Details,
        Phone,
        City,
      },
    };
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${CartID}`,
        userInfo,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setnumOfItems(0);
      setproducts([]);
      setTotalPrice(0); 
      console.log(data);
      toast.success('Payment Fulfiled')
      setloaderOffline(false);
    } catch (error) {
      setloaderOffline(true);
      console.log(error);
      setloaderOffline(false);
    }
  }

  async function onlinePayment() {
    setloaderOnline(true);
    const userInfo = {
      shippingAddress: {
        Details,
        Phone,
        City,
      },
    };
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}?url=http://localhost:5173`,
        userInfo,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );


      console.log(data);
      toast.success(data.status);
      window.open(data.session.url);
      setloaderOnline(false);
    } catch (error) {
      setloaderOnline(true);
      console.log(error);
      toast.error("Error with cash payment");
      setloaderOnline(false);
    }

  }

  return (
    <>
      <section className="py-4">
        <div className="mx-auto w-full md:w-[80%] px-6 md:px-3">
          <h1 className="text-center mt-8 text-green-700 text-4xl font-bold py-8">
            Payment
          </h1>
          <div className="md:w-[50%] md:p-0 p-8   mx-auto mb-5 lg:mb-64">
            {/* Input City */}
            <div className="relative z-0 w-full mb-10 group">
              <input
                type="text"
                name="city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                onChange={(e) => setCity(e.target.value)}
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >
                City
              </label>
            </div>

            {/* Input for Phone */}

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                onChange={(e) => setPhone(e.target.value)}
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >
                Phone Number
              </label>
            </div>

            {/* Text Area for details */}

            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-green-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full mb-4 text-sm text-green-900 bg-green-50 rounded-lg border border-green-300 focus:ring-green-500 focus:border-green-500 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Write your Details here..."
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>

            <button
              type="submit"
              onClick={cashPayment}
              className="text-white  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <i className="fa-brands fa-amazon-pay me-2"></i>
              {loaderOffline ? (
                <i className="fa-solid fa-spinner fa-spin  text-white ms-3"></i>
              ) : (
                "Pay with Cash"
              )}
            </button>

            <button
              onClick={onlinePayment}
              className="focus:outline-none mt-3 text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
            >
              <i className="fa-brands fa-amazon-pay me-2"></i>
              {loaderOnline ? (
                <i className="fa-solid fa-spinner fa-spin  text-white ms-3"></i>
              ) : (
                "Pay Online"
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
