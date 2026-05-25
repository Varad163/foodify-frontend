"use client";

import { useEffect, useState } from "react";

import {
  getMyDeliveries,
  pickupOrder,
  deliverOrder,
} from "@/services/delivery.service";

export default function MyDeliveriesPage() {

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
          await getMyDeliveries();

        setOrders(
          data.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  const handlePickup =
    async (orderId: number) => {

      try {

        await pickupOrder(orderId);

        alert("Order picked up");

        fetchOrders();

      } catch (error) {

        console.log(error);
      }
    };

  const handleDeliver =
    async (orderId: number) => {

      try {

        await deliverOrder(orderId);

        alert("Order delivered");

        fetchOrders();

      } catch (error) {

        console.log(error);
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

      <div className="mb-8">

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          My Deliveries
        </h1>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Track assigned orders
        </p>

      </div>

      <div className="space-y-6">

        {orders.length === 0 ? (

          <p>
            No deliveries assigned
          </p>

        ) : (

          orders.map((order) => (

            <div
              key={order.orderId}
              className="
                rounded-2xl
                border
                p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
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
                    {order.status}
                  </p>

                </div>

                <div
                  className="
                    text-right
                  "
                >

                  <div
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    ₹
                    {order.totalAmount}
                  </div>

                  <div
                    className="
                      mt-4
                      flex
                      gap-3
                    "
                  >

                    <button
                      onClick={() =>
                        handlePickup(
                          order.orderId
                        )
                      }
                      className="
                        rounded-xl
                        bg-yellow-500
                        px-4
                        py-2
                        text-white
                      "
                    >
                      Pickup
                    </button>

                    <button
                      onClick={() =>
                        handleDeliver(
                          order.orderId
                        )
                      }
                      className="
                        rounded-xl
                        bg-green-600
                        px-4
                        py-2
                        text-white
                      "
                    >
                      Delivered
                    </button>

                  </div>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}