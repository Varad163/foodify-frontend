"use client";

import { useEffect, useState } from "react";

import {
  getAvailableOrders,
  acceptDelivery,
} from "@/services/delivery.service";

export default function DeliveryOrdersPage() {

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
          await getAvailableOrders();

        console.log(data);

        setOrders(
          data.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  const handleAccept =
    async (orderId: number) => {

      try {

        await acceptDelivery(
          orderId
        );

        alert(
          "Delivery accepted"
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to accept delivery"
        );
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
          Available Deliveries
        </h1>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Accept and manage deliveries
        </p>

      </div>

      <div
        className="
          space-y-6
        "
      >

        {orders.length === 0 ? (

          <p>
            No deliveries available
          </p>

        ) : (

          orders.map((order) => (

            <div
              key={order.orderId}
              className="
                rounded-2xl
                border
                p-6
                shadow-sm
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

                  <button
                    onClick={() =>
                      handleAccept(
                        order.orderId
                      )
                    }
                    className="
                      mt-4
                      rounded-xl
                      bg-black
                      px-5
                      py-3
                      text-white
                    "
                  >
                    Accept Delivery
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}