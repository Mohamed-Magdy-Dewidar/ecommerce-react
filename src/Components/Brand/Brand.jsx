import axios from "axios"
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Bars } from 'react-loader-spinner';
import Modal from "../Modal&ProgressBar/Modal";
import DeleteConfirmation from '../Modal&ProgressBar/DeleteConfirmation';

const Brand = () => {

  const [isModalOpen, setisModalOpen] = useState(false);

 const [brandImage, setbrandImage] = useState(); 
 const [brandName, setbrandName] = useState(""); 




  async function getAllBrands(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  function openModal(brandImage,brandName){
    setbrandImage(brandImage)
    setbrandName(brandName)
    setisModalOpen(true);
    
  }

  function handleStopRemoveModal(){
    setisModalOpen(false)
  }


  const { data, isLoading, isFetching, error, refetch } = useQuery("Brands",getAllBrands,
      {
        /* isFetching:false */
        // refetchInterval:100
  
        cacheTime: 5000,
        // enabled:false
      }
    );

    console.log(data?.data.data)




  useEffect(()=>{
    getAllBrands();
  },[])

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
        ;
      </>
    );
  }








  return (
    <>
   {/*  <Modal open={isModalOpen} /> */}
    <Modal open={isModalOpen} onClose={handleStopRemoveModal}>
              <DeleteConfirmation brandImage={brandImage} brandName={brandName} onConfirm={handleStopRemoveModal}   onCancel={handleStopRemoveModal}  />
    </Modal>
    <section className="py-8">
    <div className="mx-auto w-full md:w-[90%] text-center">
      <h1 className="text-4xl text-green-500 font-bold  mb-8">All Brands</h1> 
      <div className="flex flex-wrap justify-center items-center gap-5">
        {data?.data.data.map((brand)=>{
          return(
            <div onClick={()=>openModal(brand.image,brand.name)} key={brand._id} className="bg-white w-full md:w-1/5 h-[270px] border-2 rounded-md flex flex-col justify-center items-center">
            <img src={brand.image} className="w-full object-cover mx-auto" alt="Brand Logo" />
            <p className="mt-4 text-center">{brand.name}</p> 
          </div>

        )})}


      </div>
    </div>
  </section>
  </>

  
  )
}

export default Brand