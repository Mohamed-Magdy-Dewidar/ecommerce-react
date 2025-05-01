import axios from 'axios';
import  { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VerifyCode = () => {

const [code, setCode] = useState();
const navigate = useNavigate();

function handleResetCode(e){
  setCode(e.target.value);
  console.log(e.target.value);
}

async function resetCode(){
  try {
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",{
        resetCode:code
    })

    console.log(data);
    navigate("/reset-password");

  } catch (error) {
    console.log(error)
    toast.error("Incorrect Verfication Code")
    
  }
}


  return (
    <section className="py-24">
    <div className="w-full md:w-[85%] mx-auto px-6 md:px-2 mb-8">
      <h1 className="text-start text-black font-serif mb-5">
         reset your account password
      </h1>
      <div className="relative z-0 w-full mb-10 group">
        <input
          type="number"
          name="code"
          id="code"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=""
          onChange={handleResetCode}
          value={code}
        />
        <label
          htmlFor="code"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
        >
          Reset Code
        </label>
      </div>
      <button onClick={resetCode}  className="px-6 py-2 text-green-500 border-2 border-green-500 rounded-md hover:text-white hover:bg-green-700 ">
        Verfiy
      </button>
    </div>
  </section>
  )
}

export default VerifyCode