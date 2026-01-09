import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  useEffect(() => {
    const getSubcategories = async () => {
      try {
        const res = await axiosInstance.get(`/subcategory/get`);
        if (res.data.success) {
          setSubcategories(res.data.subcategories || []);
        }
        // Timing: Rotate wheel for 2s, then open
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => setIsVaultOpen(true), 800);
        }, 2500);
      } catch (err) {
        console.error("API Error:", err);
        setLoading(false);
        setIsVaultOpen(true);
      }
    };
    getSubcategories();
  }, [subcategoryId]);

  return (
    <div className="relative overflow-hidden bg-slate-900">
      {/* --- MECHANICAL VAULT LOADER --- */}
      <AnimatePresence>
        {!isVaultOpen && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex overflow-hidden pointer-events-none"
          >
            {/* Left Door */}
            <motion.div
              initial={{ x: 0 }}
              animate={!loading ? { x: "-100%" } : { x: 0 }}
              transition={{ duration: 1.5, ease: [0.7, 0, 0.2, 1] }}
              className="w-1/2 h-full bg-[#1a1a1a] border-r-4 border-[#333] flex items-center justify-end pointer-events-auto shadow-[20px_0_50px_rgba(0,0,0,0.5)] relative"
              style={{
                backgroundImage: 'radial-gradient(circle at center, #2c2c2c 0%, #111 100%)',
              }}
            >
              {/* Left Spoke/Handle Half */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-black/30" />
            </motion.div>

            {/* Right Door */}
            <motion.div
              initial={{ x: 0 }}
              animate={!loading ? { x: "100%" } : { x: 0 }}
              transition={{ duration: 1.5, ease: [0.7, 0, 0.2, 1] }}
              className="w-1/2 h-full bg-[#1a1a1a] border-l-4 border-[#333] flex items-center justify-start pointer-events-auto shadow-[-20px_0_50px_rgba(0,0,0,0.5)] relative"
              style={{
                backgroundImage: 'radial-gradient(circle at center, #2c2c2c 0%, #111 100%)',
              }}
            >
              {/* Left Spoke/Handle Half */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/30" />
            </motion.div>

            {/* --- CENTRAL MECHANICAL WHEEL --- */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={!loading ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-[110] flex items-center justify-center"
              >
                {/* Outer Rim */}
                <motion.div
                  animate={{ rotate: loading ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="w-48 h-48 md:w-64 md:h-64 border-[12px] border-[#444] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(0,0,0,1)] bg-[#222]"
                >
                  {/* Spokes (The Handles) */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <div
                      key={angle}
                      className="absolute w-2 h-full bg-green-800 border-x border-white/5"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      {/* Handle Knob */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-[#555] to-[#222] rounded-full border border-white/10 shadow-lg" />
                    </div>
                  ))}

                  {/* Inner Hub */}
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#222] rounded-full border-4 border-[#444] shadow-inner flex items-center justify-center relative z-20">
                    <div className="w-8 h-8 bg-green-600/20 rounded-full animate-pulse blur-md" />
                    <div className="absolute w-4 h-4 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e]" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Status Text */}
              <motion.div
                animate={{ y: loading ? 120 : 150, opacity: loading ? 1 : 0 }}
                className="absolute text-center mt-20"
              >
                <p className="text-green-500 font-mono tracking-[0.5em] text-sm md:text-base uppercase">
                  {loading ? "Welcome to the Learning Vault..." : "Access Granted"}
                </p>
                <div className="w-48 h-1 bg-gray-800 mt-4 mx-auto rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-full h-full bg-green-500"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ACTUAL PAGE CONTENT --- */}
      <motion.div 
        animate={isVaultOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 1 }}
        className="featured-page-wrapper relative min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-12"
      >
        
        {/* Login Button */}
        <div className="absolute top-6 right-6 z-50">
          <Link to="/login">
            <button className="border border-green-600 text-green-600 bg-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-green-50 transition text-sm sm:text-base">
              Login
            </button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10 px-4">
          <h2 className="text-green-600 font-bold tracking-widest uppercase text-xs mb-2">Explore</h2>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 py-4 ">
            Featured <span className="text-green-600">Topics</span>
          </h1>
          <h4 className="text-xl md:text-xl font-extrabold text-slate-900 max-w-2xl mx-auto">
            Explore the vast category of courses we offer to help you reach the height you want.
            <br /><br />
            <span className="text-green-600">We believe sky is the limit</span>
          </h4>
        </div>

        {/* Carousel Container */}
        <div className="w-full max-w-5xl px-4">
          {subcategories.length > 0 ? (
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
                  <Link to={`/courses/${sub._id}`} className="block">
                    <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-xl border border-slate-100 transition-all duration-300 group flex flex-col min-h-[350px] hover:shadow-2xl hover:-translate-y-2">
                      <div className="relative h-96 w-full p-3 bg-white">
                        {sub.image?.url ? (
                          <img src={sub.image.url} alt={sub.title} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Image</div>
                        )}
                      </div>
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
            !loading && <div className="text-center text-slate-400 py-20">No items found.</div>
          )}
        </div>

        <style jsx global>{`
          .featured-page-wrapper .featured-swiper::-webkit-scrollbar { display: none; }
          .featured-page-wrapper .featured-swiper { -ms-overflow-style: none; scrollbar-width: none; width: 100%; padding-top: 10px; padding-bottom: 40px; }
          .featured-page-wrapper .swiper-button-next, .featured-page-wrapper .swiper-button-prev { color: #16a34a !important; background: #ebebeb !important; width: 35px !important; height: 35px !important; border-radius: 50% !important; box-shadow: 0 4px 10px rgba(0,0,0,0.08) !important; }
          .featured-page-wrapper .swiper-button-next:after, .featured-page-wrapper .swiper-button-prev:after { font-size: 14px !important; }
          .featured-page-wrapper .swiper-pagination-bullet { width: 6px !important; height: 6px !important; }
          .featured-page-wrapper .swiper-pagination-bullet-active { background: #16a34a !important; width: 18px !important; border-radius: 4px !important; }
        `}</style>
      </motion.div>
    </div>
  );
};

export default FeaturedPage;