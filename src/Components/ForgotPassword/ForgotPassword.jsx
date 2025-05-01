import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const [emailValue,setEmailValue] = useState("") ;
  const navigate = useNavigate();

  function handleEmailValue(event){
    setEmailValue(event.target.value);
    console.log(event.target.value);
  }

  async function forgetPasswordReset() {
    try {
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{
        email:emailValue
      })

      console.log(data);
      navigate("/verify-code");
  
    } catch (error) {
      console.log(error)
    }
  }

 




  return (
    <section className="py-16">
      <div className="w-full md:w-[85%] mx-auto px-6 md:px-2 mb-8">
        <h1 className="text-start text-black font-serif mb-5">
          Please Enter Your Verfication Code
        </h1>
        <div className="relative z-0 w-full mb-10 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
            onChange={handleEmailValue}
            value={emailValue}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Email address
          </label>
        </div>
        <button onClick={forgetPasswordReset}  className="px-6 py-2 text-green-500 border-2 border-green-500 rounded-md hover:text-white hover:bg-green-700 ">
          Verfiy
        </button>
      </div>
    </section>
  );
};

export default ForgotPassword;
