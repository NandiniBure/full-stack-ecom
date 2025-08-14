import React, { use, useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FilterSIdebar } from "../components/Products/FilterSIdebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { featchproductbyfilters } from "../../redux/slices/ProductSlice";
export const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const sidebarRef = useRef(null);
  const [isSidebaropen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: any) => state.products
  );
  const queryParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(featchproductbyfilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebaropen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log("products",collection,queryParams,products);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebaropen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSIdebar />
      </div>
      <div className=" flex-grow p-4">
        <h2 className=" text-2xl uppercase mb-4">All Collection</h2>
        <SortOptions />
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};
