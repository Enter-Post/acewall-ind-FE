import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { axiosInstance } from "@/lib/AxiosInstance";

const FeaturedPage = () => {
  const { subcategoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSubcategories = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/subcategory/get`);
        if (res.data.success) {
          setSubcategories(res.data.subcategories || []);
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    getSubcategories();
  }, [subcategoryId]);

  return (
    /* Unique wrapper class added: featured-page-wrapper */
    <div className="featured-page-wrapper relative min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-12 overflow-hidden">
      
      {/* Login Button - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <Link to="/login">
          <button className="border border-green-600 text-green-600 bg-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-green-50 transition text-sm sm:text-base">
            Login
          </button>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-green-600 font-bold tracking-widest uppercase text-xs mb-2">
          Explore
        </h2>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 py-4 ">
          Featured <span className="text-green-600">Sub Topics</span>
        </h1>
        <h4 className="text-xl md:text-xl font-extrabold text-slate-900 max-w-2xl mx-auto">
          Explore the vast category of courses we offer to help you reach
          the height you want.
          <br />
          <br />
          <span className="text-green-600">We believe sky is the limit</span>
        </h4>
      </div>

      {/* Carousel Container */}
      <div className="w-full max-w-5xl px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
          </div>
        ) : subcategories.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={subcategories.length > 3}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 35,
              stretch: -20,
              depth: 150,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={true}
            pagination={{ clickable: true }}
            className="featured-swiper pb-16 !overflow-visible"
          >
            {subcategories.map((sub) => (
              <SwiperSlide key={sub._id} className="w-[200px] sm:w-[220px]">
                {/* Link wrapper added to navigate to specific subcategory courses */}
                <Link to={`/courses/${sub._id}`} className="block">
                  <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-xl border border-slate-100 transition-all duration-300 group flex flex-col min-h-[350px] hover:shadow-2xl hover:-translate-y-2">
                    
                    {/* Image Section */}
                    <div className="relative h-96 w-full p-3 bg-white">
                      {sub.image?.url ? (
                        <img
                          src={sub.image.url}
                          alt={sub.title}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Title Section */}
                    <div className="p-4 flex-grow flex flex-col items-center justify-center text-center bg-white border-t border-slate-50">
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-green-600 transition-colors leading-tight line-clamp-2">
                        {sub.title}
                      </h3>
                      <div className="w-6 h-0.5 bg-green-500 mt-3 rounded-full transition-all duration-300 group-hover:w-12"></div>
                    </div>

                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-slate-400 py-20">
            No items found.
          </div>
        )}
      </div>

      {/* SCOPED CSS: Targeting only featured-page-wrapper */}
      <style jsx global>{`
        /* Hide scrollbars specifically for this page and this swiper */
        .featured-page-wrapper .featured-swiper::-webkit-scrollbar {
          display: none;
        }

        .featured-page-wrapper .featured-swiper {
          -ms-overflow-style: none;
          scrollbar-width: none;
          width: 100%;
          padding-top: 10px;
          padding-bottom: 40px;
        }

        /* Nav Buttons Scoped */
        .featured-page-wrapper .swiper-button-next,
        .featured-page-wrapper .swiper-button-prev {
          color: #16a34a !important;
          background: #ebebeb !important;
          width: 35px !important;
          height: 35px !important;
          border-radius: 50% !important;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08) !important;
        }

        .featured-page-wrapper .swiper-button-next:after,
        .featured-page-wrapper .swiper-button-prev:after {
          font-size: 14px !important;
        }

        /* Pagination Scoped */
        .featured-page-wrapper .swiper-pagination-bullet {
          width: 6px !important;
          height: 6px !important;
        }

        .featured-page-wrapper .swiper-pagination-bullet-active {
          background: #16a34a !important;
          width: 18px !important;
          border-radius: 4px !important;
        }
      `}</style>
    </div>
  );
};

export default FeaturedPage;