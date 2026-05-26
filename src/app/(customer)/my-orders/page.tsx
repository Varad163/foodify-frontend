"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  connectSocket,
  disconnectSocket,
} from "@/lib/socket";

import {
  getMyOrders
} from "@/services/my-order.service";

import OrderStatusTimeline
from "@/components/order/order-status-timeline";

import {
  useNotificationStore
} from "@/store/notification.store";

export default function
MyOrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const {
    addNotification
  } =
  useNotificationStore();

  // =========================
  // FETCH ORDERS
  // =========================

  const fetchOrders =
    async () => {

      try {

        const data =
          await getMyOrders();

        console.log(
          "Orders:",
          data
        );

        setOrders(
          data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // =========================
  // INITIAL FETCH
  // =========================

  useEffect(() => {

    fetchOrders();

  }, []);

  // =========================
  // SOCKET CONNECTION
  // =========================

  useEffect(() => {

    connectSocket(
      (message) => {

        console.log(
          "Realtime message:",
          message
        );

        // notification
        addNotification(
          message
        );

        // refresh orders
        fetchOrders();
      }
    );

    return () => {

      disconnectSocket();
    };

  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="p-8">
        Loading...
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (

    <div className="p-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1
          className="
            text-4xl
            font-bold
            mb-2
          "
        >
          My Orders
        </h1>

        <p
          className="
            text-gray-500
          "
        >
          Track your orders
        </p>

      </div>

      {/* ORDERS */}

      <div className="space-y-6">

        {orders.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              p-8
              text-center
              text-gray-500
            "
          >
            No orders found
          </div>

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
                  flex-col
                  gap-6
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >

                {/* LEFT */}

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

                  <p className="mt-3">
                    Restaurant:
                    {" "}
                    <span
                      className="
                        font-medium
                      "
                    >
                      {
                        order.restaurantName
                      }
                    </span>
                  </p>

                  <p className="mt-1">
                    Delivery Partner:
                    {" "}
                    <span
                      className="
                        font-medium
                      "
                    >
                      {
                        order.deliveryPartnerName
                      }
                    </span>
                  </p>

                </div>

                {/* RIGHT */}

                <div
                  className="
                    text-right
                  "
                >

                  <div
                    className="
                      text-3xl
                      font-bold
                    "
                  >
                    ₹
                    {order.totalAmount}
                  </div>

                  <div
                    className="
                      mt-3
                      inline-block
                      rounded-full
                      bg-black
                      px-4
                      py-2
                      text-sm
                      text-white
                    "
                  >
                    {order.status}
                  </div>

                </div>

              </div>

              {/* TIMELINE */}

              <OrderStatusTimeline
                status={order.status}
              />

            </div>
          ))
        )}

      </div>

    </div>
  );
}