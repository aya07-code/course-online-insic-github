// import { Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import { useEffect, useState } from "react";
// import { featureTwo } from "../../../data/features";
// import { slidesData } from "../../../data/hero";
// import { useNavigate } from "react-router-dom";
// export default function HeroTwo() {
//   const navigate = useNavigate();
//   const [showSlider, setShowSlider] = useState(false);

//   useEffect(() => {
//     setShowSlider(true);
//   }, []);
//   return (
//     <section className="mainSlider -type-1 js-mainSlider customizedHeroBackground">
//       <div className="swiper-wrapper-two">
//         {showSlider && (
//           <Swiper
//             // {...setting}
//             modules={[Navigation, Pagination]}
//             navigation={{nextEl: ".hero-slider-next",prevEl: ".hero-slider-prev"}}
//             spaceBetween={0}
//             slidesPerView={1}
//             breakpoints={{
//               450: { slidesPerView: 1},
//               768: { slidesPerView: 1},
//               1200: { slidesPerView: 1},
//             }}
//             speed={1200}
//           >
//             {slidesData.map((item, i) => (
//               <SwiperSlide key={i}>
//                 <div className="swiper-slide hightFull">
//                   <div className="mainSlider__bg">
//                     <div
//                       className="bg-image js-lazy customedBg"
//                       style={{backgroundImage: `url(${item.bgImage})`}}
//                     ></div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}
//       </div>

//       <div className="container">
//         <div className="row justify-center text-center">
//           <div className="col-xl-6 col-lg-8">
//             <div
//               className="mainSlider__content"
//               data-aos="fade-up"
//               data-aos-delay="500"
//             >
//               <h1 className="mainSlider__title text-white">
//                 Your Journey To Succcess Starts Here{" "}
//                 <span className="text-purple-1 underline">Welcome To INSIC</span>
//               </h1>

//               <p className="mainSlider__text text-white">
//                 More than 500 online courses
//               </p>

//               <div className="mainSlider__form">
//                 <input
//                   required
//                   type="text"
//                   placeholder="What do you want to learn today?"
//                 />

//                 <button
//                   className="button -md -purple-1 text-white"
//                   onClick={() => navigate("/courses-list-5")}
//                 >
//                   <i className="icon icon-search mr-15"></i>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="row y-gap-20 justify-center mainSlider__items">
//           {featureTwo.map((elm, i) => (
//             <div key={i} className="col-xl-3 col-md-4 col-sm-6">
//               <div className="mainSlider-item text-center">
//                 <img src={elm.imgSrc} alt="icon" />
//                 <h4 className="text-20 fw-500 lh-18 text-white mt-8">
//                   {elm.title}
//                 </h4>
//                 <p className="text-15 text-white">{elm.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <button className="swiper-prev hero-slider-prev button -white-20 text-white size-60 rounded-full d-flex justify-center items-center js-prev">
//         <i className="icon icon-arrow-left text-24"></i>
//       </button>

//       <button className="swiper-next hero-slider-next button -white-20 text-white size-60 rounded-full d-flex justify-center items-center js-next">
//         <i className="icon icon-arrow-right text-24"></i>
//       </button>
//     </section>
//   );
// }


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useState } from "react";
import { featureTwo } from "../../../data/features";
import { slidesData } from "../../../data/hero";
import { useNavigate } from "react-router-dom";
export default function HeroTwo() {
  const navigate = useNavigate();
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);
  return (
    <section className=" mainSlider  -type-1 js-mainSlider customizedHeroBackground">
      <div className="swiper-wrapper-two bg-image js-lazy customedBg " style={{backgroundImage: `url(/assets/img/home-2/mainSlider/bg.png)` }}>
      <div className="swiper-wrapper-two" style={{backgroundColor:"blue",opacity:'.15'}}></div>
      </div>

      <div className="container" >
        <div className="row justify-center text-center">
          <div className="col-xl-6 col-lg-8" style={{marginTop:"-100px" ,width:"60%"}}>
            <div
              className="mainSlider__content"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h2 className="mainSlider__title text-white" >
                Your Journey To Succcess Starts Here{" "}
                <span className="text-purple-1 underline">Welcome To INSIC</span>
              </h2>
              <p className="mainSlider__text text-white">
                More than 500 online courses
              </p>

              <div className="mainSlider__form">
                <input
                  required
                  type="text"
                  placeholder="What do you want to learn today?"
                />

                <button
                  className="button -md -purple-1 text-white"
                  onClick={() => navigate("/courses-list-5")}
                >
                  <i className="icon icon-search mr-15"></i>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row y-gap-20 justify-center mainSlider__items">
          {featureTwo.map((elm, i) => (
            <div key={i} className="col-xl-3 col-md-4 col-sm-6">
              <div className="mainSlider-item text-center">
                <img src={elm.imgSrc} alt="icon" />
                <h4 className="text-20 fw-500 lh-18 text-white mt-8">
                  {elm.title}
                </h4>
                <p className="text-15 text-white">{elm.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    
    </section>
  );
}