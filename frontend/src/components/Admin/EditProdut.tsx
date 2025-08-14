import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  featchProductDetails,
  updateProduct,
} from "../../../redux/slices/ProductSlice";
import axios from "axios";
const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state: any) => state.products
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  
  useEffect(() => {
    if (id) {
      dispatch(featchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
   
    formData.append("image", file);
    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prevData :any) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) return <p className="">Loading...</p>;
  if (error) return <p className="">Error : {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handlesubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter product name"
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full  border border-gray-300 rounded-md p-2 "
            rows={4}
            required
          />
        </div>
        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            name="price"
            value={productData.price}
            className="w-full  border border-gray-300 rounded-md p-2 "
            onChange={handleChange}
            required
          />
        </div>

        {/* count in stock  */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            name="countInStock"
            type="number"
            value={productData.countInStock}
            className="w-full  border border-gray-300 rounded-md p-2 "
            onChange={handleChange}
            required
          />
        </div>
        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">sku</label>
          <input
            name="sku"
            type="text"
            value={productData.sku}
            className="w-full  border border-gray-300 rounded-md p-2 "
            onChange={handleChange}
            required
          />
        </div>

        {/* sizes */}
       { productData.sizes && <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-saprated)
          </label>
          <input
            name="sizes"
            type="text"
            value={productData.sizes.join(", ")}
            className="w-full  border border-gray-300 rounded-md p-2 "
            onChange={(e) => {
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              });
            }}
            required
          />
        </div>}
        {/* colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-saprated)
          </label>
          <input
            name="colors"
            type="text"
            value={productData.colors.join(", ")}
            className="w-full  border border-gray-300 rounded-md p-2 "
            onChange={(e) => {
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              });
            }}
            required
          />
        </div>
        {/* Image Upload */}
        <div className="mb-6">
          <label className=" block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p>Uploading Image ...</p>}
          <div className=" flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={`Product Image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className=" w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
