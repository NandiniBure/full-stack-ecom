/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  updateCartItemQuantity,
  removFromCart,
} from "../../../redux/slices/cartSlice";

interface CartContentsProps {
  cart: any;
  userId: string;
  guestId: string;
}

const CartContents: React.FC<CartContentsProps> = ({
  cart,
  userId,
  guestId,
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = ({
    productId,
    delta,
    quantity,
    size,
    color,
  }: {
    productId: string;
    delta: number;
    quantity: number;
    size: string;
    color: string;
  }) => {
    const newQuantity = quantity + delta;

    if (newQuantity >= 1) {
      console.log(
        "Updating cart item:",
        productId,
        delta,
        newQuantity,
        size,
        color,
        userId
      );
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity:delta,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (
    productId: string,
    size: string,
    color: string
  ) => {
    dispatch(
      removFromCart({
        productId,
        guestId,
        userId,
        size,
        color,
      })
    );
  };

  return (
    <div>
      {cart.products?.map((product: any, index: number) => (
        <div
          className="flex items-start justify-between py-4 border-b"
          key={index}
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart({
                      productId: product.productId,
                      delta: -1,
                      quantity: product.quantity,
                      size: product.size,
                      color: product.color,
                    })
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart({
                      productId: product.productId,
                      delta: 1,
                      quantity: product.quantity,
                      size: product.size,
                      color: product.color,
                    })
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p>$ {product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
            >
              <RiDeleteBin3Line className="h-6 w-6 text-red-600 mt-2" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
