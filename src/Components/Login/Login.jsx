import axios from "axios";
import {  useFormik} from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";

const Login = () => {


  const {setToken}  = useContext(authContext)
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  let user = {
    email: "",
    password: "",
  };

  const validation = Yup.object().shape({

    email: Yup.string()
      .required("Email is Required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is Required")
      .max(10, "Max length is 10")
      .matches(
        /^[A-Z][a-z0-9]{3,10}$/,
        "Password must start with Capital letter and followed by smaller letters or digits "
      ),
  });

  async function loginUser(values) {
    setisLoading(true);
    try {
      console.log(values);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
   

      toast.success("Successfully Added!");
      setisLoading(false);
      navigate("/");
      const token = response.data.token;
      setToken(token);
      localStorage.setItem("tkn",token);
    } catch (e) {
      console.log(e.message);
      toast.error(e.message)
      setisLoading(false);
    }
  }

  const myFormik = useFormik({
    initialValues: user,
    onSubmit: loginUser,
    validationSchema: validation,
  });

  return (
    <>
      <h1 className="text-center mt-8 text-green-700 text-4xl font-bold py-8">
        Sign In
      </h1>
      <div className="md:w-[50%] md:p-0 p-8   mx-auto mb-24">
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
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={myFormik.values.password}
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              password
            </label>
          </div>

          {/* Alert for Password */}

          {myFormik.errors.password && myFormik.touched.password ? (
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
                {myFormik.errors.password}
              </div>
            </div>
          ) : (
            " "
          )}

        

          <button
            type="submit"
            className="text-white  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
            ) : (
              "Sign In"
            )}
          </button>
          <Link to={"/forgetpassword"}>
              <h2 className="text-start text-black hover:text-green-500 text-2xl">Forget Your Passowrd?</h2>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
