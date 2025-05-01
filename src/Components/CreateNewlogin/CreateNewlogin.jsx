import axios from "axios";
import { Formik, useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";
import { Bars } from "react-loader-spinner";

const CreateNewlogin = () => {
  const { setToken } = useContext(authContext);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  let user = {
    email: "",
    newPassword: "",
  };

  const validation = Yup.object().shape({
    email: Yup.string()
      .required("Email is Required")
      .email("Enter a valid email"),
    newPassword: Yup.string()
      .required("Password is Required")
      .max(10, "Max length is 10")
      .matches(
        /^[A-Z][a-z0-9]{3,10}$/,
        "Password must start with Capital letter and followed by smaller letters or digits "
      ),
  });

  async function loginResetUser(values) {
    setisLoading(true);
    try {
      console.log(values);
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );

      toast.success("Successfully Logged In!");
      setisLoading(false);
      navigate("/");
      const token = response.data.token;
      setToken(token);
      localStorage.setItem("tkn", token);
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
      setisLoading(false);
    }
  }

  const myFormik = useFormik({
    initialValues: user,
    onSubmit: loginResetUser,
    validationSchema: validation,
  });

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
      </>
    );
  }

  return (
    <section className="py-28">
      <div className="w-full md:w-[85%] mx-auto px-6 md:px-2 mb-8">
        <h1 className="text-start text-black font-serif mb-5">
          reset your account password
        </h1>
        <form onSubmit={myFormik.handleSubmit}>
          {/* Input email */}
          <div className="relative z-0 w-full mb-10 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={myFormik.values.email}
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Email address
            </label>
          </div>

          {/* Alert for Email */}
          {myFormik.errors.email && myFormik.touched.email ? (
            <div
              className="flex items-center p-4 mb-3 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Error</span>{" "}
                {myFormik.errors.email}
              </div>
            </div>
          ) : (
            " "
          )}

          {/* Input for Paswword */}
          <div className="relative z-0 w-full mt-8 mb-8 group">
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={myFormik.values.newPassword}
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              password
            </label>
          </div>

          {/* Alert for Password */}

          {myFormik.errors.newPassword && myFormik.touched.newPassword ? (
            <div
              className="flex items-center p-4 mb-3 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Error</span>{" "}
                {myFormik.errors.newPassword}
              </div>
            </div>
          ) : (
            " "
          )}

          {/* Button */}
          <button
            type="submit"
            className="text-white  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateNewlogin;
