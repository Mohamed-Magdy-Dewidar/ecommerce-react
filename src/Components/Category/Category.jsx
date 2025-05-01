import { useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";

import { NavLink } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

const Category = () => {
  const [allSubCategories, setSubCategories] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [LoaderSubCategories, setLoaderSubCategories] = useState(false)

  async function getAllCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  async function getSubCategories(id,CategoryName) {
    setLoaderSubCategories(true)
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      );
      setSubCategories(data?.data);
      setSubCategoryName(CategoryName);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoaderSubCategories(false);
    }
  }

  console.log(allSubCategories);

  const { data, isLoading, isFetching, error, refetch } = useQuery(
    "Categories",
    getAllCategories,
    {
      /* isFetching:false */
      // refetchInterval:100

      cacheTime: 5000,
      // enabled:false
    }
  );



  useEffect(() => {
    getAllCategories();
  }, []);
  if(isLoading){
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
    )

    
  }

  if(LoaderSubCategories){
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
    )
  }












  return (
    <>
<section className="py-8">
  <div className="w-full md:w-[95%] mx-auto">
    <div className="flex flex-wrap gap-5 items-center justify-center p-5">
      {data?.data.data.map((category) => (
        <React.Fragment key={category._id}>
          <div onClick={() => getSubCategories(category._id,category.name)} className="w-full  sm:w-1/2 md:w-1/3 lg:w-[30%] h-[350px] rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-green-600 bg-white">
            <img
              src={category.image}
              className="w-full h-3/4 object-cover rounded-t-lg"
              alt={category.name}
            />
            <h2 className="text-center text-green-500 text-xl mt-3 mb-2 font-semibold">
              {category.name}
            </h2>
          </div>
        </React.Fragment>
      ))}
    </div>
    {allSubCategories && (
      <>
        <h2 className="mt-16 text-center text-green-500 text-3xl  mb-2 font-semibold">{subCategoryName}{" "}subcategories </h2>
        <div className="flex flex-wrap gap-5 items-center justify-center p-4  mt-12">
        {allSubCategories.map((item) => (
      
          <h3 key={item._id} className="p-3 w-full md:w-1/4 text-center text-2xl text-black border-2 rounded-lg   transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-600 bg-white" 
          >
            {item.name}

          </h3>
        ))}
      </div>
      </>
    
    )}

    {allSubCategories?.length ===0 &&
      <h2 className="text-center mt-3 font-thin text-black text-2xl">
        No Avaliable Data!
      </h2> 
    }
  </div>
</section>

    </>
  );
};

export default Category;
