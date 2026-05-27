"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import axiosInstance from "@/lib/axios";

export default function OrderDetailsPage() {

  const params = useParams();

  const orderId = params.id;

  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchOrderDetails();

  }, []);

  const fetchOrderDetails =
    async () => {

      try {

        const response =
          await axiosInstance.get(
            `/order/details/${orderId}`
          );

        console.log(response.data);

        setOrder(
          response.data.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  if (loading) {

    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  if (!order) {

    return (
      <div className="p-8">
        Order not found
      </div>
    );
  }

  return (

    <div
      className="
        p-8
        max-w-5xl
        mx-auto
        space-y-8
      "
    >

      {/* HEADER */}

      <div>

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Order #
          {order.orderId}
        </h1>

        <p className="text-gray-500 mt-2">
          Track your order details
        </p>

      </div>

      {/* ORDER SUMMARY */}

      <div
        className="
          border
          rounded-2xl
          p-6
          shadow-sm
        "
      >

        <h2
          className="
            text-2xl
            font-semibold
            mb-4
          "
        >
          Order Summary
        </h2>

        <div className="space-y-2">

          <p>
            <span className="font-semibold">
              Restaurant:
            </span>
            {" "}
            {order.restaurantName}
          </p>

          <p>
            <span className="font-semibold">
              Status:
            </span>
            {" "}
            {order.status}
          </p>

          <p>
            <span className="font-semibold">
              Total:
            </span>
            {" "}
            ₹ {order.totalAmount}
          </p>

        </div>

      </div>

      {/* ITEMS */}

      <div
        className="
          border
          rounded-2xl
          p-6
          shadow-sm
        "
      >

        <h2
          className="
            text-2xl
            font-semibold
            mb-4
          "
        >
          Ordered Items
        </h2>

        <div className="space-y-4">

          {order.items?.map(
            (item: any) => (

              <div
                key={item.foodId}
                className="
                  flex
                  justify-between
                  border-b
                  pb-3
                "
              >

                <div>

                  <h3
                    className="
                      font-semibold
                      text-lg
                    "
                  >
                    {item.foodName}
                  </h3>

                  <p className="text-gray-500">
                    Quantity:
                    {" "}
                    {item.quantity}
                  </p>

                </div>

                <div
                  className="
                    font-bold
                    text-lg
                  "
                >
                  ₹ {item.price}
                </div>

              </div>
            )
          )}

        </div>

      </div>

      {/* ADDRESS */}

      <div
        className="
          border
          rounded-2xl
          p-6
          shadow-sm
        "
      >

        <h2
          className="
            text-2xl
            font-semibold
            mb-4
          "
        >
          Delivery Address
        </h2>

        <div className="space-y-2">

          <p>
            {order.address?.fullName}
          </p>

          <p>
            {order.address?.phone}
          </p>

          <p>
            {order.address?.street}
          </p>

          <p>
            {order.address?.city},
            {" "}
            {order.address?.state}
          </p>

          <p>
            {order.address?.pincode}
          </p>

        </div>

      </div>

      {/* PAYMENT */}

      <div
        className="
          border
          rounded-2xl
          p-6
          shadow-sm
        "
      >

        <h2
          className="
            text-2xl
            font-semibold
            mb-4
          "
        >
          Payment
        </h2>

        <div className="space-y-2">

          <p>
            <span className="font-semibold">
              Method:
            </span>
            {" "}
            {order.paymentMethod}
          </p>

          <p>
            <span className="font-semibold">
              Status:
            </span>
            {" "}
            {order.paymentStatus}
          </p>

        </div>

      </div>

      {/* DELIVERY PARTNER */}

      <div
        className="
          border
          rounded-2xl
          p-6
          shadow-sm
        "
      >

        <h2
          className="
            text-2xl
            font-semibold
            mb-4
          "
        >
          Delivery Partner
        </h2>

        {order.deliveryPartner ? (

          <div className="space-y-2">

            <p>
              {order.deliveryPartner.name}
            </p>

            <p>
              {order.deliveryPartner.phone}
            </p>

            <p>
              Vehicle:
              {" "}
              {
                order.deliveryPartner
                  .vehicleNumber
              }
            </p>

          </div>

        ) : (

          <p className="text-gray-500">
            Delivery partner not assigned yet
          </p>
        )}

      </div>

    </div>
  );
}