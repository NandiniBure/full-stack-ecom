import React from "react";
import heroImg from "../../assets/rabbit-hero.webp"
import { Link } from "react-router-dom";

const Hero = () => {
  return <section className=" w-full relative h-[400px] md:h-[600px] lg:h-[750px] ">
    <img src={heroImg} alt="Rabbit" className=" w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover " />
    <div className=" absolute flex-col inset-0 text-white text-center bg-black bg-opacity-5 flex items-center justify-center">
    <h1 className=" text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
        Vactions <br/> Ready
    </h1>
    <p className=" text-sm tracking-tighter md:text-lg mb-6">
        Explore our Vaction-ready outfits with fact woldwide shipping
    </p>
    <Link to="/collection/all"
    className=" bg-white text-gray-950 px-6 py-2 rounded-sm text-lg">
        Shop Now
    </Link>
    </div>
  </section>
};

export default Hero;
