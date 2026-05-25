"use client";

import { useEffect, useState } from "react";

import { getMyOrders } from "@/services/my-order.service";

export default function MyOrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

      try {

        const data =
          await getMyOrders();

        setOrders(data);

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

  return (
    <div className="p-8">

      <h1
        className="
          text-4xl
          font-bold
          mb-2
        "
      >
        My Orders
      </h1>

      <p className="text-gray-500 mb-8">
        Track your orders
      </p>

      <div className="space-y-6">

        {orders.length === 0 ? (

          <p>No orders found</p>

        ) : (

          orders.map((order) => (

            <div
              key={order.orderId}
              className="
                border
                rounded-2xl
                p-6
                shadow-sm
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >

                <div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    Order #
                    {order.orderId}
                  </h2>

                  <p className="mt-2">
                    Restaurant:
                    {" "}
                    {order.restaurantName}
                  </p>

                  <p>
                    Status:
                    {" "}
                    <span className="font-semibold">
                      {order.status}
                    </span>
                  </p>

                  <p>
                    Delivery Partner:
                    {" "}
                    {order.deliveryPartnerName}
                  </p>

                </div>

                <div
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  ₹ {order.totalAmount}
                </div>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}