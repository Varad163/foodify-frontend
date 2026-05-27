"use client";

import {
  useEffect,
  useState,
} from "react";

import api from "@/lib/axios";

import {
  useCartStore
} from "@/store/cart.store";

export default function
CheckoutPage() {

  const { items } =
    useCartStore();

  const [addresses, setAddresses] =
    useState<any[]>([]);

  const [selectedAddress,
    setSelectedAddress] =
    useState("");

  const subtotal =
    items.reduce(

      (acc, item) =>

        acc +
        item.price *
        item.quantity,

      0
    );

  const tax =
    subtotal * 0.05;

  const deliveryFee = 40;

  const total =
    subtotal +
    tax +
    deliveryFee;

  // =========================
  // FETCH ADDRESSES
  // =========================

  useEffect(() => {

    fetchAddresses();

  }, []);

  const fetchAddresses =
    async () => {

      try {

        const response =
          await api.get(
            "/address/my"
          );

        setAddresses(
          response.data.data || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // PLACE ORDER
  // =========================

  const placeOrder =
    async () => {

      try {

        await api.post(
          "/order/place"
        );

        alert(
          "Order placed successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Order failed"
        );
      }
    };

  return (

    <div className="p-8">

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Checkout
      </h1>

      {/* ADDRESS */}

      <div
        className="
          border
          rounded-2xl
          p-6
          mb-8
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-4
          "
        >
          Select Address
        </h2>

        <div className="space-y-4">

          {addresses.map((item) => (

            <div

              key={item.id}

              className="
                border
                rounded-xl
                p-4
                flex
                gap-4
              "
            >

              <input

                type="radio"

                checked={
                  selectedAddress ===
                  item.address
                }

                onChange={() =>
                  setSelectedAddress(
                    item.address
                  )
                }
              />

              <p>
                {item.address}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* SUMMARY */}

      <div
        className="
          border
          rounded-2xl
          p-6
          max-w-md
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Order Summary
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹ {tax}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>₹ {deliveryFee}</span>
          </div>

          <hr />

          <div
            className="
              flex
              justify-between
              text-2xl
              font-bold
            "
          >
            <span>Total</span>
            <span>₹ {total}</span>
          </div>

        </div>

        <button

          onClick={placeOrder}

          className="
            mt-8
            w-full
            rounded-xl
            bg-black
            py-3
            text-white
          "
        >

          Place Order

        </button>

      </div>

    </div>
  );
}