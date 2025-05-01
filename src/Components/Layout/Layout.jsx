import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import masterCardLogo from "../../assets/images/MasterCard.png";
import paypalCardLogo from "../../assets/images/paypal.png";
import americanExpressLogo from "../../assets/images/aExpress.png";
import appStoreButton from "../../assets/images/Appstore.png";
import googleStoreButton from "../../assets/images/Google play.png";

const Layout = () => {
  return (
    <>
      <Navbar />

      <Outlet />

      <footer className="py-20 mt-8 bg-slate-300">
        <div className="w-[95%]  mx-auto">
          <h2 className="text-start text-black text-3xl">
            Get The Fresh Cart App
          </h2>
          <p className="mt-3 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni,
            dolores.
          </p>
          <div className="mx-auto w-[90%]  mt-3">
            <div className="w-full flex flex-wrap justify-center items-center gap-3">
              <input
                type="email"
                id="email"
                className="w-full md:w-[75%] bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 outline-none shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-sm hover:shadow-green-600"
                placeholder="Email..."
                required
              />
              <button
                type="button"
                className="w-full md:w-[20%] focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Share App Link
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between mt-8">
              <div className="flex flex-nowrap justify-center items-center gap-5 mb-3">
                <h2 className="text-black text-2xl whitespace-nowrap">
                  Payment Partners
                </h2>
                <img
                  src={masterCardLogo}
                  className="mix-blend-multiply brightness-150"
                  width={50}
                  alt="masterCardLogo"
                />
                <img
                  src={paypalCardLogo}
                  className="mix-blend-multiply brightness-150"
                  width={50}
                  alt="paypalCardLogo"
                />
                <img
                  src={americanExpressLogo}
                  className="mix-blend-multiply object-fill brightness-150"
                  width={120}
                  alt="americanExpressLogo"
                />
              </div>
              <div className="flex flex-wrap justify-center items-center gap-5 px-2 mt-3 md:px-10">
                <h2 className="text-black text-2xl whitespace-nowrap">
                  Get Deliveries With Fresh Cart
                </h2>
                <img
                  src={appStoreButton}
                  className="mix-blend-multiply object-fill"
                  width={130}
                  alt="appStoreButton"
                />
                <img
                  src={googleStoreButton}
                  className="mix-blend-multiply object-fill"
                  width={130}
                  alt="googleStoreButton"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
