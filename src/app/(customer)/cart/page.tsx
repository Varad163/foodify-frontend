"use client";

import { useEffect, useState } from "react";

import {
  getMyCart,
} from "@/services/cart.service";

export default function CartPage() {

  const [cartItems, setCartItems] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchCart = async () => {

      try {

        const data =
          await getMyCart();

        console.log(data);

        setCartItems(data.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchCart();

  }, []);

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        item.food.price * item.quantity,
      0
    );

  if (loading) {

    return (
      <div className="p-6">
        Loading cart...
      </div>
    );
  }

  return (

    <main className="p-6">

      <div className="mb-8">

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          My Cart
        </h1>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Review your items
        </p>

      </div>

      {cartItems.length === 0 ? (

        <div
          className="
            text-gray-500
          "
        >
          Cart is empty
        </div>

      ) : (

        <div
          className="
            space-y-5
          "
        >

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                p-5
              "
            >

              <div>

                <h2
                  className="
                    text-xl
                    font-semibold
                  "
                >
                  {item.food.name}
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >
                  {item.food.description}
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                  "
                >
                  Quantity:
                  {" "}
                  {item.quantity}
                </p>

              </div>

              <div
                className="
                  text-right
                "
              >

                <p
                  className="
                    text-lg
                    font-bold
                  "
                >
                  ₹
                  {" "}
                  {item.food.price * item.quantity}
                </p>

              </div>

            </div>
          ))}

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              pt-6
            "
          >

            <h2
              className="
                text-2xl
                font-bold
              "
            >
              Total
            </h2>

            <p
              className="
                text-2xl
                font-bold
              "
            >
              ₹ {totalPrice}
            </p>

          </div>

          <button
            className="
              w-full
              rounded-2xl
              bg-black
              py-4
              text-white
              text-lg
              font-semibold
            "
          >
            Proceed To Checkout
          </button>

        </div>
      )}

    </main>
  );
}