import axios from "axios"
import { useQuery } from "react-query"
import Slider from "react-slick";



const CategorySlider = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 6,
        slidesToScroll: 2,
        arrows:false,
        autoplay:true
      };

    async function getCategories(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        
    }


  const {data} = useQuery("CategorySlider",getCategories);

  
  return (

    <section className="py-6 px-3 md:px-0  mb-4 ">
         <Slider {...settings}>
            {data?.data.data.map(function(item,idx){
            return(
               <div key={idx}>
                    <img src={item.image} className="w-full h-[270px]" alt="" />
                    <h3 className="text-center text-2xl  text-black italic">{item.name}</h3>
                </div>
            )
         
            })}
          </Slider>

    </section>
  )
}

export default CategorySlider