import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import { FeaturesSection } from "../components/Products/FeaturesSection";
import { featchproductbyfilters } from "../../redux/slices/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ProductGrid from "../components/Products/ProductGrid";

const Home = () => {
  const dispatch = useDispatch();

  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(
      featchproductbyfilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);


  return (
    <div>
      <Hero></Hero>
      <GenderCollectionSection></GenderCollectionSection>
      <NewArrivals></NewArrivals>

      {/* Best Seller */}

      <h2 className=" text-3xl text-center font-bold mb-4 ">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails  productId={bestSellerProduct._id}   ></ProductDetails>
      ) : (
        <p>Loading best seller products...</p>
      )}

      <div className=" container mx-auto">
        <h2 className=" text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} /> 
      </div>
      <FeaturedCollection></FeaturedCollection>
      <FeaturesSection></FeaturesSection>
    </div>
  );
};

export default Home;
