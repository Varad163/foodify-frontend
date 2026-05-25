"use client";

import { useEffect, useState } from "react";
import { placeOrder } from "@/services/order.service";

import { getMyCart } from "@/services/cart.service";

interface CartItem {
  foodId: number;

  foodName: string;

  price: number;

  quantity: number;

  restaurantName: string;
}

export default function CartPage() {

  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchCart = async () => {

      try {

        const data =
          await getMyCart();

        console.log(data);

        // FIX
        setCartItems(data || []);

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
        item.price * item.quantity,
      0
    );

  if (loading) {


    return (
      <div className="p-6">
        Loading cart...
      </div>
    );
  }
    const handlePlaceOrder =
  async () => {

    try {

      await placeOrder();

      alert(
        "Order placed successfully"
      );

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to place order"
      );
    }
  };

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
            space-y-4
          "
        >

          {cartItems.map((item, index) => (

            <div
              key={index}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                p-5
                shadow-sm
              "
            >

              <div>

                <h2
                  className="
                    text-xl
                    font-semibold
                  "
                >
                  {item.foodName}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                  "
                >
                  Restaurant:
                  {" "}
                  {item.restaurantName}
                </p>

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-4
                  "
                >

                  <span
                    className="
                      font-medium
                    "
                  >
                    ₹{item.price}
                  </span>

                  <span
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Qty:
                    {" "}
                    {item.quantity}
                  </span>

                </div>

              </div>

              <div
                className="
                  text-right
                "
              >

                <div
                  className="
                    text-lg
                    font-bold
                  "
                >
                  ₹
                  {
                    item.price *
                    item.quantity
                  }
                </div>

              </div>

            </div>

          ))}

          <div
            className="
              mt-8
              flex
              items-center
              justify-between
              rounded-xl
              bg-black
              p-6
              text-white
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

            <div
              className="
                text-3xl
                font-bold
              "
            >
              ₹{totalPrice}
              <button
  onClick={handlePlaceOrder}
  className="
    mt-6
    w-full
    rounded-xl
    bg-green-600
    p-4
    text-lg
    font-semibold
    text-white
  "
>
  Place Order
</button>
            </div>

          </div>

        </div>

      )}

    </main>
  );
}