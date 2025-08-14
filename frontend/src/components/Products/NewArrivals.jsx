import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios"
const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDraging, setIsDraging] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRIght] = useState(false);
  const [startX, setStartX] = useState();
  // const newArrivals = [
  //   {
  //     _id: "1",
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=1",
  //         altText: "Styling Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "2",
  //     name: "Stylish Jacket",
  //     price: 20,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=2",
  //         altText: "Styling Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "3",
  //     name: "Stylish Jacket",
  //     price: 1200,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=3",
  //         altText: "Styling Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "4",
  //     name: "Stylish Jacket",
  //     price: 10,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=4",
  //         altText: "Styling Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "5",
  //     name: "Stylish Jacket",
  //     price: 12,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=5",
  //         altText: "Styling Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "6",
  //     name: "Stylish Jacket",
  //     price: 50,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=6",
  //         altText: "Styling Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "7",
  //     name: "Stylish Jacket",
  //     price: 12045,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=7",
  //         altText: "Styling Jacket",
  //       },
  //     ],
  //   },
  // ];


  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/new-arrivals`
        )
        console.log(response.data)
        setNewArrivals(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchNewArrivals();
  },[])



  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  const handleMouseDown = (e) => {
    setIsDraging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleOnMouseMove = (e) => {
    if (!isDraging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = (e) => {
    setIsDraging(false);
  };

  const handleMouseUpOrLeave = (e) => {};

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftscroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftscroll + container.clientWidth;

      setCanScrollLeft(leftscroll > 0);
      setCanScrollRIght(rightScrollable);
    }


  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="  py-16 px-4 lg:px-0">
      <div className=" container mx-auto text-center mb-10 relative">
        <h2 className=" text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className=" text-lg text-gray-600 mb-8">
          Discover the latest styles Straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion
        </p>

        {/* Scroll Buttons */}

        <div className=" absolute right-0 bottom-[-30px] flex space-x-2 ">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={` p-2 rounded border  ${
              canScrollLeft
                ? " bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed  "
            } `}
          >
            <FiChevronLeft></FiChevronLeft>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={` p-2 rounded border    ${
              canScrollRight
                ? " bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed  "
            }`}
          >
            <FiChevronRight></FiChevronRight>
          </button>
        </div>
      </div>

      {/* Scrollbar Content */}
      <div
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleOnMouseMove}
        ref={scrollRef}
        className={` container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDraging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {newArrivals.map((product) => (
          <div
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
            key={product._id}
          >
            <img
              src={product.images[0].url}
              draggable={false}
              alt={product.images[0]?.altText || product.name}
              className=" w-full h-[500px] object-cover rounded-lg"
            ></img>
            <div className=" absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg ">
              <Link to={`/product/${product._id}`}>
                <h4 className="font-medium">{product.name}</h4>
                <p className=" mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
